import React from "react";
import Heatmap from "../components/Heatmap";
import PanicButton from "../components/PanicButton";

const Dashboard = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* Heatmap Section */}
      <div className="mb-4">
        <h4>Incident Heatmap</h4>
        <Heatmap />
      </div>

      {/* Panic Button Section */}
      <div className="text-center">
        <PanicButton />
      </div>
    </div>
  );
};

export default Dashboard;
