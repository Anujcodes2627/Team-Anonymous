import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L from "leaflet";

// Fix: manually import marker icon and shadow
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function CurrentLocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        map.setView(coords, 13);
      },
      () => {
        alert("Location access denied.");
      }
    );
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={defaultIcon}>
      <Popup>You are here!</Popup>
    </Marker>
  );
}
export default function AQIMap() {
  return (
    <div className="h-96 w-full">
      <MapContainer
        center={[22.7196, 75.8577]} // default center
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <CurrentLocationMarker />
        {/* You can add more AQI markers below */}
      </MapContainer>
    </div>
  );
}
