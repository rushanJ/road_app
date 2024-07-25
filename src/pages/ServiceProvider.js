import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link } from 'react-router-dom';

const ServiceProvider = () => {
  const serviceProviders = useStoreState((state) => state.serviceProviders);
  const employees = useStoreState((state) => state.employees);
  const addServiceProvider = useStoreActions((actions) => actions.addServiceProvider);
  const addEmployee = useStoreActions((actions) => actions.addEmployee);

  const [showModal, setShowModal] = useState(false);
  const [newServiceProvider, setNewServiceProvider] = useState({
    name: '',
    reg_no: '',
    address: '',
    no_of_employees: '',
    service_type: ''
  });

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    provider_reg_no: '',
    name: '',
    address: '',
    speciality: '',
    team_size: '',
    availability: ''
  });
  const [selectedProviderRegNo, setSelectedProviderRegNo] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowEmployeeModal = (reg_no) => {
    setSelectedProviderRegNo(reg_no);
    setShowEmployeeModal(true);
  };
  const handleCloseEmployeeModal = () => setShowEmployeeModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewServiceProvider({ ...newServiceProvider, [name]: value });
  };

  const handleEmployeeInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addServiceProvider(newServiceProvider);
    handleCloseModal();
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    addEmployee({ ...newEmployee, provider_reg_no: selectedProviderRegNo });
    handleCloseEmployeeModal();
  };

  return (
    <div>
      <h1>Service Providers</h1>
      <Button onClick={handleShowModal}>Add Service Provider</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Address</th>
            <th>No of Employees</th>
            <th>Service Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceProviders.map((provider, index) => (
            <tr key={index}>
              <td>{provider.name}</td>
              <td>{provider.reg_no}</td>
              <td>{provider.address}</td>
              <td>{provider.no_of_employees}</td>
              <td>{provider.service_type}</td>
              <td>
                <Button onClick={() => handleShowEmployeeModal(provider.reg_no)}>Add Supervisor</Button>
                <Link to={`/supervisor/${provider.reg_no}`}>
                  <Button variant="info" style={{ marginLeft: '10px' }}>View Employees</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Service Provider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newServiceProvider.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRegNo">
              <Form.Label>Reg No</Form.Label>
              <Form.Control
                type="text"
                name="reg_no"
                value={newServiceProvider.reg_no}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newServiceProvider.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoOfEmployees">
              <Form.Label>No of Employees</Form.Label>
              <Form.Control
                type="number"
                name="no_of_employees"
                value={newServiceProvider.no_of_employees}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formServiceType">
              <Form.Label>Service Type</Form.Label>
              <Form.Control
                type="text"
                name="service_type"
                value={newServiceProvider.service_type}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Service Provider
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEmployeeModal} onHide={handleCloseEmployeeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Supervisor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEmployeeSubmit}>
            <Form.Group controlId="formEmployeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newEmployee.name}
                onChange={handleEmployeeInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmployeeAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newEmployee.address}
                onChange={handleEmployeeInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmployeeSpeciality">
              <Form.Label>Speciality</Form.Label>
              <Form.Control
                type="text"
                name="speciality"
                value={newEmployee.speciality}
                onChange={handleEmployeeInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmployeeTeamSize">
              <Form.Label>Team Size</Form.Label>
              <Form.Control
                type="number"
                name="team_size"
                value={newEmployee.team_size}
                onChange={handleEmployeeInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmployeeAvailability">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type="text"
                name="availability"
                value={newEmployee.availability}
                onChange={handleEmployeeInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Supervisor
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ServiceProvider;
