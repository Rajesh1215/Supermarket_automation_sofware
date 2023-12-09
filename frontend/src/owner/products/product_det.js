import React,{useState} from "react";
import { Carousel, Image, Row, Col, ListGroup, ListGroupItem,Button,Modal,Form } from "react-bootstrap";

const ProductDetails = ({ product }) => {
  const {
    images,
    name,
    price,
    sales,
    revenue,
    description,
    specs,
    inventory,
  } = product;

  const { present, expired, expiring, damaged, returned } = inventory;

  const [showSeeItems, setShowSeeItems] = useState(false);
  const handleshowSeeItems = () => setShowSeeItems(true);
  const handleCloseModals = () => {
    setShowSeeItems(false);};

    const SeeItems = ({ show, handleClose }) => {
      return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Add stock form */}
            <Form>
              {/* Include form fields for adding stock */}
              {/* For example, product selection, quantity, etc. */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      );
    };

  return (
    <div className="product-details">
      <Row>
        <Col sm={6}>
          <Carousel>
            {images.map((imageName, index) => (
              <Carousel.Item key={index}>
                <Image
                  src={`https://via.placeholder.com/800x400`}
                  alt={`Placeholder Image`}
                  fluid
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col sm={6}>
          <h1 className="product-name">{name}</h1>
          <p>Price: ${price.toFixed(2)}</p>
          <div className="product-stats">
            <span className="product-stat">Sales: {sales}</span>
            <span className="product-stat">Revenue: ${revenue.toFixed(2)}</span>
          </div>
          
          <hr />
          <h3>Inventory Details</h3>
          <ListGroup>
            <ListGroupItem>
              <span className="inventory-label">Present:</span>
              <span className="inventory-count">{present}</span>
            </ListGroupItem>
            <ListGroupItem>
              <span className="inventory-label">Expired:</span>
              <span className="inventory-count">{expired}</span>
            </ListGroupItem>
            <ListGroupItem>
              <span className="inventory-label">Nearly Expiring:</span>
              <span className="inventory-count">{expiring}</span>
            </ListGroupItem>
            <ListGroupItem>
              <span className="inventory-label">Damaged:</span>
              <span className="inventory-count">{damaged}</span>
            </ListGroupItem>
            <ListGroupItem>
              <span className="inventory-label">Returned:</span>
              <span className="inventory-count">{returned}</span>
            </ListGroupItem>
          </ListGroup>
          
        </Col>
        <Col >
        <Button onClick={handleshowSeeItems}>See Items</Button>
        <hr />
          <h3>Product Specifications</h3>
          <ListGroup>
            {Object.entries(specs).map(([key, value]) => (
              <ListGroupItem key={key}>
                <span className="spec-key">{key.replace(/_/g, " ")}:</span>
                <span className="spec-value">{value}</span>
              </ListGroupItem>
            ))}
          </ListGroup>
        <hr />
          <h3>Overall Information</h3>
          <p>
            {/* Describe overall details about brought, sold, and remaining items */}
            This product has been purchased {/* total bought */} times, with {sales}
            being sold and {present} remaining in stock.
          </p>
          <p>{description}</p>
        </Col>
      </Row>
      <SeeItems show={showSeeItems} handleClose={handleCloseModals} />
    </div>
  );
};

const sampleProduct = {
  images: ["image1.jpg", "image2.jpg"], // Assuming your images are in the public/images directory
  name: "Sample Product",
  price: 49.99,
  sales: 100,
  revenue: 4999.0,
  description: "This is a sample product description.",
  specs: {
    brand: "Sample Brand",
    color: "Red",
    weight: "2 lbs",
  },
  inventory: {
    present: 50,
    expired: 10,
    expiring: 5,
    damaged: 2,
    returned: 3,
  },
};

const ProductDetailsExample = () => {
  return <ProductDetails product={sampleProduct} />;
};

export default ProductDetailsExample;
