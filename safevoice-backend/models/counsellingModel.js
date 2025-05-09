const mongoose = require("mongoose");

const counselingSchema = new mongoose.Schema({
  dateTime: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, default: "Pending" },
  bookedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Counseling", counselingSchema);
