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

@app.route("/users")
def get_users():
    cursor.execute('SELECT * FROM users')
    users = cursor.fetchall()
    user_list = []
    for user in users:
        user_dict = {'id': user[0], 'name': user[1], 'email': user[2]}
        user_list.append(user_dict)
    return jsonify({'users': user_list})


if __name__ == '__main__':
    app.run(host='0.0.0.0')