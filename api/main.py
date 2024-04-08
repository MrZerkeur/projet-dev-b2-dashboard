from flask import Flask, jsonify, request, send_file
import mysql.connector
import requests
import base64

app = Flask(__name__)

conn = mysql.connector.connect(
    host='DB',
    user='db_projet_dev',
    password='test',
    database='db_projet_dev'
)
cursor = conn.cursor()


# @app.route("/sites/<id_site>/images", methods=['GET'])
# def get_images(id_site):
#     url = 'http://file-server:8000/chat.jpeg'
#     filename = 'chat.jpeg'
#     response = requests.get(url)
#     if response.status_code == 200:
#         with open(filename, 'wb') as f:
#             f.write(response.content)
#         return send_file(filename, mimetype='image/jpeg')
#     else:
#         return "Failed to download image."


@app.route("/sites/<id_site>/images", methods=['GET'])
def get_all_images(id_site):
    cursor.execute('SELECT name, image_path, section_name, site_id from db_projet_dev.images p where site_id = %s;', (id_site,))
    rows = cursor.fetchall()
    
    images_data = []
    for row in rows:
        image_path = row[1]
        image_url = f"http://file-server:8000/{image_path}"
        response = requests.get(image_url)
        if response.status_code == 200:
            image_data_base64 = base64.b64encode(response.content).decode('utf-8')
        else:
            image_data_base64 = None
        image_data = {
            'name': row[0],
            'image_base64': image_data_base64,
            'section_name': row[2],
            'site_id': row[3]
        }
        images_data.append(image_data)
    
    return jsonify({'images_data': images_data})


@app.route("/sites/<id_site>/texts", methods=['GET'])
def get_texts(id_site):
    cursor.execute('SELECT content, section_name from db_projet_dev.texts t WHERE site_id = %s;', (id_site,))
    texts = cursor.fetchall()
    texts_json = [{'content': text[0], 'section_name': text[1]} for text in texts]

    return jsonify({'texts': texts_json})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0')

# @app.route("/sites/<id_site>/images", methods=['GET'])
# def get_images(id_site):
#     cursor.execute('SELECT name, section_name from db_projet_dev.images p WHERE site_id = %s;', (id_site,))
#     results = cursor.fetchall()
#     # for result in results:
#     #     name, section_name = result
#     #     to_return = name, section_name, id_site, result, results
#     #     return to_return
#     print(name)
#     print(section_name)
#     print(id_site)
#     print(result)
#     print(results)
#     url = f'http://file-server:8000/{id_site}/{section_name}/{name}'
#     filename = f'{name}'
#     response = requests.get(url)
#     if response.status_code == 200:
#         with open(filename, 'wb') as f:
#             f.write(response.content)
#     else:
#         return "Failed to download image."
    
    # If all images are downloaded successfully, send the last image
    # if results:
    #     return send_file(filename, mimetype='image/jpeg')
    # else:
    #     return "No images found."

    # url = 'http://file-server:8000/chat.jpeg'
    # filename = 'chat.jpeg'
    # response = requests.get(url)
    # if response.status_code == 200:
    #     with open(filename, 'wb') as f:
    #         f.write(response.content)
    #     return send_file(filename, mimetype='image/jpeg')
    # else:
    #     return "Failed to download image."

# SELECT name, section_name from db_projet_dev.images p WHERE site_id = 2;

