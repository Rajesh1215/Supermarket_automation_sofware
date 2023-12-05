// Owner.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Products from './products/products';
import Employees from './employees/employees';
import Customers from './customers/customers';
import Sales from './sales/sales';
import Sidebar from './sidebar';
import Profile from './profile/profile';
import Reports from "./reports/reports";
import Orders from "./sales/orders";
import Returns from "./sales/returns";
import { Container, Row, Col } from 'react-bootstrap';

const Owner = () => {
  return (
    <Container fluid>
      <Row>
        <Col className='' sm={2}>
          <Sidebar />
        </Col>
        <Col sm={10}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/employees" element={<Employees />} /> {/* Add the forward slash here */}
            <Route path="/customers" element={<Customers />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/sales/orders" element={<Orders />} />
            <Route path="/sales/returns" element={<Returns />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Owner;
