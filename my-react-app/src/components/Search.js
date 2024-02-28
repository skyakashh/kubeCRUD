// ...
import React, { useEffect, useState } from 'react';
import EmployeeList from './EmployeeList'; // Assuming you have an EmployeeList component
import './Search.css'; // Create a CSS file for your animations (e.g., Search.css)
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';

// ...
const Search = () => {
  const [name, setName] = useState('');
  const [employeeList, setEmployeeList] = useState([]);

  const searchEmployee = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/employees/${name}`);
      setEmployeeList(response.data);
    } catch (error) {
      console.error('Error searching for employee:', error);
    }
  };

  useEffect(() => {
    const searchEmployees = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/employees/${name}`);
        console.log(response.data);
        setEmployeeList(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    searchEmployees();
  }, [name]);

  return (
    <div>
      <h2>Search Employee</h2>
      <input type="text" placeholder="Enter employee name" value={name} onChange={(e) => setName(e.target.value)} />
      {/* <button onClick={searchEmployee}>Search Employee</button> */}

      {/* Display the search results with animations */}
      { (
        <div className="employee-list-container">
          {/* Simply return the JSX without extra curly braces */}
          <EmployeeList employeeList={employeeList} />
        </div>
      )}

      {employeeList.length === 0 && <p>No matching employees found.</p>}
    </div>
  );
};

export default Search;
