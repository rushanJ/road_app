import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useStoreState } from 'easy-peasy';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = () => {
  const locations = useStoreState((state) => state.locations);
  const selectedLocation = useStoreState((state) => state.selectedLocation);

  return (
    <MapContainer center={[locations[0].lat, locations[0].lng]} zoom={13} style={styles.map}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]}>
          <Popup style={styles.popup}>
            {location.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const styles = {
  map: {
    height: '100%',
    width: '100%',
    zIndex: 5000,
  },
  popup: {
    textAlign: 'center'
  }
};

export default Map;
