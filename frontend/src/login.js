import React, { useState,  } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useUserContext } from './data/data';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const context = useUserContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      console.log(username, password);
      const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
      const userStatus = response.data.status;
      console.log(response);
      if (userStatus) {
        context.setUser({
          username,
          password,
          role: userStatus,
          id:response.data.user_id,
        });
  
        switch (userStatus) {
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
        setError(response.data.error);
      }
    }  catch (error) {
      console.error('Login failed', error);
      if (error.response.status === 401) {
        alert(error.response.data.error || 'Invalid credentials');
      } else {
        alert('Login failed. Please try again.');
      }
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
        {error}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
