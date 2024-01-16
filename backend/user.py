from flask import request, jsonify
import random
import string
import bcrypt
from database import execute_command,fetch_data
from email_service import send_email


class User:
    def __init__(self, app):
        self.app = app
        self.setup_routes()

    def setup_routes(self):

        @self.app.route('/user/create', methods=['POST'])
        def create_user():
            data = request.json
            name = data.get('name')
            email = data.get('email')
            username = data.get('username')
            # Remove 'password' as it's not used here
            created_by = data.get('created_by', 'system')  # Default to 'system' if not provided
            role = 'user'  # Assuming you want to set a default role

            check_user_sql = "SELECT id FROM USERS WHERE email = %s OR username = %s"
            existing_user = fetch_data(check_user_sql, (email, username))
            if existing_user:
                return jsonify({'message': 'User already exists'}), 409
            # Insert new user row
            insert_sql = (
                "INSERT INTO USERS (name, email, username, role, password, created_by, created_at, updated_at, updated_by) "
                "VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW(), %s)")
            temp_password = None  # Temporary password placeholder
            insert_result = execute_command(insert_sql, (name, email, username, role, temp_password, created_by, created_by))

            if insert_result == "Success":
                # Generate, hash, and update the user's password
                new_password = self.generate_password(email)
                return jsonify({'message': 'User created successfully', 'password': new_password}), 201
            else:
                return jsonify({'message': 'Error creating user'}), 500

        @self.app.route('/user/login', methods=['POST'])
        def login():
            data = request.json
            email = data.get('email')
            username = data.get('username')
            password = data.get('password')

            sql = "SELECT password FROM USERS WHERE email = %s OR username = %s"
            user_record = fetch_data(sql, (email, username))
            if user_record and bcrypt.checkpw(password.encode('utf-8'), user_record[0].encode('utf-8')):
                return jsonify({'message': "Login successful"}), 200
            else:
                return jsonify({'message': "Invalid credentials"}), 401

        @self.app.route('/user/reset_password', methods=['POST'])
        def reset_password():
            data = request.json
            email = data.get('email')
            check_user_sql = "SELECT id FROM USERS WHERE email = %s"
            existing_user = fetch_data(check_user_sql, (email,))
            print(existing_user)
            if existing_user:
                password = self.generate_password(email)
                return jsonify({'message': 'Password is reset successfully', 'password': password}), 201
            else:
                return jsonify({'message': "Email is invalid!"}), 500

        @self.app.route('/user/promote', methods=['POST'])
        def promote_to_admin():
            data = request.json
            user_id = data.get("id")
            user_role = data.get("user_role")
            if user_id and user_role == "admin":
                # Additional check: Verify if the user exists and is not already an admin
                exist_sql = "SELECT role FROM USERS WHERE id = %s"
                existing_role = fetch_data(exist_sql, (user_id,))
                if existing_role and existing_role[0] == 'user':
                    sql = "UPDATE USERS SET role = 'admin' WHERE id = %s"
                    result = execute_command(sql, (user_id,))
                    return jsonify({'message': result}), 200
                else:
                    return jsonify({'message': 'User not found or already an admin'}), 400
            else:
                return jsonify({'message': 'Invalid ID or user role'}), 400

        @self.app.route('/user/demote', methods=['POST'])
        def demote_from_admin():
            data = request.json
            user_id = data.get("id")
            user_role = data.get("user_role")
            if user_id and user_role == "admin":
                # Additional check: Verify if the user exists and is not already an admin
                exist_sql = "SELECT role FROM USERS WHERE id = %s"
                existing_role = fetch_data(exist_sql, (user_id,))

                if existing_role and existing_role[0] == 'admin':
                    sql = "UPDATE USERS SET role = 'user' WHERE id = %s"
                    result = execute_command(sql, (user_id,))
                    return jsonify({'message': result}), 200
                else:
                    return jsonify({'message': 'User not found or already an admin'}), 400
            else:
                return jsonify({'message': 'Invalid ID or user role'}), 400

        @self.app.route('/user/delete', methods=['POST'])
        def delete_user():
            data = request.json
            user_id = data.get("id")
            user_role = data.get("user_role")
            if user_id and user_role == "admin":
                # Check if the user exists
                exist_sql = "SELECT id FROM USERS WHERE id = %s"
                user_exists = fetch_data(exist_sql, (user_id,))

                if user_exists:
                    # Delete the user
                    delete_sql = "DELETE FROM USERS WHERE id = %s"
                    result = execute_command(delete_sql, (user_id,))
                    return jsonify({'message': 'User deleted successfully'}), 200
                else:
                    return jsonify({'message': 'User not found'}), 404
            else:
                return jsonify({'message': 'Invalid user ID or you does not have the access'}), 400

    @staticmethod
    def generate_password(email):
        """
        this function will generate a random password and send email to user
        """
        random_password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        hashed_password = bcrypt.hashpw(random_password.encode('utf-8'), bcrypt.gensalt())
        # Hash the password
        sql = "UPDATE USERS SET password = %s WHERE email = %s"
        params = (hashed_password, email)
        result = execute_command(sql, params)
        if (result == "Success"):
            send_email(email, "Your New Password", f"Your new password is {random_password}.")
            return random_password
        else:
            return "generate password fail!"
