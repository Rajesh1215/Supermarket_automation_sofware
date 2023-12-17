import React, { useState, useEffect } from "react";
import "./orders.css";
import { useParams } from "react-router";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Orders() {
  const { order_id } = useParams();
  const [orderSales, setOrderSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/order_sales/${order_id}`);
        setOrderSales(response.data.Orders_sales);
      } catch (error) {
        console.error("Error fetching order sales data:", error);
      }
    };

    fetchData();
  }, [order_id]);

  // Calculate the sum of total amount
  const totalAmountSum = orderSales.reduce((sum, sale) => sum + sale.total_amount, 0);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Order Sales - Order ID: ${order_id}`, 10, 10);

    const columns = ["Sale ID", "Product ID", "Quantity", "Product Price", "Total Amount"];
    const rows = orderSales.map((sale) => [
      sale.sale_id,
      sale.product_id,
      sale.quantity,
      sale.product_price,
      sale.total_amount,
    ]);

    doc.autoTable({
      head: [columns],
      body: [...rows, ["", "", "", "Total Amount Sum", totalAmountSum]],
    });

    doc.save(`order_sales_${order_id}.pdf`);
  };

  return (
    <div className="Orders-main-container">
      <h2>Order ID: {order_id}</h2>
      {orderSales.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sale ID</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Product Price</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderSales.map((sale) => (
                <tr key={sale.sale_id}>
                  <td>{sale.sale_id}</td>
                  <td>{sale.product_id}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.product_price}</td>
                  <td>{sale.total_amount}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" style={{ textAlign: "right" }}>Total Amount Sum:</td>
                <td>{totalAmountSum}</td>
              </tr>
            </tbody>
          </Table>
          <Button variant="primary" onClick={downloadPDF}>
            Download PDF
          </Button>
        </>
      ) : (
        <p>No sales data available for this order.</p>
      )}
    </div>
  );
}

export default Orders;
