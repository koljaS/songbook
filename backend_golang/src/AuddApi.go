package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	audd "github.com/AudDMusic/audd-go"
	"github.com/joho/godotenv"
)

func recognize() string {

	data, err := ioutil.ReadFile("src/audd-api-requests.txt")
	if err != nil {
		fmt.Println(err)
	}
	count, err := strconv.Atoi(string(data))
	if count >= 950 {
		panic("Request Limit erreicht. (max 950)")
	}
	count += 1
	countToWrite := strconv.Itoa(count)
	writeErr := ioutil.WriteFile("src/audd-api-requests.txt", []byte(countToWrite), 0644)
	if writeErr != nil {
		panic(writeErr.Error())
	}

	auddClient := audd.NewClient(os.Getenv("AUDD_IO_TOKEN"))
	file, err := os.Open("./download/testfile.mp3")
	if err != nil {
		panic(err)
	}

	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, file); err != nil {
		fmt.Println(err)
	}

	result, err := auddClient.Recognize(file, "lyrics,apple_music", nil)
	if err != nil {
		panic(err)
	}
	b, _ := json.Marshal(result)

	return string(b)
}

func recognizeHumming() string {
	return "Not implemented: Humming API."
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "Authorization")
}

func main() {
	fmt.Println("startup audd-audio-recognition service")

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	var golangAuddWebServiceToken = os.Getenv("WEBSERVICE_TOKEN")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello Go Service!")
	})

	http.HandleFunc("/recognize-audio", func(w http.ResponseWriter, r *http.Request) {

		// ONLY FOR TESTING!!!
		enableCors(&w)

		authToken := r.Header.Get("Authorization")
		httpMethod := r.Method
		if httpMethod != "POST" {
			fmt.Fprintf(w, "Wrong Request Method!")

			return
		}
		if authToken != golangAuddWebServiceToken {
			fmt.Fprintf(w, "Wrong Auth Token!")

			return
		}

		fmt.Println("in correct if else path!")
		file, fileHeader, err2 := r.FormFile("testfile.mp3")

		if fileHeader != nil {
			fmt.Println("fileHeader != nil")
		}
		if err2 != nil {
			fmt.Println("in err2")
			panic(err2)
		}
		defer file.Close()

		f, err3 := os.OpenFile("./download/testfile.mp3", os.O_WRONLY|os.O_CREATE, 0666)
		defer f.Close()
		io.Copy(f, file)
		if err3 != nil {
			fmt.Println("in err3")
			panic(err3)
		}

		auddClient := audd.NewClient(os.Getenv("AUDD_IO_TOKEN"))
		result, err := auddClient.Recognize(f, "lyrics,apple_music", nil)
		if err != nil {
			panic(err)
		}
		b, _ := json.Marshal(result)

		fmt.Fprintf(w, string(b))
	})

	http.ListenAndServe(":7770", nil)
}
