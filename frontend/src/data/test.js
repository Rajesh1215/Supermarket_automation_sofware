// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Table } from 'react-bootstrap';
// import axios from 'axios';

const ReturnsComponent = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [returnsData, setReturnsData] = useState([]);

  // const handleShowModal = () => {
  //   setShowModal(true);
  //   fetchDataReturns();
  // };

  // const handleHideModal = () => {
  //   setShowModal(false);
  // };

  // const fetchDataReturns = async () => {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:8000/returns/');
  //     setReturnsData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching returns data:', error);
  //   }
  // };

  return (
    <div>
      {/* <Button variant="primary" onClick={handleShowModal}>
        Open Returns Modal
      </Button>

      <Modal show={showModal} onHide={handleHideModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Returns Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Return ID</th>
                <th>Product Item ID</th>
              </tr>
            </thead>
            <tbody>
              {returnsData.map((item) => (
                <tr key={item.return_id}>
                  <td>{item.return_id}</td>
                  <td>{item.product_item_id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default ReturnsComponent;
