import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

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
    <Marker
      position={position}
      icon={L.icon({ iconUrl: "/marker-icon.png", iconSize: [25, 41] })}
    >
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
