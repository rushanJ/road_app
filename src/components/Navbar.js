// Navbar.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = () => {
  const user = useStoreState((state) => state.user);
  const logout = useStoreActions((actions) => actions.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">MyCity</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/service_provider">Service Providers</Nav.Link>
        </Nav>
        {user && (
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
