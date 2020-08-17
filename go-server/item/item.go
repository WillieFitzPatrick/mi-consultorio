package item

import (
	"encoding/json"
	"fmt"
	"net/http"
	"../dbcfg"
	"../logger"
	"github.com/jinzhu/gorm"
	"github.com/julienschmidt/httprouter"
)

type Rubro struct {
	ID      uint   `gorm:"column:ID;primary_key;AUTO_INCREMENT" json:"ID"`
	Descrip string `gorm:"column:Descrip;" json:"Descrip"`
}
type Marca struct {
	ID      uint   `gorm:"column:ID;primary_key;AUTO_INCREMENT" json:"ID"`
	Descrip string `gorm:"column:Descrip;" json:"Descrip"`
}

type Item struct {
	ID       uint    `gorm:"column:ID;primary_key;AUTO_INCREMENT" json:"ID"`
	Codigo   string  `gorm:"column:Codigo" json:"Codigo"`
	CodBarra string  `gorm:"column:CodBarra" json:"CodBarra"`
	Descrip  string  `gorm:"column:Descrip;" json:"Descrip"`
	Present  string  `gorm:"column:Present;" json:"Present"`
	Fecha    string  `gorm:"column:Fecha" json:"Fecha"`
	Precio   float64 `gorm:"column:Precio;" json:"Precio"`
	RubroID  int     `gorm:"column:RubroID" json:"-"`
	Rubro    Rubro
	MarcaID  int `gorm:"column:MarcaID" json:"-"`
	Marca    Marca
}

var VERSION = ""
var db *gorm.DB

func Routes(r *httprouter.Router, version string) {
	VERSION = version
	r.GET("/rubros", ListRubros)
	r.GET("/marcas", ListMarcas)
	r.GET("/items", ListItems)
}

func (Rubro) TableName() string {
	return "rubros"
}
func (Marca) TableName() string {
	return "marcas"
}
func (Item) TableName() string {
	return "items"
}

func ListRubros(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	rubros := []Rubro{}
	db := dbcfg.GetDB()

	db.
		// Preload("Items").
		Find(&rubros)

	json, err := json.Marshal(&rubros)
	if err != nil {
		logger.Log.Println("Error al serializar rubros a json", err.Error())
		json := `{"webapi": "gbp:rubros","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}

func ListMarcas(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	marcas := []Marca{}
	db := dbcfg.GetDB()

	db.
		// Preload("Items").
		Find(&marcas)

	json, err := json.Marshal(&marcas)
	if err != nil {
		logger.Log.Println("Error al serializar marcas a json", err.Error())
		json := `{"webapi": "gbp:marcas","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}
func ListItems(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	items := []Item{}
	db := dbcfg.GetDB()

	db.
		Preload("Rubro").
		Preload("Marca").
		Find(&items)

	json, err := json.Marshal(&items)
	if err != nil {
		logger.Log.Println("Error al serializar items a json", err.Error())
		json := `{"webapi": "gbp:items","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}

// func ListOne(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

// 	comanda := []Comanda{}
// 	id, _ :=  strconv.ParseUint(ps.ByName("id"),10,64)
// 	uid := uint(id)
// 	db := dbcfg.GetDB()

// 	// Run the query
// 	db.
// 		Preload("Items").
// 		First(&comanda, uid)

// 	json, err := json.Marshal(&comanda)
// 	if err != nil {
// 		logger.Log.Println("Error al serializar comanda a json", err.Error())
// 		json := `{"webapi": "gbp:comanda","version": "` + VERSION + `", "status": "error"}`
// 		fmt.Fprint(w, json)
// 		return
// 	}
// 	fmt.Fprint(w, string(json))
// }
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
