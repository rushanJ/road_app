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
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Locations</h2>
        <ul className="space-y-2">
          {locations.map((location, index) => (
            <li key={index} className="flex items-center justify-between bg-white p-2 rounded shadow-md">
              <span className="cursor-pointer" onClick={() => handleLocationClick(location)}>
                {location.name} - ({location.lat}, {location.lng})
              </span>
              <button
                onClick={() => removeLocation(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddLocation}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Location
        </button>
      </div>
      <div className="flex-1 p-4">
        <Map onMarkerClick={handleLocationClick} />
        <LocationModal show={showModal} onClose={handleCloseModal} location={selectedLocation} />
      </div>
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50'>
        hello
      </div>
    </div>
  );
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
