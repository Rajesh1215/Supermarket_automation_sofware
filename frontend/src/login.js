import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { useUserContext } from './data/data';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const context = useUserContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (username.trim() !== '' && password.trim() !== '' && selectedRole !== '') {
      // Set user data in context (modify as per your user data structure)
      context.setUser({
        username,
        password, // Note: In a real app, you should never store passwords in plain text
        role: selectedRole,
        // Add other user data as needed
      });

      // Navigate based on the selected role
      switch (selectedRole) {
        case 'owner':
          navigate('/owner');
          break;
        case 'manager':
          navigate('/manager');
          break;
        case 'supervisor':
          navigate('/supervisor');
          break;
        case 'staff':
          navigate('/staff');
          break;
        default:
          alert('Please select a valid user role.');
      }
    } else {
      alert('Please enter a valid username, password, and select a role.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label>User Role</Form.Label>
          <Dropdown className='my-3' onSelect={(eventKey) => handleRoleSelect(eventKey)}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedRole ? selectedRole : 'Select Role'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="owner">Owner</Dropdown.Item>
              <Dropdown.Item eventKey="manager">Manager</Dropdown.Item>
              <Dropdown.Item eventKey="supervisor">Supervisor</Dropdown.Item>
              <Dropdown.Item eventKey="staff">Staff</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
