import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Card, ListGroup, ProgressBar, Alert } from "react-bootstrap";
import axios from "axios";
import "../styles/app.css";

const Counseling = () => {
  const [showModal, setShowModal] = useState(false);
  const [sessionType, setSessionType] = useState("");
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [feedback, setFeedback] = useState("");
  const [progress, setProgress] = useState(40);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch Counselor List from Backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/counselors")
      .then((res) => {
        setCounselors(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Book a Session with Selected Counselor
  const handleSessionBooking = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/book-session", {
        counselor: selectedCounselor,
        sessionType,
      });
      setShowSuccess(true);
      setShowModal(false);
    } catch (error) {
      console.error("Error booking session:", error);
    }
  };

  // Submit Feedback
  const handleFeedbackSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/feedback", {
        counselor: selectedCounselor,
        feedback,
      });
      alert("Thank you for your feedback! 🌟");
      setShowFeedback(false);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="counseling-container">
      {showSuccess && <Alert variant="success">🎉 Your session has been booked successfully!</Alert>}
      <Card className="counseling-card">
        <Card.Header className="counseling-header">🧠 Counseling Services & Emotional Support</Card.Header>
        <Card.Body>
          <p>Choose your preferred session type:</p>
          <ListGroup>
            <ListGroup.Item action onClick={() => setSessionType("Text Chat")}>
              🗣️ Text Chat Counseling
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setSessionType("Video Session")}>
              🎥 Video Counseling (WebRTC / Zoom)
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setSessionType("Audio Call")}>
              📞 Audio Counseling
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setSessionType("Group Therapy")}>
              👫 Group Therapy & Peer Support
            </ListGroup.Item>
          </ListGroup>

          {/* Counselor Selection */}
          <h5 className="mt-4">💡 Select Your Counselor:</h5>
          <Form.Select
            onChange={(e) => setSelectedCounselor(e.target.value)}
            className="mb-3"
          >
            <option>Select a Counselor</option>
            {counselors.map((counselor) => (
              <option key={counselor.id} value={counselor.name}>
                {counselor.name} ({counselor.expertise})
              </option>
            ))}
          </Form.Select>

          {/* Book Session */}
          <Button variant="primary" onClick={() => setShowModal(true)}>
            📅 Book Counseling Session
          </Button>

          {/* Feedback Button */}
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => setShowFeedback(true)}
          >
            🌟 Provide Feedback
          </Button>
        </Card.Body>
      </Card>

      {/* Modal for Booking Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your {sessionType} Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you ready to confirm your session with {selectedCounselor}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSessionBooking}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Feedback Modal */}
      <Modal show={showFeedback} onHide={() => setShowFeedback(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🌟 Provide Counseling Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="feedbackText">
            <Form.Label>How was your experience?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFeedback(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleFeedbackSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Counseling;
