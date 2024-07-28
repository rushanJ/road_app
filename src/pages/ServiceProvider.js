import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap"; // Adjust if using a different library
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";

const ServiceProvider = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const employees = useStoreState((state) => state.employees);
  const addServiceProvider = useStoreActions((actions) => actions.addServiceProvider);
  const addEmployee = useStoreActions((actions) => actions.addEmployee);

  const [showModal, setShowModal] = useState(false);
  const [newServiceProvider, setNewServiceProvider] = useState({
    name: "",
    reg_no: "",
    address: "",
    no_of_employees: "",
    service_type: "",
  });

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    provider_reg_no: "",
    name: "",
    address: "",
    speciality: "",
    team_size: "",
    availability: "",
  });
  const [selectedProviderRegNo, setSelectedProviderRegNo] = useState(null);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/service-providers`);
        const data = await response.json();
        setServiceProviders(data);
      } catch (error) {
        console.error('Failed to fetch service providers', error);
      }
    };

    fetchServiceProviders();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/service-providers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newServiceProvider),
      });
      const data = await response.json();
      addServiceProvider(data); // Add the new service provider to the store
      setServiceProviders([...serviceProviders, data]); // Update local state
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add service provider', error);
    }
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newEmployee, provider_reg_no: selectedProviderRegNo }),
      });
      const data = await response.json();
      addEmployee(data); // Add the new employee to the store
      handleCloseEmployeeModal();
    } catch (error) {
      console.error('Failed to add employee', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Service Providers</h1>
      <Button
        onClick={handleShowModal}
        className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700"
      >
        Add Service Provider
      </Button>
      <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Reg No</th>
            <th className="py-2 px-16 text-left">Address</th>
            <th className="py-2 px-4 text-left">No of Employees</th>
            <th className="py-2 px-4 text-left">Service Type</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceProviders.map((provider, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{provider.name}</td>
              <td className="py-2 px-4">{provider.reg_no}</td>
              <td className="py-2 px-16">{provider.address}</td>
              <td className="py-2 px-4">{provider.no_of_employees}</td>
              <td className="py-2 px-4">{provider.service_type}</td>
              <td className="py-2 px-4 flex space-x-2">
                <Button
                  onClick={() => handleShowEmployeeModal(provider.reg_no)}
                  className="bg-green-500 px-3 py-0.5 rounded-md text-white hover:bg-green-700"
                >
                  Add Supervisor
                </Button>
                <Link to={`/supervisor/${provider.reg_no}`}>
                  <Button
                    variant="info"
                    className="bg-blue-500 px-3 py-0.5 rounded-md text-white hover:bg-blue-700"
                  >
                    View Employees
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-80 z-50"
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="flex items-center h-full justify-center "
        backdropClassName="bg-black bg-opacity-50"
      >
        <Modal.Header closeButton className="bg-red-50 pt-10 px-10 ">
          <Modal.Title className="text-xl font-bold flex justify-between items-center">
            <p>Add Service Provider</p>
            <p className="text-sm font-normal">close</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-red-50 px-10 pb-10">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex items-center">
              <label
                className="w-1/3  text-gray-700 text-sm font-bold mb-2"
                htmlFor="formUsername"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                value={newServiceProvider.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center">
              <label
                className="w-1/3 text-gray-700 text-sm font-bold mb-2"
                htmlFor="formRegNo"
              >
                Reg No
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="reg_no"
                type="text"
                placeholder="Reg No"
                name="reg_no"
                value={newServiceProvider.reg_no}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center">
              <label
                className="w-1/3  text-gray-700 text-sm font-bold mb-2"
                htmlFor="formUsername"
              >
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="formAddress"
                type="text"
                placeholder="Address"
                name="address"
                value={newServiceProvider.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center">
              <label
                className="w-1/3  text-gray-700 text-sm font-bold mb-2"
                htmlFor="formNoOfEmployees"
              >
                No of Employees
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="no_of_employees"
                type="number"
                placeholder="No of Employees"
                name="no_of_employees"
                value={newServiceProvider.no_of_employees}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center">
              <label
                className="w-1/3  text-gray-700 text-sm font-bold mb-2"
                htmlFor="formServiceType"
              >
                Service type
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="service_type"
                type="text"
                placeholder="Service type"
                name="service_type"
                value={newServiceProvider.service_type}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700"
            >
              Add Service Provider
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showEmployeeModal}
        onHide={handleCloseEmployeeModal}
        dialogClassName="max-w-3xl mx-auto"
        backdropClassName="bg-black bg-opacity-50"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Supervisor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEmployeeSubmit} className="space-y-4">
            <Form.Group controlId="formEmployeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newEmployee.name}
                onChange={handleEmployeeInputChange}
                required
                className="border-gray-300 rounded-md"
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
                className="border-gray-300 rounded-md"
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
                className="border-gray-300 rounded-md"
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
                className="border-gray-300 rounded-md"
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
                className="border-gray-300 rounded-md"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700"
            >
              Add Supervisor
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ServiceProvider;
