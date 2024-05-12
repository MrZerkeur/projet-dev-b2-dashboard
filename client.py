import socket

def tcp_client(host, port):
    # Create a TCP/IP socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
        try:
            # Connect to the server
            client_socket.connect((host, port))

            # Send data to the server
            message = "Hello, TCP Server!"
            client_socket.sendall(message.encode())

            # Receive data from the server
            response = client_socket.recv(1024)
            print(f"Received from server: {response.decode()}")

        except ConnectionRefusedError:
            print(f"Connection to {host}:{port} refused.")
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Specify the host and port of the TCP server
    server_host = "0.0.0.0"  # Change this to your server's IP address or hostname
    server_port = 12345

    # Call the TCP client function
    tcp_client(server_host, server_port)