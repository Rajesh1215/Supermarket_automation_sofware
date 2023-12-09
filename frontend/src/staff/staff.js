import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './profile/profile';
import Products from './products/products';
import Sales from './sales/sales';
import Sidebar from './sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import Returns from './sales/returns';
const Staff = () => {
  return (
      <Container fluid>
        <Row>
          <Col className='' sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10}>
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales/returns" element={<Returns />} />
            </Routes>
          </Col>
        </Row>
      </Container>
  );
};

export default Staff;
