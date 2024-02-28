import React from 'react';

const EmployeeDetails = ({ employee }) => {
  if (!employee) {
    return <div>No employee selected</div>;
  }

  return (
    <div className="employee-details">
      <h2>Employee Details</h2>
      <p>Emp_id: {employee.Emp_id}</p>
      <p>Emp_name: {employee.Emp_name}</p>
      <p>Email: {employee.email}</p>
      <p>Team Lead: {employee.teamLead}</p>
    </div>
  );
};

export default EmployeeDetails;
