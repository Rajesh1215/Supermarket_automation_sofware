// CustomerPage.js
import React from 'react';

const CustomerPage = () => {
  const customer = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, Cityville',
  };

  const orders = [
    { id: 101, product: 'Product A', quantity: 2, price: 49.99 },
    { id: 102, product: 'Product B', quantity: 1, price: 29.99 },
    { id: 103, product: 'Product C', quantity: 3, price: 19.99 },
  ];

  return (
    <div style={{  fontFamily: 'Arial, sans-serif' }}>
      <h1>Customer Details</h1>
      <div>
        <strong>ID:</strong> {customer.id}
      </div>
      <div>
        <strong>Name:</strong> {customer.name}
      </div>
      <div>
        <strong>Email:</strong> {customer.email}
      </div>
      <div>
        <strong>Address:</strong> {customer.address}
      </div>

      <h2>Orders</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>${(order.quantity * order.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerPage;
