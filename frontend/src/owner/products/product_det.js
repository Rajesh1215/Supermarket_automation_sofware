import React from "react";
import { Carousel, Image, Row, Col, Card } from "react-bootstrap";

const ProductDetails = ({ product }) => {
  const { images, name, price, sales, revenue, description, specs } = product;

  return (
    <div className="product-details">
      <Row>
        <Col sm={6}>
          <Carousel>
            {images.map((image) => (
              <Carousel.Item key={image.src}>
                <Image src={image.src} alt={image.alt} fluid />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col sm={6}>
          <h1>{name}</h1>
          <p>Price: ${price.toFixed(2)}</p>
          <p>Sales: {sales}</p>
          <p>Revenue: ${revenue.toFixed(2)}</p>
          <hr />
          <h3>Product Specifications</h3>
          <ul>
            {Object.entries(specs).map(([key, value]) => (
              <li key={key}>
                {key.replace(/_/g, " ")}: {value}
              </li>
            ))}
          </ul>
          <hr />
          <h3>Product Description</h3>
          <p>{description}</p>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
