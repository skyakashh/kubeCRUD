// Fetch.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeList from './EmployeeList'; // Assuming you have an EmployeeList component

const Fetch = () => {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/employees');
        setEmployeeList(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Fetch Employees</h2>
      <div className="employee-list-container">
        <EmployeeList employeeList={employeeList} />
      </div>
    </div>
  );
};

export default Fetch;
