package main

import (
	"fmt"
	"net"
)

func main() {
	// Listen for incoming connections
	listener, err := net.Listen("tcp", "localhost:12345")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer listener.Close()

	fmt.Println("Server is listening on port 12345")

	for {
		// Accept incoming connections
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Error:", err)
			continue
		}
		fmt.Println(conn.RemoteAddr())

		// Handle client connection in a goroutine
		go handleClient(conn)
	}
}

func handleClient(conn net.Conn) {
	defer conn.Close()

	// Create a buffer to read data into
	buffer := make([]byte, 1024)

	for {
		// Read data from the client
		n, err := conn.Read(buffer)
		if err != nil {
			fmt.Println("Error:", err)
			conn.Close()
			return
		}
		fmt.Printf("Received: %s\n", buffer[:n])

		// if (buffer[:n] == "It is time to update !") {

		// }

		_, err = conn.Write([]byte("Notification received !"))
		conn.Close()
		return
	}
}
