import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [employeeData, setEmployeeData] = useState({
    Emp_id: '',
    Emp_name: '',
    email: '',
    teamLead: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEmployee = async () => {
    try {
      // Make a POST request to add the employee
      await axios.post('http://127.0.0.1:5000/employees', employeeData);

      // Optionally, you can reset the form or navigate to another page after successful addition
      setEmployeeData({
        Emp_id: '',
        Emp_name: '',
        email: '',
        teamLead: '',
      });

      console.log('Employee added successfully');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form>
        <label>
          Emp_id:
          <input
            type="text"
            name="Emp_id"
            value={employeeData.Emp_id}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Emp_name:
          <input
            type="text"
            name="Emp_name"
            value={employeeData.Emp_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Team Lead:
          <input
            type="text"
            name="teamLead"
            value={employeeData.teamLead}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;
