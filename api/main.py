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
    return id_site

if __name__ == '__main__':
    app.run(host='0.0.0.0')