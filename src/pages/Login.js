// Login.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const setUser = useStoreActions((actions) => actions.setUser);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to verify credentials
    // For this example, we'll just simulate a successful login
    const fakeUser = { username: credentials.username, role: 'admin' };
    setUser(fakeUser);
    navigate('/');
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleLoginSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
