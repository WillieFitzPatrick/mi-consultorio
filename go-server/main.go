package main

import (
	"./dbcfg"
	"./logger"
	"./dbcheck"
	"./login"
	"./paciente"
	"./visita"
	"fmt"
	"os"
	"net/http"
	"github.com/julienschmidt/httprouter"
	// "github.com/rs/cors"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB

const (
	VERSION = "0.10"
)

func main() {
	fmt.Println("Starting server...")
	port := "8400"
	// get enviroment variable that set by ACNM 
	if os.Getenv("ASPNETCORE_PORT") != "" { 
		port = os.Getenv("ASPNETCORE_PORT")
	}
	logger.Log.Println("Listening on port: ", port)
	fmt.Println(" * started on port : " + port)
	fmt.Println(" * logging to file: ./server.log")

	// Check if database exists
	err := dbcfg.CheckDatabaseFile() 
	if err != nil {
		logger.Log.Println("Error: ", err.Error())
		fmt.Println("Error: ", err.Error())
		os.Exit(1)
	}

	// Connect to database
	db, err := gorm.Open("sqlite3", dbcfg.ConnectionString())
	
	if  err != nil {
		logger.Log.Println("Error al conectar con la base de datos", err.Error())
		fmt.Println("Error al conectar con la base de datos:", err.Error())
		os.Exit(1)
	}

	defer db.Close()

	// save a copy so it's shared in other packages
	dbcfg.SetDB(db)
	logger.Log.Println("connected to sqlite database")

	router := httprouter.New()
	router.GET("/server/test", TestMsg)
	router.NotFound = http.HandlerFunc( MyNotFound )

	paciente.Routes(router, VERSION)
	visita.Routes(router, VERSION)
	login.Routes(router, VERSION)
	dbcheck.Routes(router, VERSION)

	fmt.Println("server started !")
	logger.Log.Fatal(http.ListenAndServe(":" + port, &Server{router}))

}

type Server struct {
	r *httprouter.Router
}

func (s *Server) ServeHTTP (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	// w.Header().Set("Access-Control-Allow-Origin", "http://miconsultorio.swapps.com.ar")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Credentials")
	s.r.ServeHTTP(w, r)
  }


// MyNotFound shows a simple test message
func MyNotFound(w http.ResponseWriter, r *http.Request) {
	logger.Log.Printf("Page not found:" + r.URL.Path)
	json := `{"status":"error", "error":"404","description": "page not found","url": ` + r.URL.Path + `}`
	fmt.Fprint(w, json)
}


// TestMsg shows a simple test message
func TestMsg(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	json := `{"webapi":"hce:test","version":"` + VERSION + `", "status":"ok"}`
	fmt.Fprint(w, json)
}