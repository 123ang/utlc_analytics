from flask import Flask, jsonify
from database import fetch_data, fetch_all_data

class Dashboard:

    def __init__(self, app):
        self.app = app
        self.setup_routes()

    def setup_routes(self):
        @self.app.route('/dashboard/staff_count_by_school', methods=['GET'])
        def staff_count_by_school():
            # bar chart
            query = """
                SELECT S.short_name, COUNT(L.id) as count
                FROM LECTURERS L
                JOIN SCHOOLS S ON L.school_id = S.id
                GROUP BY S.short_name
            """
            result = fetch_all_data(query)

            count_by_school = {item['short_name']: item['count'] for item in result}
            return jsonify(count_by_school)


        @self.app.route('/dashboard/staff_position_breakdown', methods=['GET'])
        def staff_position_breakdown():
            # pie chart
            query = """
                SELECT actual_position, COUNT(*) as count 
                FROM LECTURERS 
                GROUP BY actual_position
            """
            result = fetch_all_data(query)
            position_breakdown = {item['actual_position']: item['count'] for item in result}
            return jsonify(position_breakdown)

        @self.app.route('/dashboard/joining_dates_timeline', methods=['GET'])
        def joining_dates_timeline():
            # bar chart / line graph
            query = """
                SELECT DATE(entering_uum_date) as date, COUNT(*) as count 
                FROM LECTURERS 
                GROUP BY DATE(entering_uum_date)
            """
            result = fetch_all_data(query)
            timeline = {item['date'].strftime("%Y-%m-%d"): item['count'] for item in result}
            return jsonify(timeline)

        @self.app.route('/dashboard/staff_join_per_year', methods=['GET'])
        def staff_join_per_year():
            # column chart
            query = """
                SELECT YEAR(entering_uum_date) as year, COUNT(*) as count 
                FROM LECTURERS 
                GROUP BY YEAR(entering_uum_date)
            """
            result = fetch_all_data(query)
            join_per_year = {item['year']: item['count'] for item in result}
            return jsonify(join_per_year)


        @self.app.route('/dashboard/training_count_by_school', methods=['GET'])
        def training_count_by_school():
            # bar chart
            query = """
                        SELECT S.name_eng, COUNT(T.id) as count
                        FROM TRAININGS T
                        JOIN SCHOOLS S ON T.school_id = S.id
                        GROUP BY S.name_eng
                    """
            result = fetch_all_data(query)
            training_count_by_school = {item['name_eng']: item['count'] for item in result}
            return jsonify(training_count_by_school)

        @self.app.route('/dashboard/lecturer_attendance_in_trainings', methods=['GET'])
        def lecturer_attendance_in_trainings():
            # bar chart
            query = """
                        SELECT T.name_english, COUNT(TL.lecturer_id) as count
                        FROM TRAINING_LECTURER TL
                        JOIN TRAININGS T ON TL.training_id = T.id
                        GROUP BY T.name_english
                    """
            result = fetch_all_data(query)
            lecturer_attendance = {item['name_english']: item['count'] for item in result}
            return jsonify(lecturer_attendance)

        @self.app.route('/dashboard/trainings_over_time', methods=['GET'])
        def trainings_over_time():
            # line graph
            query = """
                        SELECT DATE(start_date) as date, COUNT(*) as count
                        FROM TRAININGS
                        GROUP BY DATE(start_date)
                        ORDER BY DATE(start_date)
                    """
            result = fetch_all_data(query)
            trainings_over_time = {item['date'].strftime("%Y-%m-%d"): item['count'] for item in result}
            return jsonify(trainings_over_time)
