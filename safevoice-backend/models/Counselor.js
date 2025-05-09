const mongoose = require("mongoose");
const CounselorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availableSlots: [{ type: String }], // Example: ["10:00 AM", "2:00 PM"]
});

module.exports = mongoose.model("Counselor", CounselorSchema);
