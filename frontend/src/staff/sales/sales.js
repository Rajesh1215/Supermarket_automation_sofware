import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./sales.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import * as Yup from 'yup';

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customers, setCustomers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/orders/");
        const ordersData = response.data;
        setOrders(ordersData);

        const customerIds = ordersData.map((order) => order.customer_id);
        const customersResponse = await axios.get(
          "http://127.0.0.1:8000/customers/",
          {
            params: { customer_ids: customerIds.join(",") },
          }
        );
        const customersData = customersResponse.data;
        const customersMap = {};
        customersData.forEach((customer) => {
          customersMap[customer.customer_id] = customer.name;
        });
        setCustomers(customersMap);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchDataOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const customerName = customers[order.customer_id] || "";
    const includesSearchQuery =
      searchQuery.trim() === "" ||
      customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_id.toString().includes(searchQuery.toLowerCase());
    const withinDateRange =
      (!startDate || new Date(order.created_at) >= new Date(startDate)) &&
      (!endDate || new Date(order.created_at) <= new Date(endDate));

    return includesSearchQuery && withinDateRange;
  });

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const MakeOrderModal = ({ showModal, handleClose }) => {
    const initialValues = { orderItems: [{ productItemId: '' }] };
  
    const validationSchema = Yup.object().shape({
      orderItems: Yup.array().of(
        Yup.object().shape({
          productItemId: Yup.string().required('Product Item ID is required'),
        })
      ),
    });
  
    const handleAddField = (values, { setFieldValue }) => {
      const updatedItems = [...values.orderItems, { productItemId: '' }];
      setFieldValue('orderItems', updatedItems);
    };
  
    const handleRemoveField = (index, form) => {
      const updatedItems = [...form.values.orderItems];
      updatedItems.splice(index, 1);
      form.setFieldValue('orderItems', updatedItems);
    };
  
    const handleBuy = async (values) => {
      console.log(values);
      try {
        const response = await axios.post("http://127.0.0.1:8000/make_order/", { orderItems: values.orderItems });
        console.log('Response from server:', response.data);
        handleClose();
      } catch (error) {
        console.error('Error while making a purchase:', error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server response data:', error.response.data);
          console.error('Server response status:', error.response.status);
          console.error('Server response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from the server');
          console.error('Request details:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
      }
    };
    
  
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make an Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleBuy}
          >
            {(formikProps) => (
              <FormikForm>
                {formikProps.values.orderItems.map((item, index) => (
                  <div key={index} className="mb-3">
                    <Form.Group>
                      <Form.Label>Product Item ID {index + 1}</Form.Label>
                      <Field
                        type="text"
                        name={`orderItems[${index}].productItemId`}
                        placeholder="Enter Product Item ID"
                        as={Form.Control}
                      />
                      <ErrorMessage
                        name={`orderItems[${index}].productItemId`}
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveField(index, formikProps)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button variant="secondary" onClick={() => handleAddField(formikProps.values, formikProps)}>
                  Add
                </Button>
                <Button variant="primary" type="submit">
                  Buy
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="sales-main-container">
      <div className="search-component d-flex justify-content-between">
        <div>
          <h2>Orders</h2>
        </div>
      </div>

      <div className="d-flex">
        <Button className="mx-2" onClick={handleShow}>
          Make an order
        </Button>
        {/* <Button>Return</Button> */}
      </div>

      <div className="mb-1">
        <h2>Orders</h2>
      </div>
      <div className="mx-3 my-3 d-flex justify-content-between">
        <div className="search-input d-flex w-50">
          <FontAwesomeIcon icon={faSearch} className="ml-2 mx-2" />
          <input
            type="text"
            className="border-0"
            placeholder="Search Orders"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mx-5 my-2">
          <b>From :</b>
          <input
            type="date"
            className="bg-white border-0 mx-3"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <b>To :</b>
          <input
            type="date"
            className="bg-white border-0 mx-3"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="all-sales">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.order_id}
                onClick={() => navigate(`orders/${order.order_id}`)}
              >
                <td>{order.order_id}</td>
                <td>{customers[order.customer_id]}</td>
                <td>{`$${order.total_price}`}</td>
                <td>{`$${order.total_price}`}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MakeOrderModal showModal={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Sales;
