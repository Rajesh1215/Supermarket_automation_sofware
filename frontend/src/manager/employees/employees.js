import React from "react";
import { useNavigate } from "react-router";
import "./employees.css";
const Employees = () => {
  const navigate = useNavigate();
  const gotoemployeedet= ()=>{
    navigate("employee-details");
  }
  const gotocommunity= ()=>{
    navigate("/owner/community");
  }
  return (
    <div className="employees-main-container">
      <div className="search d-flex justify-content-between align-items-center">
        <div>
          <input type="text" className="form-control" placeholder="Search Employees" />
        </div>
        <div>
          <select className="form-select">
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="engineering">Engineering</option>
          </select>
        </div>
      </div>

      <div className="stats-salaries-commmunity d-flex flex-wrap justify-content-between">
        <div className="stats">
          <h2>Employee Stats</h2>
          <ul>
            <li>Total Employees: 100</li>
            <li>Active Employees: 95</li>
            <li>On Leave: 5</li>
          </ul>
        </div>

        <div className="salaries">
          <h2>Salary Information</h2>
          <ul>
            <li>Average Salary: $50,000</li>
            <li>Salary Range: $30,000 - $100,000</li>
            <li>Top 10% Earners: $80,000+</li>
          </ul>
        </div>

        <div className="community" onClick={gotocommunity}>
          <h2>Employee Community</h2>
          <ul>
            <li>Employee Satisfaction Rate: 85%</li>
            <li>Number of Employee Engagement Activities: 10</li>
            <li>Employee Feedback Response Rate: 70%</li>
          </ul>
        </div>
      </div>

      <div className="perfomances-works d-flex flex-wrap justify-content-between">
        <div className="performance-status">
          <h2>Performance Status</h2>
          <ul>
            <li>High Performers: 20%</li>
            <li>Medium Performers: 50%</li>
            <li>Low Performers: 30%</li>
          </ul>
        </div>

        <div className="works-goals">
          <h2>Works and Goals</h2>
          <ul>
            <li>Completed Projects: 50</li>
            <li>On-going Projects: 25</li>
            <li>Goals Achieved: 80%</li>
          </ul>
        </div>
      </div>

      <div className="employee-list m-5">
        <div className="managers">
          <h2>Managers</h2>
          <ul>
            <li>John Doe</li>
            <li>Jane Smith</li>
            <li>Peter Jones</li>
          </ul>
        </div>

        <div className="supervisors">
          <h2>Supervisors</h2>
          <ul>
            <li>Alice Brown</li>
            <li>Bob Williams</li>
            <li>Charlie Miller</li>
          </ul>
        </div>

        <div className="staff" onClick={gotoemployeedet}>
          <h2>Staff</h2>
          <ul>
            <li>David Smith</li>
            <li>Emily Johnson</li>
            <li>Frank Thompson</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Employees;
