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
      <button onClick={() => navigate('/')} className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
        Back to Locations
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">{location.name}</h3>
        <p>Latitude: {location.lat}</p>
        <p>Longitude: {location.lng}</p>
        <p>Status: {statusLabels[location.status - 1]}</p>
        <img src={location.image} alt={location.name} className="mt-4 w-full" />
      </div>
    </div>
  );
};

export default LocationDetails;
