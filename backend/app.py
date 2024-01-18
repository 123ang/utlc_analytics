from flask import Flask, request, jsonify
import mysql.connector
from user import User
from dashboard import Dashboard


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


user_routes = User(app)
dashboard_routes = Dashboard(app)

if __name__ == '__main__':
    app.run(debug=True)