const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  counselor: { type: mongoose.Schema.Types.ObjectId, ref: "Counselor", required: true },
  userName: { type: String, required: true },
  sessionTime: { type: String, required: true },
});

module.exports = mongoose.model("Session", SessionSchema);
