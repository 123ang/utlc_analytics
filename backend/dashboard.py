from flask import Flask, jsonify
from database import fetch_data

class Dashboard:

    def __init__(self, app):
        self.app = app
        self.setup_routes()

    def setup_routes(self):
        @self.app.route('/api/staff_count_by_school', methods=['GET'])
        def staff_count_by_school():
            query = """
                SELECT S.name_eng, COUNT(L.id) as count
                FROM LECTURERS L
                JOIN SCHOOLS S ON L.school_id = S.id
                GROUP BY S.name_eng
            """
            result = fetch_data(query)
            count_by_school = {item['name_eng']: item['count'] for item in result}
            return jsonify(count_by_school)

        @self.app.route('/api/staff_position_breakdown', methods=['GET'])
        def staff_position_breakdown():
            query = """
                SELECT actual_position, COUNT(*) as count 
                FROM LECTURERS 
                GROUP BY actual_position
            """
            result = fetch_data(query)
            position_breakdown = {item['actual_position']: item['count'] for item in result}
            return jsonify(position_breakdown)

        @self.app.route('/api/joining_dates_timeline', methods=['GET'])
        def joining_dates_timeline():
            query = """
                SELECT DATE(entering_uum_date) as date, COUNT(*) as count 
                FROM LECTURERS 
                GROUP BY DATE(entering_uum_date)
            """
            result = fetch_data(query)
            timeline = {item['date']: item['count'] for item in result}
            return jsonify(timeline)

        @self.app.route('/api/staff_join_per_year', methods=['GET'])
        def staff_join_per_year():
            query = """
                SELECT YEAR(entering_uum_date) as year, COUNT(*) as count 
                FROM LECTURERS 
                GROUP BY YEAR(entering_uum_date)
            """
            result = fetch_data(query)
            join_per_year = {item['year']: item['count'] for item in result}
            return jsonify(join_per_year)
