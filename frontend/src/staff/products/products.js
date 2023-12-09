import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Nav, Tab, Row, Col, Container,Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faFilter } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../data/data";



const AllProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const goto_prodet = () => {
    navigate("product_details");
  };
  const { Products } = useUserContext();
  const { Product_categories } = useUserContext();
  const renderProducts = (category) => {
    const selectedProducts = category === "all" ? Product_categories.all : Product_categories[category] || [];

    return (
      <Row>
        {selectedProducts.map((product) => (
          <Col key={product.id} sm={4}>
            <div className={`product-card ${product.status}`}>{product.name}</div>
          </Col>
        ))}
      </Row>
    );
  };
  const FilterComponent = () => {
    const [showFilters, setShowFilters] = useState(false);
  
    const toggleFilters = () => {
      setShowFilters((prevShowFilters) => !prevShowFilters);
    };
  
    const handleFilterClick = (filter) => {
      // Handle filter selection here
      console.log("Selected filter:", filter);
    };
  
    const filterOptions = [
      "In Stock",
      "Nearly Out of Stock",
      "Out of Stock",
      "Nearly Expiring",
      "Expired",
      "Damaged",
      "Returned",
    ];
  
    return (
      <div className=" my-3 mx-1 filter-container d-flex">
        
        <div className="filter-icon mx-1" onClick={toggleFilters}>
          <FontAwesomeIcon icon={faFilter} />
        </div>
        <div className="filter-text" onClick={toggleFilters}>
          Filter
        </div>
        {showFilters && (
          <div className="filter-options d-flex">
            {filterOptions.map((filter, index) => (
              <div className=" mx-2" key={index} onClick={() => handleFilterClick(filter)}>
                {filter}
              </div>
            ))}
          </div>
        )}
        
      </div>
    );
  };
  const ProductCards = () => {
    
  
    return (
      <Row xs={1} md={2} lg={4} className="g-4">
        {Products.map((product) => (
          <Col key={product.id}>
            <Card onClick={goto_prodet}>
              <Card.Img variant="top" className=" " src={`https://via.placeholder.com/400x300`} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ${product.price}
                  <br />
                  <strong>Items Present:</strong> {product.itemsPresent}
                  <br />
                  <strong>Expired:</strong> {product.expired}
                  <br />
                  <strong>Nearly Expired:</strong> {product.nearlyExpired}
                  <br />
                  <strong>Damaged:</strong> {product.damaged}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };
  return (
    <div className="my-3">
      <h2>Products Info</h2>
      <div className="row my-3">
        <div className="col-3 p-3 mx-2 shadow rounded"><h3>Tasks to done</h3><hr/>None</div>
        <div className="col-3 p-3 shadow rounded"><h3>View Verifies</h3><hr/>None</div>
      </div>
      <hr/>
      <h4 className="my-3">See products</h4>
      <div className="search-component d-flex justify-content-between ">
        <div className="search-input mx-3 my-1">
          <FontAwesomeIcon icon={faSearch} className="ml-2 mx-2" />
          <input type="text" className="border-0" placeholder="Search Products" />
        </div>
      </div>
      <Container>
        <Nav variant="tabs" className="mx-5" activeKey={activeTab} onSelect={(tab) => handleTabClick(tab)}>
          {Product_categories.map((category) => (
            <Nav.Item key={category.product_category_id}>
              <Nav.Link eventKey={category.name.toLowerCase()}>
                {category.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <FilterComponent />
        <Tab.Content>
          
          {Product_categories.map((category) => (
            <div>
            <Tab.Pane key={category.product_category_id} eventKey={category.name.toLowerCase()}>
              {renderProducts(category.name.toLowerCase())}
            </Tab.Pane>
            
            </div>
          ))}
        </Tab.Content>
        <ProductCards />
      </Container>
    </div>
  );
};

export default AllProducts;
