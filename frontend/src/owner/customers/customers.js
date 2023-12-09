import React from "react";
import "./customer.css";
import { useNavigate } from "react-router";
const Customer = () => {
  const navigate=useNavigate();
  const gotocustomerdet=()=>{
    navigate("customer-details");
  }
  return (
    <div className="customer-main-container">
      <div className="search d-flex justify-content-between align-items-center">
        <div>
          <input
            type="text"
            className="form-control shadow rounded"
            placeholder="Search Customers"
          />
        </div>
        <div>
          <select className="form-select shadow rounded">
            <option value="all">All Locations</option>
            <option value="newYork">New York</option>
            <option value="california">California</option>
            <option value="texas">Texas</option>
          </select>
        </div>
      </div>


      <div className="customer-list shadow rounded" onClick={gotocustomerdet}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Total Purchases</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>johndoe@example.com</td>
              <td>New York</td>
              <td>$1000</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>janesmith@example.com</td>
              <td>California</td>
              <td>$500</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Peter Jones</td>
              <td>peterjones@example.com</td>
              <td>Texas</td>
              <td>$200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
