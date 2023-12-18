import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Profile from './profile/profile';
import Products from './products/products';
import Employees from './register/register';
import Sales from './sales/sales';
import Sidebar from './sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import Returns from './sales/returns';
import ProductDetailsExample from './products/product_det';
import Orders from './sales/orders';
import { useUserContext } from '../data/data';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Owner = () => {

  const {User}=useUserContext();
  const navigate=useNavigate();
  useEffect(() => {
    if (User.username === '' || User.role !== 'supervisor') {
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
              <Route path="/register" element={<Employees />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales/returns" element={<Returns />} />
              <Route path="/products/product_details/:product_id" element={<ProductDetailsExample />} />
              <Route path="/sales/orders/:order_id" element={<Orders />} />
            </Routes>
          </Col>
        </Row>
      </Container>
  );
};

export default Owner;
