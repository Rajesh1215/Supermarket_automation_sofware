// Owner.js
import "./css/sidebar.css";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Products from './products/products';
import Employees from './employees/employees';
import Customers from './customers/customers';
import Sales from './sales/sales';
import Sidebar from './sidebar';
import Reports from "./reports/reports";
import Orders from "./sales/orders";
import Returns from "./sales/returns";
import Allproducts from "./products/all_products";
import EmployeeDetails from './employees/empolyee_det';
import ProductDetailsExample from "./products/product_det"
import Community from './employees/community';
import CustomerPage from './customers/customer_det';
import { Container, Row, Col } from 'react-bootstrap';
import { useUserContext } from '../data/data';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Owner = () => {

  const {User}=useUserContext();
  const navigate=useNavigate();
  useEffect(() => {
    if (User.username === '' || User.role !== 'owner') {
      navigate('/');
    }
  });
  return (
    <Container fluid>
      <Row>
        <Col className='' sm={2}>
          <Sidebar />
        </Col>
        <Col sm={10} className="my-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/catogaries" element={<Allproducts />} />
            <Route path="/products/catogaries/product_details/:product_id" element={<ProductDetailsExample />} />
            <Route path="/employees" element={<Employees />} /> {/* Add the forward slash here */}
            <Route path="/employees/employee-details/:employee_id" element={<EmployeeDetails />} />
            <Route path="/community" element={<Community />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/customer-details" element={<CustomerPage />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/sales/orders/:order_id" element={<Orders />} />
            <Route path="/sales/returns" element={<Returns />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Owner;
