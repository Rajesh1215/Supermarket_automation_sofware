import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, Image, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
import { Formik, Field, ErrorMessage, Form  } from "formik";
// import * as Yup from "yup";

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const [inventoryData, setInventoryData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalItem, setShowModalItem] = useState(false);
  const [productItems, setproductItems] = useState([]);
  const { product_id } = useParams();

  useEffect(() => {
    // Fetch product data
    axios
      .get(`http://127.0.0.1:8000/products/${product_id}`)
      .then((response) => setProductData(response.data))
      .catch((error) => console.error("Error fetching product data:", error));

    // Fetch inventory data
    axios
      .get(`http://127.0.0.1:8000/get_product_details/${product_id}/`)
      .then((response) => setInventoryData(response.data))
      .catch((error) => console.error("Error fetching inventory data:", error));

    axios
      .get(`http://127.0.0.1:8000/productitems/`)
      .then((response) => setproductItems(response.data))
      .catch((error) => console.error("Error fetching inventory data:", error));
  }, [product_id]);
  console.log(productItems);

  const openModal = () => {
    setShowModal(true);
  };
  const openModalItem = () => {
    setShowModalItem(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModalItem(false);
  };



  const AddItemModal = () => {

  const initialValues ={
    product:product_id,
    inventory:null,
    id:null,
  }
   const onItemUpload = (values) => {
    axios.post(`http://127.0.0.1:8000/productitems/`,values).then((res)=>console.log("success"))
    .catch((error) => console.error("Error fetching inventory data:", error));
   }


    return (
      <Modal show={showModalItem} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
            initialValues={initialValues}
            onSubmit={onItemUpload}
          >
            <Form>
              <div className="m-3" >
                <label htmlFor="id">Item ID:</label>
                <Field type="text" id="id" name="id" required />
                <ErrorMessage name="id" component="div" />
              </div>
              <div className="m-3"  >
                <label htmlFor="inventory">Inventory ID:</label>
                <Field type="text" id="inventory" name="inventory" required />
                <ErrorMessage name="inventory" component="div" />
              </div>       
              <div className="m-3"  >
                <button type="submit">Submit</button>
              </div>
            </Form>
          </Formik>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      <h1>{productData.name} Details</h1>
      <div className="row">
        <div className="col-6">
          <Carousel>
            {[1, 2, 3].map((imageName, index) => (
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
        <div className="col-6">
          <h2>Product Information</h2>
          <p>Product ID: {productData.product_id}</p>
          <p>Name: {productData.name}</p>
          <p>Description: {productData.description}</p>
          <p>Price: {productData.price}</p>
          <p>Product Category: {productData.product_category}</p>
        </div>
      </div>
      <hr />
      <div>
        <div className="d-flex justify-content-between">
          <p>Status: {inventoryData.status}</p>
          <p>Verified Items Count: {inventoryData.verified_items_count}</p>
          <p>Unverified Items Count: {inventoryData.unverified_items_count}</p>
          <p>Expired Items Count: {inventoryData.expired_items_count}</p>
          <p>
            Nearly Expiring Items Count:{" "}
            {inventoryData.nearly_expired_items_count}
          </p>
          <p>
            No. of items sold:{" "}
            {inventoryData.sold_items && inventoryData.sold_items.length}
          </p>
        </div>

        <div className="d-flex ">
          <Button variant="primary" className="m-3" onClick={openModal}>
            View Unsold Items
          </Button>
          <Button variant="primary" className="m-3" onClick={openModalItem}>
            Add items
          </Button>
        </div>
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
              {productItems &&
                productItems
                  .filter((item) => item.product === parseInt(product_id))
                  .filter((item) => item.sold === false)
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.product}</td>
                      <td>{item.inventory}</td>
                      <td>{item.damaged ? "Yes" : "No"}</td>
                      <td>{item.sold ? "Yes" : "No"}</td>
                      <td>{item.verified ? "Yes" : "No"}</td>
                    </tr>
                  ))}
              {(!productItems || productItems.length === 0) && (
                <tr>
                  <td colSpan="6">No data available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Modal show={showModalItem} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
      <AddItemModal

      />
    </div>
  );
};

export default ProductDetails;
