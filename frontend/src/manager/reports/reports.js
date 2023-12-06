import React, { useState } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";  // Added Table for example
import "./reports.css";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderHeading = (heading) => (
    <h2 className={`${activeTab === heading.toLowerCase() ? "active-heading" : ""}`}>
      {heading} reports
    </h2>
  );

  const allTabData = [
    { id: 1, name: "Report 1", value: 100 },
    { id: 2, name: "Report 2", value: 150 },
    // Add more data as needed
  ];

  const productsTabData = [
    { id: 1, product: "Product A", sales: 200 },
    { id: 2, product: "Product B", sales: 250 },
    // Add more data as needed
  ];

  const salesTabData = [
    { id: 1, month: "Jan", amount: 5000 },
    { id: 2, month: "Feb", amount: 6000 },
    // Add more data as needed
  ];

  const staffTabData = [
    { id: 1, staffName: "John Doe", sales: 1000 },
    { id: 2, staffName: "Jane Smith", sales: 1200 },
    // Add more data as needed
  ];

  const renderTable = (data) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {Object.values(row).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div className="reports-main-container">
      <Tabs
        id="controlled-tabs"
        activeKey={activeTab}
        onSelect={(k) => handleTabClick(k)}
        className="nav-tabs"
      >
        <Tab eventKey="all" title="All">
          <div className="main-graphs">
            {renderHeading("Main")}
            {/* Content for All Tab */}
            {activeTab === "all" && renderTable(allTabData)}
          </div>
        </Tab>
        <Tab eventKey="products" title="Products">
          <div className="product-graphs-container">
            {renderHeading("Product")}
            {/* Content for Products Tab */}
            {activeTab === "products" && renderTable(productsTabData)}
          </div>
        </Tab>
        <Tab eventKey="sales" title="Sales">
          <div className="sales-graphs-container">
            {renderHeading("Sales")}
            {/* Content for Sales Tab */}
            {activeTab === "sales" && renderTable(salesTabData)}
          </div>
        </Tab>
        <Tab eventKey="staff" title="Staff">
          <div className="staff-graphs-container">
            {renderHeading("Staff")}
            {/* Content for Staff Tab */}
            {activeTab === "staff" && renderTable(staffTabData)}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Reports;
