import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const Profile = () => {
  const employee = {
    name: "John Doe",
    image: "https://via.placeholder.com/400",
    performance: {
      projectsCompleted: 20,
      tasksCompleted: 150,
      rating: 4.5,
    },
    details: {
      position: "Software Engineer",
      department: "IT",
      hireDate: "2022-01-01",
      salary: "$80,000", // New addition: Salary
    },

  };

  return (
    <div className="m-1">
      <Row className="mb-5 shadow rounded">
        <Col md={4}>
          <Card className="my-5 mx-2">
            <Card.Img variant="top" src={employee.image} />
            <Card.Body>
              <Card.Title>{employee.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mt-3">
          <h2>Details</h2>
          <p>Position: {employee.details.position}</p>
          <p>Department: {employee.details.department}</p>
          <p>Hire Date: {employee.details.hireDate}</p>
          <p>Salary: {employee.details.salary}</p> {/* New addition: Salary */}
        </Col>
        
      </Row>
      <div className="works-assigned mx-2 mt-5 pt-2 pb-4 px-3 shadow rounded">
        <h3>Works Assigned</h3>
        <hr />

      </div>
      <div className="works-assigned m-2 pb-4 pt-2 px-3 shadow rounded">
        <h3>Works Completed</h3>
        <hr />
      </div>

      

    </div>
  );
};

export default Profile;
