import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import Home from "./pages/Home";
import About from "./pages/about"; // ✅ Import About component
import LegalHelp from "./pages/LegalHelp";
import Report from "./pages/Report";
import Counseling from "./pages/Counseling";
import FAQ from "./pages/FAQ"; // ✅ Import FAQ component
import CommunityForum from "./pages/communityForum"; // ✅ Import CommunityForum component
import "./styles/app.css"; // ✅ Import global styles
import Login from "./pages/Login"; // Import Login page
import Register from "./pages/Register"; // Import Register page
function App() {
  return (
    <Router>
      <NavbarComponent /> {/* ✅ Navbar at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal-help" element={<LegalHelp />} />
        <Route path="/report" element={<Report />} />
        <Route path="/counseling" element={<Counseling />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/community-forum" element={<CommunityForum />} /> {/* ✅ CommunityForum Route */}
        
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} /> 
      </Routes>
      <FooterComponent /> {/* ✅ Footer at the bottom */}
    </Router>
  );
}
export default App;




