package comanda

import (
	"strconv"
	"encoding/json"
	"fmt"
	"net/http"
	"../dbcfg"
	"../logger"
	"github.com/jinzhu/gorm"
	"github.com/julienschmidt/httprouter"
	"../item"
)

type Comanda struct {
	ID       uint   `gorm:"column:ID;primary_key;AUTO_INCREMENT" json:"ID"`
	Fecha    string `gorm:"column:Fecha" json:"Fecha"`
	Sucursal int    `gorm:"column:Sucursal" json:"Sucursal"`
	Puesto   int    `gorm:"column:Puesto" json:"Puesto"`
	Usuario  string `gorm:"column:Usuario" json:"Usuario"`
	Estado   int    `gorm:"column:Estado;default:0" json:"Estado"`
	Items	 []ComandaItem 
}

type ComandaItem struct {
	ID        uint    `gorm:"column:ID;primary_key;AUTO_INCREMENT" json:"ID"`
	ComandaID uint    `gorm:"column:ComandaID;" json:"-"`
	ItemID    int     `gorm:"column:ItemID;" json:"ItemID"`
	Item	  item.Item `gorm:"save_associations:false;"`
	Cantidad  int     `gorm:"column:Cantidad;" json:"Cantidad"`
	Precio    float64 `gorm:"column:Precio;" json:"Precio"`
}


var VERSION = ""
var db *gorm.DB

func Routes(r *httprouter.Router, version string) {
	VERSION = version
	r.GET("/comanda", List)
	r.GET("/comanda/:id", ListOne)
	r.POST("/comanda", Insert)
	r.PUT("/comanda/:id", Update)

	r.GET("/comandaitems/:id", ListItems)
}

func (Comanda) TableName() string {
	return "comandas"
}
func (ComandaItem) TableName() string {
	return "comanda_items"
}

func List(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	comanda := []Comanda{}
	db := dbcfg.GetDB()

	// Run the query
	db.
		Preload("Items").
		Preload("Items.Item").
		Preload("Items.Item.Rubro").
		Preload("Items.Item.Marca").
		Where("Estado=0").
		Find(&comanda)

	json, err := json.Marshal(&comanda)
	if err != nil {
		logger.Log.Println("Error al serializar comanda a json", err.Error())
		json := `{"webapi": "gbp:comanda","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}
func ListOne(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	comanda := []Comanda{}
	id, _ :=  strconv.ParseUint(ps.ByName("id"),10,64)
	uid := uint(id)
	db := dbcfg.GetDB()

	// Run the query
	db.
		Preload("Items").
		Preload("Items.Item").
		Preload("Items.Item.Rubro").
		Preload("Items.Item.Marca").
		First(&comanda, uid)

	json, err := json.Marshal(&comanda)
	if err != nil {
		logger.Log.Println("Error al serializar comanda a json", err.Error())
		json := `{"webapi": "gbp:comanda","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}
func ListItems(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	items := []ComandaItem{}
	id := ps.ByName("id")

	db := dbcfg.GetDB()

	// Run the query
	db.
		Where("ComandaID=" + id).
		Find(&items)	

	json, err := json.Marshal(&items)
	if err != nil {
		logger.Log.Println("Error al serializar items-comanda a json", err.Error())
		json := `{"webapi": "gbp:items-comanda","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}

func Insert(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	comanda := Comanda{}
	err := json.NewDecoder(r.Body).Decode(&comanda)
	defer r.Body.Close()
	if err != nil {
		logger.Log.Printf("Insert Comanda error, cannot decode %s\n%s", r.Body, err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	db := dbcfg.GetDB()
	db.Create(&comanda)

	json, err := json.Marshal(&comanda)
	if err != nil {
		logger.Log.Println("Insert Comanda error al serializar a json", err.Error())
		json := `{"webapi": "mrt:insert:comanda","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}

func Update(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	comanda := Comanda{}
	updatedComanda := Comanda{}
	err := json.NewDecoder(r.Body).Decode(&updatedComanda)
	defer r.Body.Close()
	if err != nil {
		logger.Log.Printf("Update Comanda error, cannot decode %s\n%s", r.Body, err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	db := dbcfg.GetDB()
	db.Debug().
		First(&comanda)

	comanda = updatedComanda

	db.Debug().
		Save(&comanda)

	json, err := json.Marshal(&comanda)
	if err != nil {
		logger.Log.Println("Update Comanda error al serializar a json", err.Error())
		json := `{"webapi": "mrt:update:comanda","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}
