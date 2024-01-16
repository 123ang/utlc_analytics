import pandas as pd
from database import execute_command,fetch_data

# Load the CSV data into a DataFrame
df = pd.read_csv('../dataset/staff_info.csv', encoding='utf-8')
df = df.rename(columns={
    'No Staf': 'id',
    'Nama Staf dan gelaran': 'name',
    'TARIKH PROSES DATA STAF': 'process_data_staff_date',
    'Status Perkhidmatan': 'status',
    'No Kad Pengenalan': 'ic',
    'Tarikh Lapor Uum': 'entering_uum_date',
    'Jawatan Akademik': 'actual_position',
    'Jawatan Hakiki (Penuh)': 'current_position',
    'Jawatan Semasa (Penuh)': 'current_position_full',
    'Jawatan Semasa (Singkatan)': 'current_position_short',
    'Pusat Pengajian': 'short_name'
})
df = df[df['short_name'] != 'Lain-lain']


def insert_school(school_name):
    insert_query = ("INSERT INTO schools (short_name,created_by,updated_by,created_at,updated_at) "
                    "VALUES (%s, 'system','system',NOW(),NOW())"
                    )
    try:
        # Execute the command for each distinct school name
        execute_command(insert_query, (school_name,))
    except Exception as e:
        print(f"An error occurred while inserting the school: {e}")


def get_school_id(school_name):
    try:
        query = "SELECT id FROM schools WHERE short_name = %s"
        school_id = fetch_data(query, (school_name,))
        return school_id[0]  # Directly use the integer value
    except Exception as e:
        print(f"An error occurred while fetching the school ID: {e}")
        return None


def check_if_lecturer_exists(lecturer_id):
    try:
        query = "SELECT COUNT(*) FROM lecturers WHERE id = %s"
        result = fetch_data(query, (lecturer_id,))
        if result and len(result) > 0:
            count = result[0]  # Extracting the count from the tuple
            return count > 0
        return False  # Directly use the integer value
    except Exception as e:
        print(f"An error occurred while checking if the lecturer exists: {e}")
        return False


def insert_or_update_lecturer(row):
    try:
        lecturer_id = str(row['id'])
        exists = check_if_lecturer_exists(lecturer_id)

        school_id = str(get_school_id(row['short_name']))
        if school_id:
            if exists:
                update_query = """
                    UPDATE lecturers SET name = %s, process_data_staff_date = %s, status = %s, ic = %s, 
                    entering_uum_date = %s, actual_position = %s, current_position = %s, 
                    current_position_short = %s, school_id = %s, updated_by = 'system', updated_at = NOW()
                    WHERE id = %s
                """
                data_to_update = (
                    str(row['name']),
                    pd.to_datetime(row['process_data_staff_date']).strftime('%Y-%m-%d'),
                    str(row['status']),
                    str(row['ic']),
                    pd.to_datetime(row['entering_uum_date']).strftime('%Y-%m-%d %H:%M:%S'),
                    str(row['actual_position']),
                    str(row['current_position']),
                    str(row['current_position_short']),
                    school_id,
                    lecturer_id
                )
                execute_command(update_query, data_to_update)
                return "Updated existing record"
            else:
                insert_query = """
                    INSERT INTO lecturers (id, name, process_data_staff_date, status, ic, entering_uum_date, actual_position,
                    current_position, current_position_short, school_id, created_by, updated_by, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'system', 'system', NOW(), NOW())
                """
                data_to_insert = (
                    lecturer_id,
                    str(row['name']),
                    pd.to_datetime(row['process_data_staff_date']).strftime('%Y-%m-%d'),
                    str(row['status']),
                    str(row['ic']),
                    pd.to_datetime(row['entering_uum_date']).strftime('%Y-%m-%d %H:%M:%S'),
                    str(row['actual_position']),
                    str(row['current_position']),
                    str(row['current_position_short']),
                    school_id
                )
                try:
                    result = execute_command(insert_query, data_to_insert)
                    print(result)
                except Exception as e:
                    print(f"Error executing query: {e}")

                return "Inserted new record"
    except Exception as e:
        print(f"An error occurred while inserting or updating the lecturer: {e}")
        return None
# Use the function to insert each distinct school name
# distinct_schools = df[df['short_name'] != 'Lain-lain']['short_name'].unique()
# for school in distinct_schools:
#     if pd.notna(school):  # This will check if the value is not NaN
#         insert_school(school)

i = 1
for _, row in df.iterrows():
    # row = df.iloc[1]
    print(row)
    result = insert_or_update_lecturer(row)
    i+=1
    print(i)
    print(result)
