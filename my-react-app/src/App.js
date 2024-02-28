// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';
import AddEmployee from './components/Add';
import FetchAllData from './components/Fetch';
import SearchEmployee from './components/Search';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import Delete from './components/Delete'; // Import DeleteEmployee

const App = () => {
  const handleDeleteEmployee = (employeeId) => {
    // Implement the logic to delete the employee with the given ID
    console.log(`Deleting employee with ID ${employeeId}`);
    // Add your actual deletion logic here
  };



  return (
    <Router>
      <div className="app-container">
        <nav className="nav-container">
          <Link to="/search">Search Employee</Link>
          <Link to="/fetch-all">Fetch All Data</Link>
          <Link to="/add">Add Employee</Link>
          <Link to="/delete">Delete Employee</Link>
        </nav>

        <TransitionGroup>
          <Routes>
            <Route
              path="/search"
              element={
                <CSSTransition key="search-employee" classNames="fade" timeout={500}>
                  <SearchEmployee />
                </CSSTransition>
              }
            />

            <Route
              path="/fetch-all"
              element={
                <CSSTransition key="fetch-all-data" classNames="slide" timeout={500}>
                  <FetchAllData />
                </CSSTransition>
              }
            />

            <Route
              path="/add"
              element={
                <CSSTransition key="add-employee" classNames="zoom" timeout={500}>
                  <AddEmployee />
                </CSSTransition>
              }
            />

            <Route
              path="/delete"
              element={
                <CSSTransition key="delete-employee" classNames="zoom" timeout={500}>
                <Delete onDelete={handleDeleteEmployee} />
              </CSSTransition>
              }
            />
          </Routes>
        </TransitionGroup>
      </div>
    </Router>
  );
};

export default App;
