import React from "react";
import { Carousel, Image, Row, Col } from "react-bootstrap";

const ProductDetails = ({ product }) => {
  const { images, name, price, sales, revenue, description, specs } = product;

  return (
    <div className="product-details">
      <Row>
        <Col sm={6}>
          <Carousel>
            {images.map((imageName, index) => (
              <Carousel.Item key={index}>
                <Image
                  src={'https://via.placeholder.com/800x400'}  
                  alt={'Placeholder Image'}
                  fluid
                />
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
         
        </Col>
      </Row>
      <hr />
          <h3>Product Description</h3>
          <p>{description}</p>
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
};

const ProductDetailsExample = () => {
  return <ProductDetails product={sampleProduct} />;
};

export default ProductDetailsExample;
