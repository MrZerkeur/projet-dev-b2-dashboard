import socket
import requests
import os
import base64
import shutil


def get_data_from_api(api_url: str):
    try:
        response = requests.get(api_url)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"Request failed: {response.status_code}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"API request error occured: {e}")
        return None
    
    
def upload_image(encoded_image, image_path):
    try:
        directory = os.path.dirname(image_path)

        if not os.path.exists(directory):
            os.makedirs(directory)

        binary_data = base64.b64decode(encoded_image)

        with open(image_path, 'wb') as file:
            file.write(binary_data)
        
        print("Upload success")

    except Exception as e:
        print(str(e))
        
        
def find_and_delete_image(image_id, root_folder):
    for root, dirs, files in os.walk(root_folder):
        if os.path.basename(root) == str(image_id):
            # Delete the folder
            shutil.rmtree(root)
            print("Delete success")
            return
    print(f"No file found for ID '{image_id}' within folders named '{image_id}'.")


def main():
    tcp_port = 12346
    tcp_host = '127.0.0.1'
    api_host = '127.0.0.1'
    api_port = 5000

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((tcp_host, tcp_port))

    print(f"Server started at port {
        tcp_port}")

    s.listen(1)

    while True:
        conn, addr = s.accept()

        print(f"Client {addr[0]} is connected")

        try:
            response = conn.recv(75)
            data = response.decode().split('|')

            action = int(data[0])
            image_id = data[1]
            site_id = data[2]

            if action == 0:
                print('Upload image')
                data = get_data_from_api(f'http://{api_host}:{api_port}/sites/{site_id}/images/{image_id}')

                if data == None:
                    conn.send(b'1')
                    conn.close()
                    continue

                images_data_list = data.get("images_data")

                for image_data in images_data_list:
                    image_path = f"assets/images/{image_data['section_name']}/{image_id}/{image_data['name']}"
                    upload_image(image_data['image_base64'], image_path)

            elif action == 1:
                print('Delete image')
                images_folder = 'assets/images/'
                find_and_delete_image(image_id, images_folder)
                
            conn.send(b'0')
            conn.close()

        except socket.error:
            conn.send(b'1')
            print("Error Occured.")
            break

    s.close()
    
if __name__ == '__main__':
    main()