const Report = require("../models/Report");

// Submit Report
exports.submitReport = async (req, res) => {
  try {
    const { incidentType, description, location, contactPreference } = req.body;
    const evidencePath = req.file ? req.file.path : "";

    const newReport = new Report({
      incidentType,
      description,
      location,
      evidencePath,
      contactPreference,
    });

    const report = await newReport.save();
    res.status(201).json(report);
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ error: "Error submitting report." });
  }
};

// ✅ Fix: Ensure category structure matches frontend expectations
exports.getIncidentCategories = (req, res) => {
  const categories = [
    { id: 1, name: "Physical Harassment" },
    { id: 2, name: "Verbal Threats" },
    { id: 3, name: "Online Harassment" },
    { id: 4, name: "Domestic Violence" },
  ];
  res.status(200).json(categories);
};
