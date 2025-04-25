import React, { useEffect, useState } from "react";
import { getIncidentCategories, submitIncidentReport } from "../services/api";
import { Form, Button, Alert } from "react-bootstrap";

const Report = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    evidence: null,
  });
  const [success, setSuccess] = useState(false);

  // Fetch Incident Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getIncidentCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    if (e.target.name === "evidence") {
      setFormData({ ...formData, evidence: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Submit Report
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("evidence", formData.evidence);

    try {
      await submitIncidentReport(formDataToSend);
      setSuccess(true);
      setFormData({
        category: "",
        description: "",
        evidence: null,
      });
    } catch (error) {
      console.error("Error submitting report.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Report an Incident</h2>
      {success && <Alert variant="success">Report submitted successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Incident Category</Form.Label>
          <Form.Select name="category" onChange={handleChange} value={formData.category} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Evidence (Optional)</Form.Label>
          <Form.Control type="file" name="evidence" onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Report
        </Button>
      </Form>
    </div>
  );
};

export default Report;
