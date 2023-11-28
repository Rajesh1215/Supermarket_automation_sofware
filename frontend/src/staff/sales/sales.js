import React from "react";
import "./sales.css";

const Sales = () => {
  return (
    <div className="sales-main-container">
      <div className="sales-orders-details-returns-refunds-replacements">
        <div className="sales-orders-details">
          <h2>Sales Orders</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1001</td>
                <td>John Doe</td>
                <td>Laptop</td>
                <td>1</td>
                <td>$1000</td>
                <td>$1000</td>
                <td>2023-11-27</td>
              </tr>
              <tr>
                <td>1002</td>
                <td>Jane Smith</td>
                <td>Phone</td>
                <td>2</td>
                <td>$500</td>
                <td>$1000</td>
                <td>2023-11-26</td>
              </tr>
              <tr>
                <td>1003</td>
                <td>Peter Jones</td>
                <td>Tablet</td>
                <td>1</td>
                <td>$300</td>
                <td>$300</td>
                <td>2023-11-25</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="returns-refunds-replacements">
          <h2>Returns, Refunds, & Replacements</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Return ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R1001</td>
                <td>John Doe</td>
                <td>Laptop</td>
                <td>Damaged</td>
                <td>Processed</td>
                <td>2023-11-28</td>
              </tr>
              <tr>
                <td>R1002</td>
                <td>Jane Smith</td>
                <td>Phone</td>
                <td>Not as described</td>
                <td>Pending</td>
                <td>2023-11-27</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="add-orders">
        <h2>Add Orders</h2>
        <form>
          <div className="form-group">
            <label for="customerName">Customer Name:</label>
            <input type="text" id="customerName" className="form-control" placeholder="Enter customer name" />
          </div>

          <div className="form-group">
            <label for="productSelection">Product:</label>
            <select id="productSelection" className="form-control">
              <option value="laptop">Laptop</option>
              <option value="phone">Phone</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>

          <div className="form-group">
            <label for="productQuantity">Quantity:</label>
            <input type="number" id="productQuantity" className="form-control" placeholder="Enter quantity" />
          </div>

          <button type="submit" className="btn btn-primary">Add Order</button>
        </form>
      </div>

      <div className="orders-list">
        <h2>Recent Orders</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2001</td>
              <td>Jane Doe</td>
              <td>Laptop</td>
              <td>2</td>
              <td>$2000</td>
              <td>$2000</td>
              <td>2023-11-28</td>
            </tr>
            <tr>
              <td>2002</td>
              <td>Peter Jones</td>
              <td>Phone</td>
              <td>3</td>
              <td>$1500</td>
              <td>$1500</td>
              <td>2023-11-27</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
  }
  export default Sales;
