# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# SQLite database setup
DATABASE = 'employees.db'

def delete_employee(employee_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Check if the employee with the given ID exists
    cursor.execute('SELECT * FROM employees WHERE id = ?', (employee_id,))
    employee = cursor.fetchone()
    cursor.execute('DELETE FROM employees WHERE id = ?', (employee_id,))
    conn.commit()
    if not employee:
        conn.close()
        return jsonify({'error': f'Employee with ID {employee_id} not found'}), 404

    # Delete the employee from the database
    cursor.execute('DELETE FROM employees WHERE id = ?', (employee_id,))
    conn.commit()
    conn.close()

    return jsonify({'message': f'Employee with ID {employee_id} deleted successfully', 'deleted_employee': {
        'id': employee[0],
        'Emp_id': employee[1],
        'Emp_name': employee[2],
        'email': employee[3],
        'teamLead': employee[4]
    }}), 200

def init_db():
    with app.app_context():
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS employees (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Emp_id TEXT NOT NULL,
                Emp_name TEXT NOT NULL,
                email TEXT NOT NULL,
                teamLead TEXT NOT NULL
            )
        ''')

        conn.commit()
        conn.close()

init_db()

# Routes
@app.route('/')
def home():
    return "Welcome to the Employee Management System!"

@app.route('/employees', methods=['GET'])
def get_employees():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM employees')
    employees = cursor.fetchall()
    conn.close()

    employee_list = []
    for employee in employees:
        employee_list.append({
            'id': employee[0],
            'Emp_id': employee[1],
            'Emp_name': employee[2],
            'email': employee[3],
            'teamLead': employee[4]
        })

    return jsonify(employee_list)

@app.route('/employees/<name>', methods=['GET'])
def search_employee(name):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM employees WHERE Emp_name = ?', (name,))
    employee = cursor.fetchall()
    conn.close()


    employee_list = []
    for e in employee:
        employee_list.append({
            'id': e[0],
            'Emp_id': e[1],
            'Emp_name': e[2],
            'email': e[3],
            'teamLead': e[4]
        })

        return jsonify(employee_list)

@app.route('/employees', methods=['POST'])
def add_employee():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO employees (Emp_id, Emp_name, email, teamLead) VALUES (?, ?, ?, ?)',
                   (data['Emp_id'], data['Emp_name'], data['email'], data['teamLead']))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Employee added successfully'}), 201

@app.route('/delete_employee/<int:employee_id>', methods=['DELETE'])
def delete_employee_route(employee_id):
    return delete_employee(employee_id)

if __name__ == '__main__':
    app.run(debug=True)
