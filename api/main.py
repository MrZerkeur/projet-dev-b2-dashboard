from flask import Flask, jsonify, request
import mysql.connector

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
    return id_site
    # cursor.execute('SELECT * FROM users')
    # users = cursor.fetchall()
    # user_list = []
    # for user in users:
    #     user_dict = {'id': user[0], 'name': user[1], 'email': user[2]}
    #     user_list.append(user_dict)
    # return jsonify({'users': user_list})


@app.route("/sites/<id_site>/texts", methods=['GET'])
def get_texts(id_site):
    cursor.execute('SELECT content, section_name from db_projet_dev.texts t WHERE site_id = %s;', (id_site,))
    texts = cursor.fetchall()
    texts_json = [{'content': text[0], 'section_name': text[1]} for text in texts]

    return jsonify({'texts': texts_json})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0')