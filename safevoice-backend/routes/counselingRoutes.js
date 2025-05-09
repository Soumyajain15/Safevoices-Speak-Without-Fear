const express = require("express");
const router = express.Router();
const counselingController = require("../controllers/counselingController");

// Get all counselors
router.get("/counselors", counselingController.getCounselors);

// Book a session
router.post("/book-session", counselingController.bookSession);

// Submit feedback
router.post("/feedback", counselingController.submitFeedback);

// Get all available sessions
router.get("/available-sessions", counselingController.getAvailableSessions);

module.exports = router;
