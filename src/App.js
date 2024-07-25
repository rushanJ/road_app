// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import Home from './pages/Home';
import ServiceProvider from './pages/ServiceProvider';
import Supervisor from './pages/Supervisor';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import './index.css';

const PrivateRoute = ({ element, ...rest }) => {
  const user = useStoreState((state) => state.user);
  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />}
    />
  );
};

const App = () => {
  const user = useStoreState((state) => state.user);

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service-providers"
          element={
            <ProtectedRoute>
              <ServiceProvider />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/:reg_no"
          element={
            <ProtectedRoute>
              <Supervisor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;