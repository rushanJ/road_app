import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const LocationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const locations = useStoreState((state) => state.locations);
  const location = locations.find(loc => loc.id === parseInt(id));

  const statusLabels = [
    'Pending Validation',
    'Service Provider Selected',
    'Supervisor Allocated',
    'On Going',
    'Completed'
  ];

  if (!location) {
    return <div>Location not found</div>;
  }

  return (
    <div className="p-4">
  <button
    onClick={() => navigate('/')}
    className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
  >
    Back to Locations
  </button>
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col lg:flex-row lg:space-x-6">
    <div className="lg:w-1/3">
      <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
      <p className="text-gray-700 mb-1">Latitude: <span className="font-medium">{location.lat}</span></p>
      <p className="text-gray-700 mb-1">Longitude: <span className="font-medium">{location.lng}</span></p>
      <p className="text-gray-700 mb-4">Status: <span className="font-medium">{statusLabels[location.status - 1]}</span></p>
    </div>
    <div className="lg:w-2/3">
      <img
        src={location.image}
        alt={location.name}
        className="mt-4 lg:mt-0 w-96 rounded-lg shadow-sm"
      />
    </div>
  </div>
</div>

  );
};

export default LocationDetails;
