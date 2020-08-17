package dbcfg

import (
	"os"
	"github.com/jinzhu/gorm"
)

const (
	dbFileName = "../mi-consultorio.db"
)

var db *gorm.DB


func ConnectionString() (string) {
	return dbFileName
}

func CheckDatabaseFile() (error) {
	_, err := os.Stat(dbFileName)
	return err
}

func SetDB(_db *gorm.DB) {
	db = _db
}

func GetDB() (*gorm.DB) {
	return db
}