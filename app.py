from flask import Flask, request, jsonify
import mysql.connector
import bcrypt
import random
import string
import hashlib

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="",
        database="utlc_datawarehouse"
    )

@app.route('/')
def index():
    return "Hello, UTLC Analytics!"

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    name = data['name']
    email = data['email']
    username = data['username']
    # Generate a random password
    random_password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
    hashed_password = bcrypt.hashpw(random_password.encode('utf-8'), bcrypt.gensalt())

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO USERS (name, email, username, password, created_by, created_at) VALUES (%s, %s, %s, %s, %s, NOW())',
        (name, email, username, hashed_password, 'system'))
    conn.commit()
    cursor.close()
    conn.close()

    # Send password to user's email (email sending code here)

    return jsonify({'message': 'User created successfully', 'password': random_password}), 201

if __name__ == '__main__':
    app.run(debug=True)