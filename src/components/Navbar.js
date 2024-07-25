// Navbar.js
import React from 'react';
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
    <div>
    <nav className="bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                MyCity
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/service-providers"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Service Providers
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 border border-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      
    </nav>

    {/* <Navbar bg="light" expand="lg">
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
    </Navbar> */}
    </div>
  );
};

export default AppNavbar;
