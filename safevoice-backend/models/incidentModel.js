const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  description: { type: String, required: true },
  dateReported: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Incident", incidentSchema);
