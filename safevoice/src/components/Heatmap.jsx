import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, HeatmapLayer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 28.7041,
  lng: 77.1025, // Default to Delhi
};

function Heatmap() {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    // Fetch incident data with lat/lng
    fetch("/api/incidents")
      .then((res) => res.json())
      .then((data) => {
        const points = data.map((incident) => ({
          location: new window.google.maps.LatLng(incident.lat, incident.lng),
          weight: 1,
        }));
        setDataPoints(points);
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <HeatmapLayer data={dataPoints} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Heatmap;
