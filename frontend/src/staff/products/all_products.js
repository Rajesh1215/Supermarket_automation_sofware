import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Nav, Row, Col, Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AllProducts = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get('http://127.0.0.1:8000/productcategories/');
        setProductCategories(categoriesResponse.data);

        const productsResponse = await axios.get('http://127.0.0.1:8000/products/');
        const newFilteredProducts = selectedCategory === "all"
        ? productsResponse.data
        : productsResponse.data.filter(product => product.product_category === selectedCategory);
    
      setFilteredProducts(newFilteredProducts);
    
    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleTabClick = (category) => {
    setActiveCategory(category.name.toLowerCase());
    setSelectedCategory(category.product_category_id);
    console.log("yo",category.product_category_id);
  };

  const goto_prodet = (id=1) => {
    navigate(`product_details/${id}`);
  };

  const FilterComponent = () => {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
      setShowFilters((prevShowFilters) => !prevShowFilters);
    };

    const handleFilterClick = (filter) => {
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
      <div className="my-3 mx-1 filter-container d-flex">
        <div className="filter-icon mx-1" onClick={toggleFilters}>
          <FontAwesomeIcon icon={faFilter} />
        </div>
        <div className="filter-text" onClick={toggleFilters}>
          Filter
        </div>
        {showFilters && (
          <div className="filter-options d-flex">
            {filterOptions.map((filter, index) => (
              <div className="mx-2" key={index} onClick={() => handleFilterClick(filter)}>
                {filter}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
console.log(filteredProducts);
  const ProductCards = () => {

    return (
      <Row xs={1} md={2} lg={4} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.product_id}>
            <Card onClick={()=>{goto_prodet(product.product_id)}}>
              <Card.Img variant="top" className="" src={`https://via.placeholder.com/400x300`} />
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
    <div>
      <div className="search-component d-flex justify-content-between ">
        <div className="search-input mx-3 my-1">
          <FontAwesomeIcon icon={faSearch} className="ml-2 mx-2" />
          <input type="text" className="border-0" placeholder="Search Products" />
        </div>
        <div className="products-num-stats d-flex justify-content-around">
          <div className="products-purchase mx-3">• Purchased:200</div>
          <div className="products-sold mx-3">• Sold:100</div>
          <div className="products-stock mx-3">• In Stock:100</div>
        </div>
      </div>
      <Container>
        <Nav variant="tabs" className="mx-5">
          {productCategories.map((category) => (
            <Nav.Item key={category.product_category_id}>
              <Nav.Link
                eventKey={category.name.toLowerCase()}
                active={activeCategory === category.name.toLowerCase()}
                onClick={() => {handleTabClick(category);console.log(category.name);}}
              >
                {category.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <FilterComponent />
        <ProductCards />
      </Container>
    </div>
  );
};

export default AllProducts;
