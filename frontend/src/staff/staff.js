import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './profile/profile';
import Products from './products/products';
import Sales from './sales/sales';
import Sidebar from './sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import Returns from './sales/returns';
import ProductDetailsExample from './products/product_det';
import { useUserContext } from '../data/data';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Orders from './sales/orders';



const Staff = () => {

  const {User}=useUserContext();
  const navigate=useNavigate();
  useEffect(() => {
    if (User.username === '' || User.role !== 'staff') {
      navigate('/');
    }
  });

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
              <Route path="/products/product_details/:product_id" element={<ProductDetailsExample />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales/returns" element={<Returns />} />
              <Route path="/sales/orders/:order_id" element={<Orders />} />
            </Routes>
          </Col>
        </Row>
      </Container>
  );
};

export default Staff;
