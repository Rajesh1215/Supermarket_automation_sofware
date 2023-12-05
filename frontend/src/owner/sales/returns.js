import React, { useState } from "react";
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from "react-bootstrap";

const Returns = () => {
  const [activeTab, setActiveTab] = useState("refunds");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const refundRequests = [
    { orderId: 12345, customerName: "John Doe", reason: "Damaged product", status: "Pending" },
    { orderId: 54321, customerName: "Jane Doe", reason: "Wrong size", status: "Approved" },
  ];

  const replacementRequests = [
    {
      orderId: 98765,
      customerName: "Mike Smith",
      reason: "Defective product",
      replacementItem: "Same product",
      status: "Pending",
    },
    {
      orderId: 43210,
      customerName: "Mary Jones",
      reason: "Incorrect item",
      replacementItem: "Different product",
      status: "Approved",
    },
  ];

  const renderTableRows = (data) =>
    data.map((request) => (
      <tr key={request.orderId}>
        <td>{request.orderId}</td>
        <td>{request.customerName}</td>
        <td>{request.reason}</td>
        {request.replacementItem && <td>{request.replacementItem}</td>}
        <td>{request.status}</td>
        <td>
          <button className="btn btn-primary">Process</button>
          <button className="btn btn-danger">Deny</button>
        </td>
      </tr>
    ));

  return (
    <Container>
      <h1>Returns</h1>
      <Nav variant="tabs">
        <NavItem>
          <NavLink
            eventKey="refunds"
            onClick={() => handleTabClick("refunds")}
            active={activeTab === "refunds"}
          >
            Refunds
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            eventKey="replacements"
            onClick={() => handleTabClick("replacements")}
            active={activeTab === "replacements"}
          >
            Replacements
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeKey={activeTab}>
        <TabPane eventKey="refunds">
          <h2>Refund Requests</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Reason for Return</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(refundRequests)}</tbody>
          </table>
        </TabPane>
        <TabPane eventKey="replacements">
          <h2>Replacement Requests</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Reason for Replacement</th>
                <th>Replacement Item</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(replacementRequests)}</tbody>
          </table>
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default Returns;
