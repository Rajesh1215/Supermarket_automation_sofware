import React from "react";
import "./customer.css";
const Customer = () => {
  return (
    <div className="customer-main-container">
      <div className="search d-flex justify-content-between align-items-center">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search Customers"
          />
        </div>
        <div>
          <select className="form-select">
            <option value="all">All Locations</option>
            <option value="newYork">New York</option>
            <option value="california">California</option>
            <option value="texas">Texas</option>
          </select>
        </div>
      </div>

      <div className="filters d-flex flex-wrap justify-content-between">
        <div>
          <label for="orderStatus">Order Status:</label>
          <select className="form-select" id="orderStatus">
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label for="purchaseAmount">Purchase Amount:</label>
          <input
            type="number"
            className="form-control"
            id="purchaseAmount"
            placeholder="Min Purchase Amount"
          />
          <input
            type="number"
            className="form-control"
            id="purchaseAmount"
            placeholder="Max Purchase Amount"
          />
        </div>
      </div>

      <div className="customer-list">
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
