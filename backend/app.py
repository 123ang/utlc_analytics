from flask import Flask, request, jsonify
import mysql.connector
from user import User
from dashboard import Dashboard


app = Flask(__name__)


@app.route('/api')
def index():
    return "Hello, UTLC Analytics!"


user_routes = User(app)
dashboard_routes = Dashboard(app)

if __name__ == '__main__':
    app.run()