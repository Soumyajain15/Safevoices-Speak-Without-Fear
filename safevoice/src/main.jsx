import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global CSS
import App from "./App";
import "./styles/app.css"; 
// Render App to DOM using createRoot
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
