import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Nav, Tab, Row, Col, Container } from "react-bootstrap";

const AllProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const goto_prodet=()=>{
    navigate("product_details");
  }

  const productsData = {
    all: [
      { id: 1, name: "Product A" },
      { id: 2, name: "Product B" },
      { id: 3, name: "Product C" },
    ],
    electronics: [
      { id: 4, name: "Laptop" },
      { id: 5, name: "Smartphone" },
      { id: 6, name: "Camera" },
    ],
    clothing: [
      { id: 7, name: "T-shirt" },
      { id: 8, name: "Jeans" },
      { id: 9, name: "Jacket" },
    ],
    books: [
      { id: 10, name: "Book 1" },
      { id: 11, name: "Book 2" },
      { id: 12, name: "Book 3" },
    ],
  };

  const renderProducts = (category) => {
    const selectedProducts = category === "all" ? productsData.all : productsData[category];

    return (
      <Row>
        {selectedProducts.map((product) => (
          <Col key={product.id} sm={4}>
            <div className="product-card">{product.name}</div>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container>
      <h1>Product Categories</h1>
      <Nav variant="tabs" activeKey={activeTab} onSelect={(tab) => handleTabClick(tab)}>
        {Object.keys(productsData).map((category) => (
          <Nav.Item key={category}>
            <Nav.Link eventKey={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content>
        {Object.keys(productsData).map((category) => (
          <Tab.Pane key={category} eventKey={category}>
            {renderProducts(category)}
          </Tab.Pane>
        ))}
      </Tab.Content>
      <div className="product-det" onClick={goto_prodet}> seeproduct</div>
    </Container>
  );
};

export default AllProducts;
