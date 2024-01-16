import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="",
        database="utlc_datawarehouse"
    )

def execute_command(sql, params=None):
    """
    :param sql:
    - execute command
    :param params:
    :return: resylt or null
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(sql, params)
        conn.commit()
        return "Success"
    except mysql.connector.Error as error:
        return f"An error occurred: {error}"
    finally:
        cursor.close()
        conn.close()

def fetch_data(sql, params=None):
    """
    :param sql:
    - get data from database
    :param params:
    :return: resylt or null
    """

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(sql, params)
        result = cursor.fetchone()
        return result
    except mysql.connector.Error as error:
        print(f"An error occurred: {error}")
        return None
    finally:
        cursor.close()
        conn.close()
