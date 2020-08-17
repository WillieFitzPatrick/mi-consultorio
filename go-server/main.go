package main

import (
	"./dbcfg"
	"./logger"
	// "./comanda"
	"./paciente"
	"./cita"
	// "./item"
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
	if os.Getenv("ASPNETCORE_PORT") != "" { // get enviroment variable that set by ACNM 
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

	db.AutoMigrate(&paciente.Paciente{})
	db.AutoMigrate(&cita.Cita{})
	// db.AutoMigrate(&comanda.Comanda{})
	// db.AutoMigrate(&comanda.ComandaItem{})
	// db.AutoMigrate(&item.Rubro{})
	// db.AutoMigrate(&item.Marca{})
	// db.AutoMigrate(&item.Item{})

	defer db.Close()

	// save a copy so it's shared in other packages
	dbcfg.SetDB(db)
	logger.Log.Println("connected to sqlite database")

	router := httprouter.New()
	router.GET("/", TestMsg)
	router.NotFound = http.HandlerFunc( MyNotFound )

	paciente.Routes(router, VERSION)
	cita.Routes(router, VERSION)
	// item.Routes(router, VERSION)

	fmt.Println("server started !")
	logger.Log.Fatal(http.ListenAndServe(":" + port, &Server{router}))

}

type Server struct {
	r *httprouter.Router
}

func (s *Server) ServeHTTP (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Credentials")
	s.r.ServeHTTP(w, r)
  }

func UpdateDB(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	logger.Log.Println("running migrations")
	//db.AutoMigrate(&users.Usuario{})
	logger.Log.Println("migrations finished")
	json := `{"webapi":"mrt:bienes-patrimoniales","version":"` + VERSION + `", "status":"outdated"}`
	fmt.Fprint(w, json)

}

// MyNotFound shows a simple test message
func MyNotFound(w http.ResponseWriter, r *http.Request) {
	json := `{"status":"error","error":"404","description":"page not found"}`
	logger.Log.Printf("Page not found")
	fmt.Fprint(w, json)
}


// TestMsg shows a simple test message
func TestMsg(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	json := `{"webapi":"mrt:bienes-patrimoniales","version":"` + VERSION + `", "status":"ok"}`
	fmt.Fprint(w, json)
}