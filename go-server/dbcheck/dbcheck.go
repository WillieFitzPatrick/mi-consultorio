package dbcheck

import (
	"fmt"
	"net/http"
	"../dbcfg"
	"../logger"
	"github.com/jinzhu/gorm"
	"github.com/julienschmidt/httprouter"
	"../login"
	"../paciente"
	"../visita"
)

var VERSION = ""
var db *gorm.DB

func Routes(r *httprouter.Router, version string) {
	VERSION = version
	r.GET("/dbcheck", dbCheck)
}

func dbCheck(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	db := dbcfg.GetDB()

	// drop views
	db.Exec("DROP VIEW v_puv;")
	
	db.AutoMigrate(&login.Login{})
	db.AutoMigrate(&paciente.Paciente{})
	db.AutoMigrate(&visita.Visita{})

	//create views
	db.Exec(`create view v_puv as
			 select v.id, v.fecha, v.motivo, v.texto, p.*
			 from visitas v
			 left join pacientes p on v.paciente_id = p.id
			 order by v.fecha desc
			 limit 1`)

	db.Exec(`insert into logins (Nombre,Email,Password) values ('admin','sin email','1234')`)

	logger.Log.Println("dbcheck executed")
	fmt.Println("dbcheck executed.")

	json := `{"webapi":"hce:dbcheck","version":"` + VERSION + `", "status":"ok"}`
	fmt.Fprint(w, json)

}