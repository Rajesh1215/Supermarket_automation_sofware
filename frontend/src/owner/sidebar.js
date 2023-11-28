import React from 'react';
import { Link } from 'react-router-dom';
import "./css/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/owner">Dashboard</Link>
        </li>
        <li>
          <Link to="/owner/products">Products</Link>
        </li>
        <li>
          <Link to="/owner/employees">Employees</Link>
        </li>
        <li>
          <Link to="/owner/customers">Customers</Link>
        </li>
        <li>
          <Link to="/owner/sales">Sales</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
