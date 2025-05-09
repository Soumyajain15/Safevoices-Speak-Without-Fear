import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
//import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";
import { getIncidentReports } from "../services/api";

const HeatmapView = () => {
  const [heatData, setHeatData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reports = await getIncidentReports();
        const points = reports
          .filter((report) => report.location?.coordinates?.length === 2)
          .map((report) => [
            report.location.coordinates[1], // lat
            report.location.coordinates[0], // lng
            0.7, // intensity
          ]);
        setHeatData(points);
      } catch (error) {
        console.error("Failed to fetch reports:", error.message);
      }
    };

    fetchReports();
  }, []);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap contributors</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {heatData.length > 0 && (
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={heatData}
            longitudeExtractor={(m) => m[1]}
            latitudeExtractor={(m) => m[0]}
            intensityExtractor={(m) => m[2]}
            radius={20}
            blur={15}
            max={1.0}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default HeatmapView;
