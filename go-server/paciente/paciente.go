package paciente

import (
	"strconv"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"strings"
	"github.com/jinzhu/gorm"
	"github.com/julienschmidt/httprouter"
	"../dbcfg"
	"../logger"
	"../visita"
	"../age"

)

type Paciente struct {
	// id       uint   `gorm:"column:id;primary_key;AUTO_INCREMENT" json:"ID"`
	// TipoDoc    string `gorm:"column:tipo_doc" json:"TipoDoc"`
	// NroDoc int    `gorm:"column:nro_doc" json:"Sucursal"`
	// Puesto   int    `gorm:"column:Puesto" json:"Puesto"`
	// Usuario  string `gorm:"column:Usuario" json:"Usuario"`
	// Estado   int    `gorm:"column:Estado;default:0" json:"Estado"`
	// Items	 []ComandaItem 

	ID  		uint   `gorm:"column:id;primary_key;AUTO_INCREMENT"`
	TipoDoc    	string
	NroDoc    	string
	Nombre    	string
	Apellido    string
	FechaNac    string
	Edad        int
	ObraSocial  string
	NroAfiliado string
	Visitas 	[]visita.Visita `gorm:"save_associations:false;"`

}

var VERSION = ""
var db *gorm.DB

func Routes(r *httprouter.Router, version string) {
	VERSION = version
	r.GET("/server/pacientes", List)
	r.GET("/server/pacientes/:id", ListOne)
	r.POST("/server/pacientes", Insert)
	r.PUT("/server/pacientes/:id", Update)
}

func (Paciente) TableName() string {
	return "pacientes"
}

func List(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	q := r.URL.Query()
	_filter := q.Get("filter") 
	// fmt.Println(" url : " + r.URL.RawQuery)
	// fmt.Println(" filter : " + _filter)

	pacientes := []Paciente{}
	db := dbcfg.GetDB()

	// Run the query
	_stringFilter := "%"+ _filter +"%"
	db.Where("nombre LIKE ? or apellido LIKE ? or nro_doc = ?", _stringFilter, _stringFilter, _filter).Preload("Visitas").Find(&pacientes)

	for i, p := range pacientes {
		birthDate, _ := time.Parse("2006-01-02T15:04:05.000Z", p.FechaNac + "T00:00:00.000Z")
		pacientes[i].Edad = age.Age(birthDate)
		pacientes[i].Apellido = strings.ToLower(p.Apellido)
		pacientes[i].Nombre = strings.ToLower(p.Nombre)
	}

	json, err := json.Marshal(&pacientes)
	if err != nil {
		logger.Log.Println("Error al serializar pacientes a json", err.Error())
		json := `{"webapi": "hce:pacientes","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}


func ListOne(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	paciente := []Paciente{}
	id, _ :=  strconv.ParseUint(ps.ByName("id"),10,64)
	uid := uint(id)
	db := dbcfg.GetDB()

	// Run the query ( include citas in the result )
	db.Preload("Citas").
	   First(&paciente, uid)

	for i, p := range paciente {
		birthDate, _ := time.Parse("2006-01-02T15:04:05.000Z", p.FechaNac + "T00:00:00.000Z")
		paciente[i].Edad = age.Age(birthDate)
	}

	json, err := json.Marshal(&paciente)
	if err != nil {
		logger.Log.Println("Error al serializar paciente a json", err.Error())
		json := `{"webapi": "hce:paciente","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}

func Insert(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	paciente := Paciente{}
	err := json.NewDecoder(r.Body).Decode(&paciente)
	defer r.Body.Close()
	if err != nil {
		logger.Log.Printf("Insert Paciente error, cannot decode %s\n%s", r.Body, err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	db := dbcfg.GetDB()
	db.Create(&paciente)

	json, err := json.Marshal(&paciente)
	if err != nil {
		logger.Log.Println("Insert Paciente error al serializar a json", err.Error())
		json := `{"webapi": "hce:insert:paciente","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}

func Update(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	paciente := Paciente{}
	updatedPaciente := Paciente{}
	err := json.NewDecoder(r.Body).Decode(&updatedPaciente)
	defer r.Body.Close()
	if err != nil {
		logger.Log.Printf("Update Paciente error, cannot decode %s\n%s", r.Body, err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	db := dbcfg.GetDB()

	id, _ :=  strconv.ParseUint(ps.ByName("id"),10,64)
	uid := uint(id)
	db.First(&paciente,uid)

	paciente = updatedPaciente
	paciente.ID = uid

	db.Save(&paciente)

	json, err := json.Marshal(&paciente)
	if err != nil {
		logger.Log.Println("Update Paciente error al serializar a json", err.Error())
		json := `{"webapi": "hce:update:paciente","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))

}
