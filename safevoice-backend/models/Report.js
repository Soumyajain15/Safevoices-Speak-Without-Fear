const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    incidentType: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    evidencePath: { type: String },
    contactPreference: { type: String, default: "anonymous" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
