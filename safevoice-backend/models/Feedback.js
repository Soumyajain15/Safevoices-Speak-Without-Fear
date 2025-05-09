const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  counselor: { type: mongoose.Schema.Types.ObjectId, ref: "Counselor", required: true },
  feedback: { type: String, required: true },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
