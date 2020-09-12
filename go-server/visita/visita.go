package visita

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

)

type Visita struct {
	ID  		uint   `gorm:"column:id;primary_key;AUTO_INCREMENT"`
	PacienteID  uint
	Fecha       string
	Motivo      string
	Texto		string
}

var VERSION = ""
var db *gorm.DB

func Routes(r *httprouter.Router, version string) {
	VERSION = version
	r.GET("/server/visitas", List)
	r.GET("/server/visitas/:id", ListOne)
	r.POST("/server/visitas", Insert)
	r.PUT("/server/visitas/:id", Update)
	r.DELETE("/server/visitas/:id", Delete)
}

func (Visita) TableName() string {
	return "visitas"
}

func List(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	visitas := []Visita{}
	db := dbcfg.GetDB()

	// Run the query
	db.Find(&visitas)

	json, err := json.Marshal(&visitas)
	if err != nil {
		logger.Log.Println("Error al serializar visitas a json", err.Error())
		json := `{"webapi": "hce:visitas","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}
func ListOne(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	visita := []Visita{}
	id, _ :=  strconv.ParseUint(ps.ByName("id"),10,64)
	uid := uint(id)
	db := dbcfg.GetDB()

	// Run the query
	db.First(&visita, uid)

	json, err := json.Marshal(&visita)
	if err != nil {
		logger.Log.Println("Error al serializar Visita a json", err.Error())
		json := `{"webapi": "hce:Visita","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}

func Insert(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	visita := Visita{}
	err := json.NewDecoder(r.Body).Decode(&visita)
	defer r.Body.Close()
	if err != nil {
		logger.Log.Printf("Insert Visita error, cannot decode %s\n%s", r.Body, err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	db := dbcfg.GetDB()
	db.Create(&visita)

	json, err := json.Marshal(&visita)
	if err != nil {
		logger.Log.Println("Insert Visita error al serializar a json", err.Error())
		json := `{"webapi": "hce:insert:visita","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}

func Update(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	visita := Visita{}
	updatedVisita := Visita{}
	err := json.NewDecoder(r.Body).Decode(&updatedVisita)
	defer r.Body.Close()
	if err != nil {
		logger.Log.Printf("Update Visita error, cannot decode %s\n%s", r.Body, err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	db := dbcfg.GetDB()
	db.First(&visita)

	visita = updatedVisita
	db.Save(&visita)

	json, err := json.Marshal(&visita)
	if err != nil {
		logger.Log.Println("Update Visita error al serializar a json", err.Error())
		json := `{"webapi": "hce:update:visita","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}

func Delete(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	id, _ :=  strconv.ParseUint(ps.ByName("id"),10,64)
	uid := uint(id)
	db := dbcfg.GetDB()
	visita := Visita{}

	// Run the query
	db.Where(&visita).First(&visita, uid)
	if visita.ID == 0 {
		logger.Log.Println("Eliminar visita : No encuentro la visita con ID :", id)
		json := `{"webapi": "hce:visitas","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	db.Delete(&visita)
	logger.Log.Println("Se elimino la visita con id: ", id)
	json := `{"webapi": "hce:visitas","version": "` + VERSION + `", "status": "ok"}`
	fmt.Fprint(w, json)
	return

}
