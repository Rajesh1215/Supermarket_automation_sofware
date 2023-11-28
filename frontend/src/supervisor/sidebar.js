import React from 'react';
import { Link } from 'react-router-dom';
import "./css/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/supervisor/">Profile</Link>
        </li>
        <li>
          <Link to="/supervisor/sales">Sales</Link>
        </li>
        <li>
          <Link to="/supervisor/products">Products</Link>
        </li>

        <li>
          <Link to="/supervisor/Register">Register</Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
