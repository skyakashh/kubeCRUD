import React, { useState } from 'react';

const EmployeeList = ({ employeeList }) => {
  const [showTable, setShowTable] = useState(true);

  if (!employeeList || employeeList.length === 0) {
    return <p>No employees available.</p>;
  }

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div>
      {showTable ? (
        <table className="employee-table">
          <thead>
            <tr>
              <th>id</th>  
              <th>Emp_id</th>
              <th>Emp_name</th>
              <th>Email</th>
              <th>TeamLead</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee, index) => (
              <tr key={index}>
                <td>{employee.id}</td>
                <td>{employee.Emp_id}</td>
                <td>{employee.Emp_name}</td>
                <td>{employee.email}</td>
                <td>{employee.teamLead}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alternate-background-image">
          {/* Place your alternative content or background image here */}
          <p>Displaying an alternative view...</p>
        </div>
      )}

      {/* <button onClick={toggleTable}>
        {showTable ? 'Show Alternate View' : 'Show Table View'}
      </button> */}
    </div>
  );
};

export default EmployeeList;
