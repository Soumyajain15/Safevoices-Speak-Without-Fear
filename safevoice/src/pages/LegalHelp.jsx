import React from "react";
import "../styles/app.css";
import Chatbot from "../components/Chatbot"; // Import Chatbot

const LegalHelp = () => {
  return (
    <div className="legal-help-page">
      <div className="container mt-5">
        <h1 className="text-center">Legal Help Desk</h1>
        <p className="text-center">
          Access resources on legal rights, procedures, and connect with legal advisors.
        </p>

        {/* Add Chatbot only here */}
        <div className="chatbot-wrapper">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default LegalHelp;
