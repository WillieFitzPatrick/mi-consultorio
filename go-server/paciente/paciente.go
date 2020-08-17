package paciente

import (
	"strconv"
	"encoding/json"
	"fmt"
	"net/http"
	"../dbcfg"
	"../logger"
	"github.com/jinzhu/gorm"
	"github.com/julienschmidt/httprouter"
	// "../item"
	"../cita"

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
	ObraSocial  string
	NroAfiliado string
	Citas 		[]cita.Cita `gorm:"save_associations:false;"`

}

// type ComandaItem struct {
// 	ID        uint    `gorm:"column:ID;primary_key;AUTO_INCREMENT" json:"ID"`
// 	ComandaID uint    `gorm:"column:ComandaID;" json:"-"`
// 	ItemID    int     `gorm:"column:ItemID;" json:"ItemID"`
// 	Item	  item.Item `gorm:"save_associations:false;"`
// 	Cantidad  int     `gorm:"column:Cantidad;" json:"Cantidad"`
// 	Precio    float64 `gorm:"column:Precio;" json:"Precio"`
// }


var VERSION = ""
var db *gorm.DB

func Routes(r *httprouter.Router, version string) {
	VERSION = version
	r.GET("/pacientes", List)
	r.GET("/pacientes/:id", ListOne)
	r.POST("/pacientes", Insert)
	r.PUT("/pacientes/:id", Update)

	// r.GET("/comandaitems/:id", ListItems)
}

func (Paciente) TableName() string {
	return "pacientes"
}
// func (ComandaItem) TableName() string {
// 	return "comanda_items"
// }

func List(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	pacientes := []Paciente{}
	db := dbcfg.GetDB()

	// Run the query
	db.
		// Preload("Citas").
		Find(&pacientes)

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
	db.
		Preload("Citas").
		First(&paciente, uid)

	json, err := json.Marshal(&paciente)
	if err != nil {
		logger.Log.Println("Error al serializar paciente a json", err.Error())
		json := `{"webapi": "hce:paciente","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}


// func ListItems(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

// 	items := []ComandaItem{}
// 	id := ps.ByName("id")

// 	db := dbcfg.GetDB()

// 	// Run the query
// 	db.
// 		Where("ComandaID=" + id).
// 		Find(&items)	

// 	json, err := json.Marshal(&items)
// 	if err != nil {
// 		logger.Log.Println("Error al serializar items-comanda a json", err.Error())
// 		json := `{"webapi": "gbp:items-comanda","version": "` + VERSION + `", "status": "error"}`
// 		fmt.Fprint(w, json)
// 		return
// 	}
// 	fmt.Fprint(w, string(json))
// }

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
	db.Debug().
		First(&paciente)

		paciente = updatedPaciente

	db.Debug().
		Save(&paciente)

	json, err := json.Marshal(&paciente)
	if err != nil {
		logger.Log.Println("Update Paciente error al serializar a json", err.Error())
		json := `{"webapi": "hce:update:paciente","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}
