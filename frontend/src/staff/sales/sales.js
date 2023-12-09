import React from "react";
import { useNavigate } from "react-router";
import "./sales.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
const Sales = () => {
  const navigate = useNavigate();
  const gotopage = (str) => {
    navigate(str);
  };
  return (
    <div className="sales-main-container my-3">
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
      <div className="row">
      <Button className="col-2 mx-2" >Add Orders</Button>
      <Button className="col-2" onClick={()=>{gotopage("returns")}}>View Returns</Button>
      </div>
      <div className="mt-5 mb-1">
        <h4>All Orders</h4>
        <hr/>
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
