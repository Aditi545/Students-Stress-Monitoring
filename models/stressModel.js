const mongoose = require('mongoose');

const stressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // This links the entry to a User
    required: true,
    ref: 'User'
  },
  stressLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  symptoms: {
    type: [String], // An array of strings like ["headache", "fatigue"]
    default: []
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

const Stress = mongoose.model('Stress', stressSchema);

module.exports = Stress;
