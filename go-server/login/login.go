package login

import (
	"encoding/json"
	"fmt"
	"net/http"

	"../dbcfg"
	"../logger"
	"github.com/jinzhu/gorm"
	"github.com/julienschmidt/httprouter"
)

// Create a struct to read the cuit, email and password from the request body
type Credentials struct {
	Usuario   string `json:"usuario"`
	Password  string `json:"password"`
}

type Login struct {
	ID       uint `gorm:"column:id;primary_key;AUTO_INCREMENT" json:"-"`
	Nombre   string
	Email    string
	Password string `json:"-"`
}



var VERSION = ""
var db *gorm.DB

func Routes(r *httprouter.Router, version string) {
	VERSION = version
	r.POST("/server/login", doLogin)
}

func (Login) TableName() string {
	return "logins"
}

func doLogin(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	defer r.Body.Close()
	if err != nil {
		logger.Log.Printf("Login error, cannot decode %s\n%s", r.Body, err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	login := Login{}

	db := dbcfg.GetDB()
	db.Raw(`select nombre,email from logins where (Nombre=? or Email=?) and Password=?`,creds.Usuario,creds.Usuario,creds.Password).Scan(&login)

	if login.Nombre == "" || login.Email == "" {
		logger.Log.Println("Los datos ingresados son incorrectos.")
		json := `{"webapi": "hce:login.datos incorrectos","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}

	json, err := json.Marshal(&login)
	if err != nil {
		logger.Log.Println("Login error al serializar a json", err.Error())
		json := `{"webapi": "hce:login","version": "` + VERSION + `", "status": "error"}`
		fmt.Fprint(w, json)
		return
	}
	fmt.Fprint(w, string(json))
}
