import React from "react";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to SafeVoice: Speak Without Fear</h1>
        <p>
          Empowering women with tools for legal help, anonymous reporting, and
          counseling.
        </p>
        <Button variant="primary" href="/legal-help">
          Get Help Now
        </Button>
      </div>
    </div>
  );
};

export default Home;

