import React from 'react';
import "./dashboard.css"
const Dashboards = () => {
  return (
    <div className="dashboard-main-container">
      {/* Owner Filters */}
      <div className="common-component-prop top owner-filters">
        Owner Filters
      </div>

      {/* Sales, Orders, and Revenue */}
      <div className="common-component-prop sales-orders-revenue d-flex">
        <div className="sales">Sales</div>
        <div className="orders">Orders</div>
        <div className="revenue">Revenue</div>
      </div>

      {/* Products, Product Status, and Returns/Refunds */}
      <div className="common-component-prop products d-flex">
        Products
        <div className="products-status">Product Status</div>
        <div className="returns-refunds">Returns/Refunds</div>
      </div>

      {/* Recent Activity and Community */}
      <div className="common-component-prop recent-activity-community d-flex">
        <div className="recent-activity">Recent Activity</div>
        <div className="community">Community</div>
      </div>

      {/* Charts */}
      <div className="common-component-prop charts">Charts</div>
    </div>
  );
};

export default Dashboards;
