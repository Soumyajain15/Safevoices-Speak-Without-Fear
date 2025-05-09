// counseling.jsx
import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Card, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";
import "../styles/app.css";

const Counseling = () => {
  const [showModal, setShowModal] = useState(false);
  const [sessionType, setSessionType] = useState("");
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [progress, setProgress] = useState(40);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch Counselor List
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/counseling/counselors")
      .then((res) => {
        setCounselors(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Book a Session
  const handleSessionBooking = async () => {
    try {
      await axios.post("http://localhost:5000/api/counseling/book-session", {
        counselor: selectedCounselor,
        sessionType,
        userId: "anonymous",
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
      await axios.post("http://localhost:5000/api/counseling/feedback", {
        counselor: selectedCounselor,
        feedback,
        rating,
      });
      alert("Thank you for your feedback! 🌟");
      setShowFeedback(false);
      setFeedback("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="counseling-container">
      {showSuccess && (
        <Alert variant="success">
          🎉 Your session has been booked successfully!
        </Alert>
      )}
      <Card className="counseling-card">
        <Card.Header className="counseling-header">
          🧠 Counseling Services & Emotional Support
        </Card.Header>
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

          <h5 className="mt-4">💡 Select Your Counselor:</h5>
          <Form.Select
            onChange={(e) => setSelectedCounselor(e.target.value)}
            className="mb-3"
          >
            <option>Select a Counselor</option>
            {counselors.map((counselor) => (
              <option key={counselor._id} value={counselor.name}>
                {counselor.name} ({counselor.expertise})
              </option>
            ))}
          </Form.Select>

          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            disabled={!sessionType || !selectedCounselor}
          >
            📅 Book Counseling Session
          </Button>

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

          <Form.Group controlId="rating" className="mt-3">
            <Form.Label>Rate your counselor (1-5 stars):</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
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
