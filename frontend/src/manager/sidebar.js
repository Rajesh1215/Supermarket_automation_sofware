import React from 'react';
import { Link } from 'react-router-dom';
import "./css/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/manager/">Dashboard</Link>
        </li>
        <li>
          <Link to="/manager/products">Products</Link>
        </li>
        <li>
          <Link to="/manager/employees">Employees</Link>
        </li>
        <li>
          <Link to="/manager/customers">Customers</Link>
        </li>
        <li>
          <Link to="/manager/sales">Sales</Link>
        </li>
        <li>
          <Link to="/manager/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
