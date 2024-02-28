// Delete.js
import React, { useState } from 'react';

const DeleteEmployee = ({ onDelete }) => {
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(''); // Define employeeIdToDelete and setEmployeeIdToDelete

  const handleInputChange = (e) => {
    setEmployeeIdToDelete(e.target.value);
  };

  const handleDeleteClick = async () => {
    // Check if employeeIdToDelete is not empty
    if (employeeIdToDelete.trim() === '') {
      alert('Please enter a valid Employee ID to delete.');
      return;
    }

    try {
      // Make a DELETE request to the Flask backend
      const response = await fetch(`http://127.0.0.1:5000/delete_employee/${employeeIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
      });

      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        // Call the onDelete function with the employeeIdToDelete
        onDelete(employeeIdToDelete);

        // Reset the input field after successful deletion
        setEmployeeIdToDelete('');
      } else {
        // Handle error cases
        console.error('Failed to delete employee:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during delete request:', error);
    }
  };

  return (
    <div>
      <h2>Delete Employee</h2>
      <p>Enter the Employee ID to delete:</p>
      <input
        type="text"
        placeholder="Employee ID"
        value={employeeIdToDelete}
        onChange={handleInputChange}
      />
      <button onClick={handleDeleteClick}>Delete Employee</button>
    </div>
  );
};

export default DeleteEmployee;
