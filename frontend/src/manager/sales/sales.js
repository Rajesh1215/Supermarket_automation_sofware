import React from "react";
import { useNavigate } from "react-router";
import "./sales.css";
import DoughnutChart from "../charts/doughnut.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Sales = () => {
  const navigate = useNavigate();
  const gotopage = (str) => {
    navigate(str);
  };
  return (
    <div className="sales-main-container">
      <div className="search-component d-flex justify-content-between ">
        <div>
          <h2>Orders</h2>
        </div>
        <div className="products-num-stats d-flex justify-content-around">
          <div className="products-purchase mx-3">• Purchased:200</div>
          <div className="products-sold mx-3">• Sold:100</div>
          <div className="products-stock mx-3">• In Stock:100</div>
        </div>
      </div>

      <div className="product-statuses row flex-wrap align-items-center">
        <div className="col-3">
          <div className="mb-3 out-of-stocks">
            <div className="instock-heading mx-2">Total Orders Today</div>
            <hr />
            <div className="">
              <div className="product-count mx-2">Total Orders: 500</div>
              <div className="items-count mx-2">Returns Count: 50</div>
            </div>
          </div>

          <div className="expired">
            <div
              className="instock-heading mx-2"
              onClick={() => {
                gotopage("returns");
              }}
            >
              Returns
            </div>
            <hr />
            <div className="">
              <div className="product-count mx-2">Total returns: 1500</div>
              <div className="items-count mx-2">Overall Returns: 100</div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="mb-3 out-of-stocks">
            <div className="instock-heading mx-2">Total Revenue Today</div>
            <hr />
            <div className="">
              <div className="product-count mx-2">
                Total Revenue Generated: $2000
              </div>
              <div className="items-count mx-2">Total Profit Today: $800</div>
            </div>
          </div>

          <div className="expired">
            <div className="instock-heading mx-2">
              Total revenue of the Year
            </div>
            <hr />
            <div className="">
              <div className="product-count mx-2">
                Total Revenue in this year: $10,000
              </div>
              <div className="items-count mx-2">
                Total Profit in this year: $4,000
              </div>
            </div>
          </div>
        </div>

        <div className="col-5 instock-graph d-flex justify-content-center">
          <DoughnutChart />
        </div>
      </div>

      <div className="mt-5 mb-1">
        <h2>Orders</h2>
      </div>
      <div className=" mx-3 my-3 d-flex justify-content-between">
        <div className="search-input d-flex w-50"><FontAwesomeIcon icon={faSearch} className="ml-2 mx-2" />
        <input type="text" className="border-0" placeholder="Search Orders" /></div>
        <div className=" mx-5 my-2">
         <b>From :</b><input type="date" className="bg-white border-0 mx-3" placeholder="Start Date" />
        <b>To :</b><input type="date" className="bg-white border-0 mx-3" placeholder="End Date" />
        </div>
      </div>

      <div className="all-sales">
        <table
          className="table table-striped ">
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
    </div>
  );
};

export default Sales;
