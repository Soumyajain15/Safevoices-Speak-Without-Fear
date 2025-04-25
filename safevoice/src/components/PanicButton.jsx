import React from "react";

function PanicButton() {
  const sendLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      alert(`Emergency Alert Sent! Location: ${latitude}, ${longitude}`);
      // Send data to backend API
    });
  };

  return (
    <button className="btn btn-danger" onClick={sendLocation}>
      🚨 Panic Button
    </button>
  );
}

export default PanicButton;
