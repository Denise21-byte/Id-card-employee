import React, { useState, useEffect } from "react";
import EmployeeCard from "./components/EmployeeCard";
import "./App.css";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch employees. Please try again.");
        setLoading(false);
      });
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="status-screen">
        <div className="spinner"></div>
        <p>Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-screen">
        <p className="error-msg">{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Employee Directory</h1>
        <p>{filteredEmployees.length} employees found</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <div className="card-grid">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))
        ) : (
          <p className="no-results">No employees match your search.</p>
        )}
      </div>
    </div>
  );
}