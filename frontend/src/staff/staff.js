import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './profile/profile';
import Products from './products/products';
import Sales from './sales/sales';
import Sidebar from './sidebar';
import { Container, Row, Col } from 'react-bootstrap';

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
            </Routes>
          </Col>
        </Row>
      </Container>
  );
};

export default Staff;
