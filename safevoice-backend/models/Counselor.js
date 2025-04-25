const mongoose = require('mongoose');

const CounselorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  expertise: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  averageRating: {
    type: Number,
    default: 0
  },
  bio: String,
  imageUrl: String,
  languages: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Counselor', CounselorSchema);