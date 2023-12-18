import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';
import {useUserContext} from '../../data/data'


const Profile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [employeeDuties, setEmployeeDuties] = useState([]);
  const {User}=useUserContext()
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/employees/${User.id}`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    const fetchDuties = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/duties/');
        setEmployeeDuties(response.data);
      } catch (error) {
        console.error('Error fetching duties data:', error);
      }
    };

    fetchEmployeeData();
    fetchDuties();
  }, [User.id]);

  const completedTasks = employeeDuties.filter(duty => duty.employee === parseInt(User.id) && duty.status === 'completed');
  const pendingTasks = employeeDuties.filter(duty => duty.employee === parseInt(User.id) && duty.status === 'pending');
  const incompleteTasks = employeeDuties.filter(duty => duty.employee === parseInt(User.id) && duty.status !== 'completed' && duty.status !== 'pending');

  return (
    <div className="my-3">
      {employeeData ? (
        <Row className="mb-5">
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/400" />
              <Card.Body>
                <Card.Title>{employeeData.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mt-3">
            <h2>Details</h2>
            <p>Username: {employeeData.username}</p>
            <p>Email: {employeeData.mail_id}</p>
            <p>Date of Birth: {employeeData.dob}</p>
            <p>Date of Joining: {employeeData.date_of_join}</p>
            <p>Password: {employeeData.password}</p>
            <p>Performance: {employeeData.performance}</p>
            <p>Status: {employeeData.status}</p>
          </Col>
        </Row>
      ) : (
        <p>Loading employee data...</p>
      )}

      {/* Works Assigned Section */}
      <div className="works-assigned mx-2 mt-5 pt-2 pb-4 px-3 shadow rounded">
        <h3>Works Assigned</h3>
        <hr />
        <div>
          <h4>Completed Tasks</h4>
          <ul>
            {completedTasks.map(task => (
              <li key={task.id}>{task.work}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Pending Tasks</h4>
          <ul>
            {pendingTasks.map(task => (
              <li key={task.id}>{task.work}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Incomplete Tasks</h4>
          <ul>
            {incompleteTasks.map(task => (
              <li key={task.id}>{task.work}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Works Completed Section */}
      <div className="works-assigned m-2 pb-4 pt-2 px-3 shadow rounded">
        <h3>Works Completed</h3>
        <hr />
        {/* Display works completed content here */}
      </div>
    </div>
  );
};

export default Profile;
