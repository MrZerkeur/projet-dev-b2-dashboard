from flask import Flask, jsonify, request, send_file
import mysql.connector
import requests

app = Flask(__name__)

conn = mysql.connector.connect(
    host='DB',
    user='db_projet_dev',
    password='test',
    database='db_projet_dev'
)
cursor = conn.cursor()

@app.route("/sites/<id_site>/images", methods=['GET'])
def get_images(id_site):
    url = 'http://file-server:8000/chat.jpeg'
    filename = 'chat.jpeg'
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        return send_file(filename, mimetype='image/jpeg')
    else:
        return "Failed to download image."


@app.route("/sites/<id_site>/texts", methods=['GET'])
def get_texts(id_site):
    cursor.execute('SELECT content, section_name from db_projet_dev.texts t WHERE site_id = %s;', (id_site,))
    texts = cursor.fetchall()
    texts_json = [{'content': text[0], 'section_name': text[1]} for text in texts]

    return jsonify({'texts': texts_json})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0')