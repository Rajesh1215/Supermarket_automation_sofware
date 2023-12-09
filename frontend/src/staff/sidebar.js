import React from 'react';
import { Link } from 'react-router-dom';
import "./css/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar col-2">
      <ul>
        <li>
          <Link to="/staff/">Profile</Link>
        </li>
        <li>
          <Link to="/staff/products">Add products</Link>
        </li>
        <li>
          <Link to="/staff/sales">Sales</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
