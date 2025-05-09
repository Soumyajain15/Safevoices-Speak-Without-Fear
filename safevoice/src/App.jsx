import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import Home from "./pages/Home";
import About from "./pages/About";
import LegalHelp from "./pages/LegalHelp";
import Report from "./pages/Report";
import Counseling from "./pages/Counseling";
import FAQ from "./pages/FAQ";
import CommunityForum from "./pages/CommunityForum";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3"; 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./styles/app.css";

function App() {
  const heatmapData = [
    [51.505, -0.09, 0.5],
    [51.515, -0.1, 0.7],
    [51.525, -0.12, 0.3],
  ];

  console.log(heatmapData); // Check if heatmap data is valid

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavbarComponent />
        <main className="flex-fill">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/legal-help" element={<LegalHelp />} />
            <Route path="/report" element={<Report />} />
            <Route path="/counseling" element={<Counseling />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/community-forum" element={<CommunityForum />} />
            <Route path="/heatmap" element={
              <div style={{ height: "500px", width: "100%" }}>
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <HeatmapLayer
                    points={heatmapData}
                    longitudeExtractor={(m) => m[1]}
                    latitudeExtractor={(m) => m[0]}
                    intensityExtractor={(m) => m[2]}
                  />
                </MapContainer>
              </div>
            } />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
