import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import "./sales.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import { Modal, Button, Table } from "react-bootstrap";

const Sales = () => {
  const [orders, setOrders] = useState([]);


  // const [metrics, setmetrics] = useState([]);
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://127.0.0.1:8000/calculate_metrics/"
    //     );
    //     const data = response.data;
    //     setmetrics(data);
    //     console.log("Metrics data:", data);
    //     // Handle the data as needed
    //   } catch (error) {
    //     console.error("Error fetching metrics data:", error);
    //     // Handle errors
    //   }
    // };

    const fetchDataOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/orders/");
        const ordersData = response.data;
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchDataOrders();

    // Call the function to fetch data when the component mounts
    // fetchData();
  }, []);


 
  return (
    <div className="sales-main-container">
      <div className="search-component d-flex justify-content-between ">
        <div>
          <h2>Orders</h2>
        </div>
        <div className="products-num-stats d-flex justify-content-around"></div>
      </div>


      <div className="mt-5 mb-1">
        <h2>Orders</h2>
      </div>
      <div className=" mx-3 my-3 d-flex justify-content-between">
        <div className="search-input d-flex w-50">
          <FontAwesomeIcon icon={faSearch} className="ml-2 mx-2" />
          <input type="text" className="border-0" placeholder="Search Orders" />
        </div>
        <div className=" mx-5 my-2">
          <b>From :</b>
          <input
            type="date"
            className="bg-white border-0 mx-3"
            placeholder="Start Date"
          />
          <b>To :</b>
          <input
            type="date"
            className="bg-white border-0 mx-3"
            placeholder="End Date"
          />
        </div>
      </div>

      <div className="all-sales">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              {/* <th>Product</th>
            <th>Quantity</th> */}
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                {/* Add customer and product information here based on your data structure */}
                <td>{order.customer_id}</td>
                {/* <td>{/* Product information }</td>
              <td>{/* Quantity }</td> */}
                <td>{`$${order.total_price}`}</td>
                <td>{`$${order.total_price}`}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// const ReturnsComponent = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [returnsData, setReturnsData] = useState([]);
//   const [returnslength, setReturnslength] = useState(0);
//   const handleShowModal = () => {
//     setShowModal(true);
//     fetchDataReturns();
//   };

//   const handleHideModal = () => {
//     setShowModal(false);
//   };
//   useEffect(() => {
//     fetchDataReturns();
//   }, []);

//   const fetchDataReturns = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/returns/");
//       setReturnsData(response.data);
//       setReturnslength(response.data.length);
//     } catch (error) {
//       console.error("Error fetching returns data:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="product-count mx-2">Total returns: {returnslength}</div>
//       <Button variant="primary" onClick={handleShowModal} className="my-2">
//         Open Returns Modal
//       </Button>

//       <Modal show={showModal} onHide={handleHideModal} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Returns Data</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Return ID</th>
//                 <th>Product Item ID</th>
//               </tr>
//             </thead>
//             <tbody>
//               {returnsData.map((item) => (
//                 <tr key={item.return_id}>
//                   <td>{item.return_id}</td>
//                   <td>{item.product_item_id}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleHideModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };


export default Sales;
