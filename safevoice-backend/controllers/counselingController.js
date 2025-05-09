const Counselor = require("../models/Counselor");
const Session = require("../models/Session");
const Feedback = require("../models/Feedback");

exports.getCounselors = async (req, res) => {
  try {
    const counselors = await Counselor.find();
    res.json(counselors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bookSession = async (req, res) => {
  try {
    const { counselorId, userName, sessionTime } = req.body;
    if (!counselorId || !userName || !sessionTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const session = new Session({ counselor: counselorId, userName, sessionTime });
    await session.save();
    res.status(201).json({ message: "Session booked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { counselorId, feedback } = req.body;
    if (!counselorId || !feedback) {
      return res.status(400).json({ message: "Counselor and feedback are required" });
    }

    const newFeedback = new Feedback({ counselor: counselorId, feedback });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailableSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("counselor");
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
