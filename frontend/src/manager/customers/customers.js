import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/customers/');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const goToCustomerDetails = () => {
    navigate('customer-details');
  };

  const handleAddCustomer = () => {
    setShowAddCustomerModal(true);
  };

  const handleCloseAddCustomerModal = () => {
    setShowAddCustomerModal(false);
  };

  const handleAddCustomerSubmit = async (values) => {
    try {
      await axios.post('http://127.0.0.1:8000/customers/', values);
      fetchData();
      setShowAddCustomerModal(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    place: Yup.string().required('Place is required'),
    dob: Yup.date().required('Date of Birth is required'),
  });

  // Filter customers based on search term for name or city
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-main-container">
      <div className="search d-flex justify-content-around  mb-3">
        <input
          type="text"
          className="form-control shadow rounded w-75"
          placeholder="Search Customers by Name or City"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary mb-3 shadow rounded my-3" onClick={handleAddCustomer}>
          Add Customer
        </button>
      </div>

      <div className="customer-list shadow rounded">
        <table className="table table-striped">
          {/* Table header */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.customer_id} onClick={goToCustomerDetails}>
                <td>{customer.customer_id}</td>
                <td>{customer.name}</td>
                <td>{customer.dob}</td>
                <td>{customer.place}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for adding a new customer */}
        <Modal show={showAddCustomerModal} onHide={handleCloseAddCustomerModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ name: '', place: '', dob: '' }}
              validationSchema={validationSchema}
              onSubmit={handleAddCustomerSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="place" className="form-label">
                      Place
                    </label>
                    <Field
                      type="text"
                      id="place"
                      name="place"
                      className={`form-control ${errors.place && touched.place ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="place" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                      Date of Birth
                    </label>
                    <Field
                      type="date"
                      id="dob"
                      name="dob"
                      className={`form-control ${errors.dob && touched.dob ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="dob" component="div" className="text-danger" />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default CustomersList;
