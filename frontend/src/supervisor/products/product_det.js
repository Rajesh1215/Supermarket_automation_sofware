import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table,Image,Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const [inventoryData, setInventoryData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch product data
    axios.get('http://127.0.0.1:8000/products/1')
      .then(response => setProductData(response.data))
      .catch(error => console.error('Error fetching product data:', error));

    // Fetch inventory data
    axios.get('http://127.0.0.1:8000/get_product_details/1/')
      .then(response => setInventoryData(response.data))
      .catch(error => console.error('Error fetching inventory data:', error));
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>{productData.name} Details</h1>
      <div className='row'>
        <div  className='col-6'>
        <Carousel>
            {[1,2,3].map((imageName, index) => (
              <Carousel.Item key={index}>
                <Image
                  src={`https://via.placeholder.com/800x400`}
                  alt={`Placeholder Image`}
                  fluid
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      <div className='col-6'>
        <h2>Product Information</h2>
        <p>Product ID: {productData.product_id}</p>
        <p>Name: {productData.name}</p>
        <p>Description: {productData.description}</p>
        <p>Price: {productData.price}</p>
        <p>Product Category: {productData.product_category}</p>
      </div>
      </div>
      <hr/>
      <div>
        <div className='d-flex justify-content-between'>
        <p>Status: {inventoryData.status}</p>
        <p>Verified Items Count: {inventoryData.verified_items_count}</p>
        <p>Unverified Items Count: {inventoryData.unverified_items_count}</p>
        <p>Expired Items Count: {inventoryData.expired_items_count}</p>
        <p>Nearly Expiring Items Count: {inventoryData.nearly_expired_items_count}</p>
        <p>No. of  items sold: {inventoryData.sold_items && inventoryData.sold_items.length}</p>
        </div>

        <Button variant="primary" className='m-3' onClick={openModal}>
          View Unsold Items
        </Button>
      </div>

      {/* React Bootstrap Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Unsold Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Product Information</h4>
          <p>Product ID: {productData.product_id}</p>
          <p>Name: {productData.name}</p>
          <p>Description: {productData.description}</p>
          <p>Price: {productData.price}</p>
          <p>Product Category: {productData.product_category}</p>

          <h4>Unsold Items</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Inventory ID</th>
                <th>Damaged</th>
                <th>Sold</th>
                <th>Verified</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.unsold_items && inventoryData.unsold_items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.product_id}</td>
                  <td>{item.inventory_id}</td>
                  <td>{item.damaged ? 'Yes' : 'No'}</td>
                  <td>{item.sold ? 'Yes' : 'No'}</td>
                  <td>{item.verified ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetails;
