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
	Motivo      string
	Texto		string
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
	r.GET("/visitas", List)
	r.GET("/visitas/:id", ListOne)
	r.POST("/visitas", Insert)
	r.PUT("/visitas/:id", Update)
	r.DELETE("/visitas/:id", Delete)

	// r.GET("/comandaitems/:id", ListItems)
}

func (Visita) TableName() string {
	return "visitas"
}
// func (ComandaItem) TableName() string {
// 	return "comanda_items"
// }

func List(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	visitas := []Visita{}
	db := dbcfg.GetDB()

	// Run the query
	db.
		// Preload("Items").
		// Preload("Items.Item").
		// Preload("Items.Item.Rubro").
		// Preload("Items.Item.Marca").
		// Where("Estado=0").
		Find(&visitas)

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
	db.
		// Preload("Items").
		// Preload("Items.Item").
		// Preload("Items.Item.Rubro").
		// Preload("Items.Item.Marca").
		First(&visita, uid)

	json, err := json.Marshal(&visita)
	if err != nil {
		logger.Log.Println("Error al serializar Visita a json", err.Error())
		json := `{"webapi": "hce:Visita","version": "` + VERSION + `", "status": "error"}`
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
