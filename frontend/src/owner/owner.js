// Owner.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Products from './products/products';
import Employees from './employees/employees';
import Customers from './customers/customers';
import Sales from './sales/sales';
import Sidebar from './sidebar';
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
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Owner;
