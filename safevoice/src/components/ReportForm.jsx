import React, { useState, useEffect } from "react";
import { Form, Button, Card, ProgressBar, Alert } from "react-bootstrap";
import axios from "axios";
import "../styles/app.css";

const Report = () => {
  const [step, setStep] = useState(1);
  const [reportData, setReportData] = useState({
    incidentType: "",
    description: "",
    location: "",
    evidence: null,
    contactPreference: "anonymous",
  });
  const [progress, setProgress] = useState(25);
  const [showSuccess, setShowSuccess] = useState(false);
  const [incidentCategories, setIncidentCategories] = useState([]);

  // Fetch Incident Types from Backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/report/categories") // Make sure this API endpoint is correct
      .then((res) => setIncidentCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setReportData({ ...reportData, evidence: e.target.files[0] });
    }
  };

  // Handle Next/Previous Step
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      setProgress(progress + 25);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(progress - 25);
    }
  };

  // Submit Report to Backend
  const handleSubmitReport = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("incidentType", reportData.incidentType);
    formData.append("description", reportData.description);
    formData.append("location", reportData.location);
    formData.append("contactPreference", reportData.contactPreference);

    // ✅ Only append file if it exists
    if (reportData.evidence) {
      formData.append("evidence", reportData.evidence);
    }

    // Log FormData to see what is actually being sent
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/report/submit",
        formData
      );

      console.log("Report Submitted Successfully:", response.data);
      setShowSuccess(true);
      setStep(1);
      setProgress(25);
      setReportData({
        incidentType: "",
        description: "",
        location: "",
        evidence: null,
        contactPreference: "anonymous",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      // Optional: Provide more details about the error response
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
      }
    }
  };

  return (
    <div className="report-container">
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          🎉 Your incident report has been submitted successfully!
        </Alert>
      )}
      <Card className="report-card">
        <Card.Header className="report-header">
          🚨 Report an Incident Anonymously
        </Card.Header>
        <Card.Body>
          <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />

          <Form onSubmit={handleSubmitReport} encType="multipart/form-data">
            {/* Step 1: Incident Details */}
            {step === 1 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>🔎 Incident Type</Form.Label>
                  <Form.Select
                    name="incidentType"
                    onChange={handleChange}
                    required
                    value={reportData.incidentType}
                  >
                    <option value="">Select Incident Type</option>
                    {incidentCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>📝 Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={reportData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button onClick={handleNext}>Next ➡️</Button>
              </>
            )}

            {/* Step 2: Location & Evidence */}
            {step === 2 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>📍 Location of Incident</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={reportData.location}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>📸 Upload Evidence (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    name="evidence"
                    onChange={handleFileChange}
                    accept="image/*,video/*,audio/*"
                  />
                </Form.Group>
                <Button onClick={handlePrev}>⬅️ Back</Button>
                <Button onClick={handleNext} className="ms-2">
                  Next ➡️
                </Button>
              </>
            )}

            {/* Step 3: Contact Preferences */}
            {step === 3 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>💬 Contact Preference</Form.Label>
                  <Form.Select
                    name="contactPreference"
                    value={reportData.contactPreference}
                    onChange={handleChange}
                  >
                    <option value="anonymous">🔒 Remain Anonymous</option>
                    <option value="email">📧 Email Updates</option>
                  </Form.Select>
                </Form.Group>
                <Button onClick={handlePrev}>⬅️ Back</Button>
                <Button onClick={handleNext} className="ms-2">
                  Next ➡️
                </Button>
              </>
            )}

            {/* Step 4: Confirm & Submit */}
            {step === 4 && (
              <>
                <h5 className="text-center">✅ Review and Submit</h5>
                <p>
                  Please verify the information before submitting. You can
                  download a PDF summary of your report.
                </p>
                <Button onClick={handlePrev}>⬅️ Back</Button>
                <Button type="submit" variant="success" className="ms-2">
                  🚨 Submit Report
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Report;
