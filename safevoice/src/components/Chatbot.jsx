import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Card } from "react-bootstrap";
import "../styles/app.css";
import axios from "axios";  // Make sure axios is installed (npm install axios)

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I assist you today? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [language, setLanguage] = useState("en");

  // Predefined legal topics for quick replies
  const quickReplies = [
    "How can I file a complaint?",
    "What are my legal rights?",
    "I need help with harassment issues.",
    "Tell me about cybercrime laws.",
    "Where can I find legal aid nearby?",
    "Report an incident",
    "Book counseling session",
    "Set emergency contact",
    "Translate to Hindi",
  ];

  // Sample responses for quick replies
  const responseMap = {
    "How can I file a complaint?":
      "You can file a complaint by visiting the local police station or using the online grievance portal.",
    "What are my legal rights?":
      "You have the right to seek protection and file complaints against any harassment or unlawful activity.",
    "I need help with harassment issues.":
      "You can report incidents anonymously through SafeVoice or contact a legal advisor for help.",
    "Tell me about cybercrime laws.":
      "Cybercrime laws protect you from online harassment, data theft, and financial fraud.",
    "Where can I find legal aid nearby?":
      "You can find legal aid through government legal services or NGOs that provide free legal assistance.",
    "Translate to Hindi": "अनुवाद: आपका स्वागत है! मैं आपकी किस प्रकार सहायता कर सकता हूँ? 😊",
  };

  // Handle user input
  const handleSend = (message) => {
    if (!message) return;

    const userMessage = { sender: "user", text: message };
    setMessages([...messages, userMessage]);
    setTyping(true);

    setTimeout(() => {
      processUserInput(message);
      setTyping(false);
    }, 1000);

    setInput("");
  };

  // Process user input and generate responses
  const processUserInput = (userInput) => {
    if (responseMap[userInput]) {
      addBotMessage(responseMap[userInput]);
    } else if (userInput.toLowerCase().includes("report an incident")) {
      setStep("report");
      addBotMessage("Please describe the incident briefly.");
    } else if (userInput.toLowerCase().includes("book counseling session")) {
      setStep("counseling");
      addBotMessage("Please select your preferred date and time for counseling.");
    } else if (userInput.toLowerCase().includes("set emergency contact")) {
      setStep("emergency");
      addBotMessage("Please provide the name and phone number of your emergency contact.");
    } else if (userInput.toLowerCase().includes("upload file")) {
      setStep("file-upload");
      addBotMessage("Please upload the required document or evidence.");
    } else {
      addBotMessage("I'm here to help! What would you like to do next?");
    }
  };

  // Add bot message dynamically
  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    addBotMessage("File uploaded successfully! ✅");
    setStep(null);
  };

  // Handle emergency location sharing
  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const locationMessage = `Location shared: 📍 Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        addBotMessage(locationMessage);
      });
    } else {
      addBotMessage("Geolocation is not supported by your browser.");
    }
  };

  // Handle translation
  const translateMessage = (msg, lang) => {
    if (lang === "hi") {
      addBotMessage("अनुवाद: आपका स्वागत है! मैं आपकी किस प्रकार सहायता कर सकता हूँ? 😊");
    } else {
      addBotMessage("Translation is currently available only in Hindi.");
    }
  };

  // Handle emergency contact setup
  const setupEmergencyContact = (contactInfo) => {
    addBotMessage(`Emergency contact ${contactInfo} has been set successfully! ✅`);
    setStep(null);
  };

  // API call to send incident report
  const sendReport = (incidentDescription) => {
    axios
      .post("/api/report-incident", { description: incidentDescription })
      .then((response) => {
        addBotMessage("Your incident has been reported successfully. We'll follow up with you soon.");
      })
      .catch((error) => {
        console.error(error);
        addBotMessage("Sorry, there was an error reporting your incident. Please try again later.");
      });
  };

  // API call to book counseling session
  const bookCounseling = (dateTime) => {
    axios
      .post("/api/book-counseling", { dateTime })
      .then((response) => {
        addBotMessage("Your counseling session has been booked successfully.");
      })
      .catch((error) => {
        console.error(error);
        addBotMessage("Sorry, there was an error booking your session. Please try again later.");
      });
  };

  return (
    <div className="chatbot-container">
      <Card className="chatbot-card">
        <Card.Header className="chatbot-header">🔒 SafeVoice Chatbot</Card.Header>
        <Card.Body className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {typing && <div className="typing-indicator">Bot is typing...</div>}
        </Card.Body>

        {/* Quick Replies Section */}
        <div className="quick-replies">
          {quickReplies.map((reply, idx) => (
            <Button
              key={idx}
              variant="outline-secondary"
              size="sm"
              className="quick-reply-btn"
              onClick={() => handleSend(reply)}
            >
              {reply}
            </Button>
          ))}
        </div>

        {/* File Upload Section */}
        {step === "file-upload" && (
          <div className="file-upload-section">
            <input type="file" onChange={handleFileChange} />
          </div>
        )}

        {/* Input Section */}
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Ask a question or select a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          />
          <Button variant="primary" onClick={() => handleSend(input)}>
            Send
          </Button>
        </InputGroup>

        {/* Location Sharing Button */}
        <Button variant="danger" size="sm" onClick={shareLocation} className="location-btn">
          📍 Share Location
        </Button>
      </Card>
    </div>
  );
};

export default Chatbot;
