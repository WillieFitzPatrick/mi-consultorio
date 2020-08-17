package cita

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

type Cita struct {
	// id       uint   `gorm:"column:id;primary_key;AUTO_INCREMENT" json:"ID"`
	// TipoDoc    string `gorm:"column:tipo_doc" json:"TipoDoc"`
	// NroDoc int    `gorm:"column:nro_doc" json:"Sucursal"`
	// Puesto   int    `gorm:"column:Puesto" json:"Puesto"`
	// Usuario  string `gorm:"column:Usuario" json:"Usuario"`
	// Estado   int    `gorm:"column:Estado;default:0" json:"Estado"`
	// Items	 []ComandaItem 

	ID  		uint   `gorm:"column:id;primary_key;AUTO_INCREMENT"`
	PacienteID  uint
	Fecha       string
	Text		string

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
	r.GET("/citas", List)
	r.GET("/citas/:id", ListOne)
	// r.POST("/comanda", Insert)
	// r.PUT("/comanda/:id", Update)

	// r.GET("/comandaitems/:id", ListItems)
}

func (Cita) TableName() string {
	return "citas"
}
// func (ComandaItem) TableName() string {
// 	return "comanda_items"
// }

func List(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	citas := []Cita{}
	db := dbcfg.GetDB()

	// Run the query
	db.
		// Preload("Items").
		// Preload("Items.Item").
		// Preload("Items.Item.Rubro").
		// Preload("Items.Item.Marca").
		// Where("Estado=0").
		Find(&citas)

	json, err := json.Marshal(&citas)
	if err != nil {
		logger.Log.Println("Error al serializar citas a json", err.Error())
		json := `{"webapi": "hce:citas","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}
func ListOne(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	cita := []Cita{}
	id, _ :=  strconv.ParseUint(ps.ByName("id"),10,64)
	uid := uint(id)
	db := dbcfg.GetDB()

	// Run the query
	db.
		// Preload("Items").
		// Preload("Items.Item").
		// Preload("Items.Item.Rubro").
		// Preload("Items.Item.Marca").
		First(&cita, uid)

	json, err := json.Marshal(&cita)
	if err != nil {
		logger.Log.Println("Error al serializar Cita a json", err.Error())
		json := `{"webapi": "hce:Cita","version": "` + VERSION + `", "status": "error"}`
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

// func Insert(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	comanda := Comanda{}
// 	err := json.NewDecoder(r.Body).Decode(&comanda)
// 	defer r.Body.Close()
// 	if err != nil {
// 		logger.Log.Printf("Insert Comanda error, cannot decode %s\n%s", r.Body, err.Error())
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}
// 	db := dbcfg.GetDB()
// 	db.Create(&comanda)

// 	json, err := json.Marshal(&comanda)
// 	if err != nil {
// 		logger.Log.Println("Insert Comanda error al serializar a json", err.Error())
// 		json := `{"webapi": "mrt:insert:comanda","version": "` + VERSION + `", "status": "error"}`
// 		fmt.Fprint(w, json)
// 		return
// 	}
// 	fmt.Fprint(w, string(json))
// }

// func Update(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	comanda := Comanda{}
// 	updatedComanda := Comanda{}
// 	err := json.NewDecoder(r.Body).Decode(&updatedComanda)
// 	defer r.Body.Close()
// 	if err != nil {
// 		logger.Log.Printf("Update Comanda error, cannot decode %s\n%s", r.Body, err.Error())
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}
// 	db := dbcfg.GetDB()
// 	db.Debug().
// 		First(&comanda)

// 	comanda = updatedComanda

// 	db.Debug().
// 		Save(&comanda)

// 	json, err := json.Marshal(&comanda)
// 	if err != nil {
// 		logger.Log.Println("Update Comanda error al serializar a json", err.Error())
// 		json := `{"webapi": "mrt:update:comanda","version": "` + VERSION + `", "status": "error"}`
// 		fmt.Fprint(w, json)
// 		return
// 	}
// 	fmt.Fprint(w, string(json))
// }
