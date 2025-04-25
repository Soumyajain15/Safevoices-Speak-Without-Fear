const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  counselor: {
    type: String,
    required: true
  },
  sessionType: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Session', SessionSchema);