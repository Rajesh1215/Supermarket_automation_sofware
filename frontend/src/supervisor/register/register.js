import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div className="register-main-container">
      <div className="date-search-components">
        <h3>Date & Search</h3>
        <form>
          <div className="form-group">
            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate" className="form-control" />
          </div>
          <div className="form-group">
            <label for="endDate">End Date:</label>
            <input type="date" id="endDate" className="form-control" />
          </div>
          <div className="form-group">
            <label for="searchQuery">Search Query:</label>
            <input type="text" id="searchQuery" className="form-control" placeholder="Enter search query" />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>

      <div className="all-performances">
        <h2>All Performances</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Performance ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Date</th>
              <th>Performance Rating</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1001</td>
              <td>John Doe</td>
              <td>Engineering</td>
              <td>2023-11-27</td>
              <td>Exceeds Expectations</td>
              <td>Consistently exceeded sales targets and successfully completed major projects.</td>
            </tr>
            <tr>
              <td>P1002</td>
              <td>Jane Smith</td>
              <td>Marketing</td>
              <td>2023-11-26</td>
              <td>Meets Expectations</td>
              <td>Met all performance expectations and contributed positively to team projects.</td>
            </tr>
            <tr>
              <td>P1003</td>
              <td>Peter Jones</td>
              <td>Sales</td>
              <td>2023-11-25</td>
              <td>Needs Improvement</td>
              <td>Showed potential but needs to improve time management and communication skills.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="all-staff-management">
        <h2>All Staff Management</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>E1001</td>
              <td>John Doe</td>
              <td>Engineering</td>
              <td>johndoe@example.com</td>
              <td>Software Engineer</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>E1002</td>
              <td>Jane Smith</td>
              <td>Marketing</td>
              <td>janesmith@example.com</td>
              <td>Marketing Manager</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>E1003</td>
              <td>Peter Jones</td>
              <td>Sales</td>
              <td>peterjones@example.com</td>
              <td>Sales Representative</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Register;
