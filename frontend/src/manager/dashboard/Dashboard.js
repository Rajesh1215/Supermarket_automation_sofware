import React from 'react';
import { useNavigate } from 'react-router';
import "./dashboard.css"
const Dashboards = () => {
  const navigate=useNavigate();
  const gotoreports=()=>{
    navigate("reports");
  }
  const gotoproducts=()=>{
    navigate("products");
  }
  const gotoreturns=()=>{
    navigate("sales/returns");
  }
  const gotosales=()=>{
    navigate("sales");
  }
  const gotocommunity=()=>{
    navigate("community")
  }
  return (
    <div className="dashboard-main-container">
      {/* Owner Filters */}
      <div className="common-component-prop top owner-filters">
        Owner Filters
      </div>

      {/* Sales, Orders, and Revenue */}
      <div className="common-component-prop sales-orders-revenue d-flex" onClick={gotosales}>
        <div className="sales">Sales</div>
        <div className="orders">Orders</div>
        <div className="revenue">Revenue</div>
      </div>

      {/* Products, Product Status, and Returns/Refunds */}
      <div className="common-component-prop products d-flex">
        Products
        <div className="products-status" onClick={gotoproducts}>Product Status</div>
        <div className="returns-refunds" onClick={gotoreturns}>Returns/Refunds</div>
      </div>

      {/* Recent Activity and Community */}
      <div className="common-component-prop recent-activity-community d-flex">
        <div className="recent-activity">Recent Activity</div>
        <div className="community" onClick={gotocommunity}>Community</div>
      </div>

      {/* Charts */}
      <div className="common-component-prop charts" onClick={gotoreports} >Charts</div>
    </div>
  );
};

export default Dashboards;
