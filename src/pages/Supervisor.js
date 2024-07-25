import React from 'react';
import { Table } from 'react-bootstrap';
import { useStoreState } from 'easy-peasy';
import { useParams } from 'react-router-dom';

const Employees = () => {
  const serviceProviders = useStoreState((state) => state.serviceProviders);
  const employees = useStoreState((state) => state.employees);
  const { reg_no } = useParams();

  const provider = serviceProviders.find((provider) => provider.reg_no === reg_no);

  if (!provider) {
    return <div>No provider found</div>;
  }

  const providerEmployees = employees.filter((emp) => emp.provider_reg_no === reg_no);

  return (
    <div>
      <h1>Employees of {provider.name}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Speciality</th>
            <th>Team Size</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.address}</td>
              <td>{employee.speciality}</td>
              <td>{employee.team_size}</td>
              <td>{employee.availability}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Employees;
