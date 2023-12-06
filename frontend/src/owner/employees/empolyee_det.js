import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";

const EmployeeDetails = () => {
  const employee = {
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    performance: {
      projectsCompleted: 20,
      tasksCompleted: 150,
      rating: 4.5,
    },
    details: {
      position: "Software Engineer",
      department: "IT",
      hireDate: "2022-01-01",
    },
    leaves: {
      totalLeaves: 20,
      remainingLeaves: 5,
    },
    status: "Active",
  };

  return (
    <div>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={employee.image} />
            <Card.Body>
              <Card.Title>{employee.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h2>Performance</h2>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Projects Completed</th>
                <th>Tasks Completed</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{employee.performance.projectsCompleted}</td>
                <td>{employee.performance.tasksCompleted}</td>
                <td>{employee.performance.rating}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <h2>Details</h2>
          <p>Position: {employee.details.position}</p>
          <p>Department: {employee.details.department}</p>
          <p>Hire Date: {employee.details.hireDate}</p>
        </Col>
        <Col md={4}>
          <h2>Leaves</h2>
          <p>Total Leaves: {employee.leaves.totalLeaves}</p>
          <p>Remaining Leaves: {employee.leaves.remainingLeaves}</p>
        </Col>
        <Col md={4}>
          <h2>Status</h2>
          <p>Status: {employee.status}</p>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeDetails;
