const express = require('express');
const router = express.Router();
const {
  getCounselors,
  bookSession,
  submitFeedback,
  getAvailableSessions
} = require('../controllers/counselingController');

// Counselor routes
router.get('/counselors', getCounselors);
router.post('/book-session', bookSession);
router.post('/feedback', submitFeedback);
router.get('/available-sessions', getAvailableSessions);

module.exports = router;