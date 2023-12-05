import React from "react";
import { useNavigate } from "react-router";
import "./sales.css";
const Sales = () => {
  const navigate=useNavigate();
  const gotopage=(str)=>{
    navigate(str);
  }
  return (
    <div className="sales-main-container">
      <div onClick={()=>{gotopage("orders")}}>orders</div>
      <div onClick={()=>{gotopage("returns")}}>returns</div>
      <div className="sales-status d-flex justify-content-between">
        <div>
          <h2>Total Sales: $50,000</h2>
          <p>Year-to-date: $200,000</p>
        </div>

        <div>
          <h2>Total Orders: 1000</h2>
          <p>Year-to-date: 4000</p>
        </div>

        <div>
          <h2>Total Revenue: $1,000,000</h2>
          <p>Year-to-date: $4,000,000</p>
        </div>
      </div>

      <div className="all-sales">
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

      <div className="product-performance">
        <h2>Product Performance</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total Sales</th>
              <th>Average Order Value</th>
              <th>Units Sold</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Laptop</td>
              <td>$20,000</td>
              <td>$1250</td>
              <td>20</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>$15,000</td>
              <td>$750</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Tablet</td>
              <td>$15,000</td>
              <td>$300</td>
              <td>50</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="charts">
        {/* Charts section - insert charts components here */}
      </div>
    </div>
  );
};

export default Sales;
