from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from sys import stderr
import mysql.connector
import requests
import base64
import os
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

#TODO Change to environement variables
# conn = mysql.connector.connect(
#     host="db",
#     user='maria-woman',
#     password='Q_ml8G80x]Gborqb!Z$m.8@pg7$O'
#     database='db_projet_dev'
# )


@app.route("/sites/<id_site>/images", methods=['GET'])
def get_all_images(id_site):
    conn = mysql.connector.connect(
        host="db",
        user='maria-woman',
        password='Q_ml8G80x]Gborqb!Z$m.8@pg7$O',
        database='db_projet_dev'
    )
    cursor = conn.cursor()
    cursor.execute('SELECT name, path, section_name, site_id from db_projet_dev.images p where site_id = %s;', (id_site,))
    rows = cursor.fetchall()
    # print(rows, file=stderr)
    images_data = []
    for row in rows:
        image_path = row[1]
        if os.path.exists(image_path):
            with open(image_path, 'rb') as image_file:
                image_data_base64 = base64.b64encode(image_file.read()).decode('utf-8')
        else:
            image_data_base64 = None
        
        image_data = {
            'name': row[0],
            'image_base64': image_data_base64,
            'section_name': row[2],
            'site_id': row[3],
        }
        logger.debug(f"Row : {row}")
        images_data.append(image_data)
    print(images_data, file=stderr)
    cursor.close()
    conn.close()
    
    return jsonify({'images_data': images_data}), 200

@app.route("/sites/<id_site>/images/<image_id>", methods=['GET'])
def get_specific_image(id_site, image_id):
    print(id_site, image_id, file=stderr)
    conn = mysql.connector.connect(
        host="db",
        user='maria-woman',
        password='Q_ml8G80x]Gborqb!Z$m.8@pg7$O',
        database='db_projet_dev'
    )
    cursor = conn.cursor()
    cursor.execute('SELECT name, path, section_name from db_projet_dev.images p where image_id = %s and site_id = %s;', (image_id, id_site,))
    rows = cursor.fetchall()
    images_data = []
    print(rows, file=stderr)
    for row in rows:
        image_path = row[1]
        if os.path.exists(image_path):
            with open(image_path, 'rb') as image_file:
                image_data_base64 = base64.b64encode(image_file.read()).decode('utf-8')
        else:
            image_data_base64 = None
        
        image_data = {
            'name': row[0],
            'image_base64': image_data_base64,
            'section_name': row[2],
        }
        images_data.append(image_data)
    cursor.close()
    conn.close()
    return jsonify({'images_data': images_data})

# Reçoit le base64 et le path dans un json
@app.route("/sites/<id_site>/images", methods=["POST"])
def add_image(id_site):
    if not request.json:
        return jsonify({'error': 'No JSON data received'}), 400

    if 'base64_encoded_image' not in request.json or 'path' not in request.json:
        return jsonify({'error': 'Missing required fields in JSON data'}), 400

    base64_encoded_image = request.json['base64_encoded_image']
    path = request.json['path']

    try:
        directory = os.path.dirname(path)

        if not os.path.exists(directory):
            os.makedirs(directory)

        binary_data = base64.b64decode(base64_encoded_image)

        with open(path, 'wb') as file:
            file.write(binary_data)

        return jsonify({'message': "Image added successfully",
                        'path': path}), 201
    except Exception as e:
        return jsonify({'message': "An error occurred",
                        'error': str(e)}), 500

@app.route("/sites/<id_site>/images", methods=["DELETE"])
def delete_image(id_site):
    if not request.json:
        return jsonify({'error': 'No JSON data received'}), 400

    if 'path' not in request.json:
        return jsonify({'error': 'Missing required fields in JSON data'}), 400
    
    path = request.json['path']

    try:
        if os.path.exists(path):
            os.remove(path)
            dir_path = os.path.dirname(path)
            if not os.listdir(dir_path):
                os.rmdir(dir_path)
            
            return jsonify({'message': 'Image deleted successfully'}), 201
        else:
            return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


@app.route("/sites/<id_site>/texts", methods=['GET'])
def get_texts(id_site):
    conn = mysql.connector.connect(
        host="db",
        user='maria-woman',
        password='Q_ml8G80x]Gborqb!Z$m.8@pg7$O',
        database='db_projet_dev'
    )
    cursor = conn.cursor()
    cursor.execute('SELECT content, section_name from db_projet_dev.texts t WHERE site_id = %s;', (id_site,))
    texts = cursor.fetchall()
    texts_json = [{'content': text[0], 'section_name': text[1]} for text in texts]
    cursor.close()
    conn.close()
    return jsonify({'texts': texts_json})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)


# FONCTIONNE MAIS QUE SI ON UTILISE LE FILE SERVER

# @app.route("/sites/<id_site>/images", methods=['GET'])
# def get_all_images(id_site):
#     cursor.execute('SELECT name, image_path, section_name, site_id from db_projet_dev.images p where site_id = "%s";', (id_site,))
#     rows = cursor.fetchall()
    
#     images_data = []
#     for row in rows:
#         image_path = row[1]
#         image_url = f"http://file-server:8000/{image_path}"
#         response = requests.get(image_url)
#         if response.status_code == 200:
#             image_data_base64 = base64.b64encode(response.content).decode('utf-8')
#         else:
#             image_data_base64 = None
#         image_data = {
#             'name': row[0],
#             'image_base64': image_data_base64,
#             'section_name': row[2],
#             'site_id': row[3],
#         }
#         images_data.append(image_data)
    
#     return jsonify({'images_data': images_data})

# @app.route("/sites/<id_site>/images/<image_id>", methods=['GET'])
# def get_specific_image(id_site, image_id):
#     cursor.execute('SELECT name, image_path, section_name from db_projet_dev.images p where image_id = "%s" and site_id = "%s";', (id_site, image_id,))
#     rows = cursor.fetchall()

#     images_data = []
#     for row in rows:
#         image_path = row[1]
#         image_url = f"http://file-server:8000/{image_path}"
#         response = requests.get(image_url)
#         if response.status_code == 200:
#             image_data_base64 = base64.b64encode(response.content).decode('utf-8')
#         else:
#             image_data_base64 = None
#             image_data = {
#                 'name': row[0],
#                 'image_base64': image_data_base64,
#                 'section_name': row[2],
#             }
#         images_data.append(image_data)
    
#     return jsonify({'images_data': images_data})