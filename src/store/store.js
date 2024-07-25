import { createStore, action } from 'easy-peasy';

const store = createStore({
  user: null,
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  logout: action((state) => {
    state.user = null;
  }),
  locations: [
    {
      lat: 51.505,
      lng: -0.09,
      name: 'Location 1',
      status: 1,
      image: 'https://via.placeholder.com/150'
    },
    {
      lat: 51.51,
      lng: -0.1,
      name: 'Location 2',
      status: 2,
      image: 'https://via.placeholder.com/150'
    },
    {
      lat: 51.52,
      lng: -0.12,
      name: 'Location 3',
      status: 3,
      image: 'https://via.placeholder.com/150'
    }
  ],
  selectedLocation: null,
  selectLocation: action((state, payload) => {
    state.selectedLocation = payload;
  }),
  removeLocation: action((state, payload) => {
    state.locations.splice(payload, 1);
  }),
  addLocation: action((state, payload) => {
    state.locations.push(payload);
  }),

  // Service Providers
  serviceProviders: [
    {
      name: 'Provider 1',
      reg_no: '123456',
      address: '123 Main St',
      no_of_employees: 10,
      service_type: 'Type A'
    },
    {
      name: 'Provider 2',
      reg_no: '654321',
      address: '456 Main St',
      no_of_employees: 20,
      service_type: 'Type B'
    }
  ],
  addServiceProvider: action((state, payload) => {
    state.serviceProviders.push(payload);
  }),

  // Employees
  employees: [
    {
      provider_reg_no: '123456',
      name: 'John Doe',
      address: '456 Elm St',
      speciality: 'Electrician',
      team_size: 5,
      availability: 'Available'
    }
  ],
  addEmployee: action((state, payload) => {
    state.employees.push(payload);
  })
});


export default store;
