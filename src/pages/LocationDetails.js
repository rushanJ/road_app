import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LocationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  const statusLabels = [
    'Pending Validation',
    'Service Provider Selected',
    'Supervisor Allocated',
    'On Going',
    'Completed'
  ];

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/locations/${id}`);
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Failed to fetch location details', error);
      }
    };

    fetchLocation();
  }, [id]);

  const handleApprove = async () => {
    // Logic to handle approve
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/locations/${id}/approve`, { method: 'POST' });
      // Update location status in the state or refetch location details
      setLocation({ ...location, status: 2 }); // Example update to 'Service Provider Selected'
    } catch (error) {
      console.error('Failed to approve location', error);
    }
  };

  const handleDecline = async () => {
    // Logic to handle decline
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/locations/${id}/decline`, { method: 'POST' });
      // Update location status in the state or refetch location details
      setLocation({ ...location, status: 1 }); // Example update to 'Pending Validation'
    } catch (error) {
      console.error('Failed to decline location', error);
    }
  };

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
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleApprove}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={handleDecline}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default LocationDetails;
