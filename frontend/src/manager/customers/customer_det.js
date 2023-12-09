import React from "react";
import { Table } from "react-bootstrap";

const CustomerPage = () => {
  const customer = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St, Cityville",
  };

  const orders = [
    { id: 101, product: "Product A", quantity: 2, price: 49.99 },
    { id: 102, product: "Product B", quantity: 1, price: 29.99 },
    { id: 103, product: "Product C", quantity: 3, price: 19.99 },
  ];

  return (
    <div>
      <h1>Customer Details</h1>
      <p>
        <strong>ID:</strong> {customer.id}
      </p>
      <p>
        <strong>Name:</strong> {customer.name}
      </p>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>
      <p>
        <strong>Address:</strong> {customer.address}
      </p>

      <h2>Orders</h2>
      <Table striped bordered hover responsive>
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
      </Table>
    </div>
  );
};

export default CustomerPage;
