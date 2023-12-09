import React from "react";
import "./reports.css";
import LineChart from "../charts/line";
import Barchart from "../charts/barchart";
const Reports = () => {
  return(
  <div className="d-flex flex-column mx-3 mt-3 mb-5">
    <h1>Report</h1>
    <h4>Today's Report</h4>
    
      <div className="heading-stats row">
        <div className="shadow rounded col-2 m-3 p-3 ">Orders <hr/>today : 100 </div>
        <div className="shadow rounded col-2 m-3 p-3 ">Sales <hr/>today : 100</div>
        <div className="shadow rounded col-2 m-3 p-3 ">Revenue <hr/>today : 100</div>
        <div className="shadow rounded col-2 m-3 p-3 ">Profit/Loss <hr/>today : 100</div>
      </div>
      {/* Line Chart */}
      <div className="mb-4 revenue-expense-chart">
        <h2>Revenue And Expense Chart</h2>
        <LineChart />
      </div>
      {/* Two Line Charts */}
      <h2 className="mt-5 mb-4" >Product Perfomances</h2>
      <div className="d-flex justify-content-between mb-5">
        <div className="product-revenue-expense-chart px-3 w-50">
          <h4>Revenue And Expense Chart</h4>
          <LineChart />
        </div>
        <div className="product-price-chart px-3 w-50">
          <h4>Price Perfomance</h4>
          <LineChart />
        </div>
      </div>

      {/* Two Bar Charts */}
      <div className="d-flex justify-content-between mt-5">
        <div className="high-sales-products px-3 w-50">
          <h4>Top 5 High Sales</h4>
          <Barchart/>
        </div>
        <div className="high-revenue-products px-3 w-50">
          <h4>Top 5 High Profits</h4>
          <Barchart/>
        </div>
      </div>
    </div>
  );
};

export default Reports;
