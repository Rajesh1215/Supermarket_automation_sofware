import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/customers/');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const goToCustomerDetails = () => {
    navigate('customer-details');
  };

  return (
    <div className="customer-main-container">
      <div className="search d-flex justify-content-between align-items-center">
        <div>
          <input
            type="text"
            className="form-control shadow rounded"
            placeholder="Search Customers"
          />
        </div>
        <div>
          <select className="form-select shadow rounded">
            <option value="all">All Locations</option>
            <option value="newYork">New York</option>
            <option value="california">California</option>
            <option value="texas">Texas</option>
          </select>
        </div>
      </div>

      <div className="customer-list shadow rounded" onClick={goToCustomerDetails}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Total Purchases</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>{customer.name}</td>
              <td>{customer.dob}</td>
              <td>{customer.place}</td>
              {/* You can replace the hardcoded value with the actual total purchases data */}
              <td>$1000</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default CustomersList;
