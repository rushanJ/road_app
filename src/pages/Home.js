import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Map from './Map';
import { Modal, Button, Form } from 'react-bootstrap';

const Home = () => {
  const locations = useStoreState((state) => state.locations);
  const selectedLocation = useStoreState((state) => state.selectedLocation);
  const selectLocation = useStoreActions((actions) => actions.selectLocation);
  const removeLocation = useStoreActions((actions) => actions.removeLocation);
  const supervisors = useStoreState((state) => state.supervisors);
  const employees = useStoreState((state) => state.employees);
  const addServiceRequest = useStoreActions((actions) => actions.addServiceRequest);

  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    supervisor: '',
    employee: '',
  });


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLocationClick = (location) => {
    selectLocation(location);
    handleShowModal();
  };

  const handleAddLocation = () => {
    const newLocation = {
      lat: 51.53,
      lng: -0.13,
      name: 'New Location',
      status: 1,
      image: 'default.jpg'
    };
    selectLocation(newLocation);
    handleShowModal();
  };

  

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Locations</h2>
        <ul style={styles.locationList}>
          {locations.map((location, index) => (
            <li key={index} style={styles.locationItem}>
              <span onClick={() => handleLocationClick(location)}>
                {location.name} - ({location.lat}, {location.lng})
              </span>
              <button onClick={() => removeLocation(index)} style={styles.removeButton}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={handleAddLocation} style={styles.addButton}>Add Location</button>
      </div>
      <div style={styles.mainContent}>
        <Map onMarkerClick={handleLocationClick} />
        <LocationModal show={showModal} onClose={handleCloseModal} location={selectedLocation} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh'
  },
  sidebar: {
    flex: 2,
    backgroundColor: '#f0f0f0',
    padding: '20px',
    overflowY: 'auto'
  },
  mainContent: {
    flex: 10,
    backgroundColor: '#fff',
    padding: '20px',
    position: 'relative'
  },
  locationList: {
    listStyleType: 'none',
    padding: 0
  },
  locationItem: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: '#e0e0e0',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
  },
  removeButton: {
    marginLeft: '10px',
    padding: '5px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '3px'
  },
  addButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '3px'
  }
};

const LocationModal = ({ show, onClose, location }) => {
  const statusLabels = [
    'Pending Validation',
    'Service Provider Selected',
    'Supervisor Allocated',
    'On Going',
    'Completed'
  ];
  const serviceProviders = useStoreState((state) => state.serviceProviders);
  const employees = useStoreState((state) => state.employees);
  const addServiceRequest = useStoreActions((actions) => actions.addServiceRequest);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  

  const [newRequest, setNewRequest] = useState({
    supervisor: '',
    employee: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    addServiceRequest(newRequest);
    setNewRequest({
      supervisor: '',
      employee: '',
      description: ''
    });
    handleCloseModal();
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Location Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {location && (
          <>
            <h3>{location.name}</h3>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
            <p>Status: {statusLabels[location.status - 1]}</p>
            <img src={location.image} alt={location.name} style={{ width: '100%' }} />
          </>
        )}
        <Form onSubmit={handleRequestSubmit}>
            <Form.Group controlId="formSupervisor">
              <Form.Label>Supervisor</Form.Label>
              <Form.Control
                as="select"
                name="supervisor"
                value={newRequest.serviceProvider}
                onChange={handleInputChange}
                required
              >
                <option value="">Select serviceProviders</option>
                {serviceProviders.map((serviceProvider) => (
                  <option key={serviceProvider.id} value={serviceProvider.id}>
                    {serviceProvider.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formEmployee">
              <Form.Label>Employee</Form.Label>
              <Form.Control
                as="select"
                name="employee"
                value={newRequest.employee}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Service Request
            </Button>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Home;
