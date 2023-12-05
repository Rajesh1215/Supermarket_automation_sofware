import React from "react";
import "./orders.css";

function Orders() {
  const orders = [
    {
      id: 1,
      customerName: "John Doe",
      orderDate: "2023-10-26",
      orderTotal: 125.99,
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Jane Doe",
      orderDate: "2023-10-25",
      orderTotal: 89.50,
      status: "Shipped",
    },
    {
      id: 3,
      customerName: "Mike Smith",
      orderDate: "2023-10-24",
      orderTotal: 52.34,
      status: "Delivered",
    },
  ];

  return (
    <div className="Orders-main-container">
      <h1>Orders</h1>
      <div className="orders-container">
        <div className="order-filters">
          {/* Filter components go here */}
          <input type="text" placeholder="Search Orders..." />
          <select name="order-status">
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          <button>Filter</button>
        </div>

        <div className="all-orders">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-info">
                <span className="order-id">Order ID: {order.id}</span>
                <span className="customer-name">{order.customerName}</span>
                <span className="order-date">{order.orderDate}</span>
              </div>
              <div className="order-details">
                <span className="order-total">Total: ${order.orderTotal}</span>
                <span className="order-status">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
