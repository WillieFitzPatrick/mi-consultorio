package logger

import (
  "fmt"
  "os"
  "log"
)

var (
  Log *log.Logger
)

func init() {

  file, err := os.OpenFile("./server.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

  if err != nil {
    fmt.Printf("error opening log file (./server.log) : %s ", err.Error())
  }
  // Log = log.New(file, "", log.LstdFlags)
  Log = log.New(file, "", log.LstdFlags|log.Lshortfile)

}