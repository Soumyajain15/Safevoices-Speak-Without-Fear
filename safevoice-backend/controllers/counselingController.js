const Counselor = require('../models/Counselor');
const Session = require('../models/Session');
const Feedback = require('../models/Feedback');

// @desc    Get all available counselors
// @route   GET /api/counseling/counselors
// @access  Public
const getCounselors = async (req, res) => {
  try {
    const counselors = await Counselor.find({ available: true });
    res.json(counselors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Book a counseling session
// @route   POST /api/counseling/book-session
// @access  Public
const bookSession = async (req, res) => {
  const { counselor, sessionType, userId } = req.body;

  try {
    // Check if counselor exists and is available
    const counselorExists = await Counselor.findOne({ 
      name: counselor, 
      available: true 
    });

    if (!counselorExists) {
      return res.status(400).json({ msg: 'Counselor not available' });
    }

    const newSession = new Session({
      counselor,
      sessionType,
      userId: userId || 'anonymous'
    });

    const session = await newSession.save();
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Submit feedback
// @route   POST /api/counseling/feedback
// @access  Public
const submitFeedback = async (req, res) => {
  const { counselor, feedback, rating } = req.body;

  try {
    const newFeedback = new Feedback({
      counselor,
      feedback,
      rating: rating || 5
    });

    await newFeedback.save();
    
    // Update counselor's average rating
    await updateCounselorRating(counselor);
    
    res.json({ msg: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Helper function to update counselor rating
const updateCounselorRating = async (counselorName) => {
  const feedbacks = await Feedback.find({ counselor: counselorName });
  const avgRating = feedbacks.reduce((acc, item) => acc + item.rating, 0) / feedbacks.length;
  
  await Counselor.findOneAndUpdate(
    { name: counselorName },
    { $set: { averageRating: avgRating } },
    { new: true }
  );
};

// @desc    Get available session times
// @route   GET /api/counseling/available-sessions
// @access  Public
const getAvailableSessions = async (req, res) => {
  try {
    // This would be more complex in a real app with actual scheduling
    const availableTimes = generateAvailableTimes();
    res.json(availableTimes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Helper function to generate sample available times
const generateAvailableTimes = () => {
  const times = [];
  const now = new Date();
  
  for (let i = 1; i <= 5; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    times.push({
      date: date.toISOString().split('T')[0],
      slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
    });
  }
  
  return times;
};

module.exports = {
  getCounselors,
  bookSession,
  submitFeedback,
  getAvailableSessions
};