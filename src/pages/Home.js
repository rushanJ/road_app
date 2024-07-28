import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';

const Home = () => {
  const locations = useStoreState((state) => state.locations);
  const removeLocation = useStoreActions((actions) => actions.removeLocation);
  const navigate = useNavigate();

  const handleLocationClick = (location) => {
    navigate(`/location/${location.id}`);
  };

  const handleAddLocation = () => {
    const newLocation = {
      id: locations.length + 1,
      lat: 51.53,
      lng: -0.13,
      name: 'New Location',
      status: 1,
      image: 'default.jpg'
    };
    // Add logic to update store with new location
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Locations</h2>
        <ul className="space-y-2">
          {locations.map((location) => (
            <li key={location.id} className="flex items-center justify-between bg-white p-2 rounded shadow-md">
              <span className="cursor-pointer" onClick={() => handleLocationClick(location)}>
                {location.name} - ({location.lat}, {location.lng})
              </span>
              {/* <button
                onClick={() => removeLocation(location.id)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Remove
              </button> */}
            </li>
          ))}
        </ul>
        {/* <button
          onClick={handleAddLocation}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Location
        </button> */}
      </div>
      <div className="flex-1 p-4">
        <Map />
      </div>
    </div>
  );
};

export default Home;
