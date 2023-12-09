import React from "react";
import { Container, Table } from "react-bootstrap";

const Returns = () => {
  // Sample data for returned products
  const returnedProducts = [
    { id: 1, name: "Product A", quantity: 2, reason: "Defective" },
    { id: 2, name: "Product B", quantity: 1, reason: "Not as described" },
    { id: 3, name: "Product C", quantity: 3, reason: "Changed mind" },
    // Add more sample data as needed
  ];

  return (
    <Container>
      <h1>Returns</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {returnedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.reason}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Returns;
