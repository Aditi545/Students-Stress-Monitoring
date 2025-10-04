const Stress = require('../models/stressModel');

// @desc    Create a new stress entry
// @route   POST /api/stress
const createStressEntry = async (req, res) => {
  console.log('Create stress entry called with:', req.body);
  const { stressLevel, symptoms, notes } = req.body;

  try {
    const entry = new Stress({
      user: req.user.id, // The user ID comes from the authMiddleware
      stressLevel,
      symptoms,
      notes
    });

    const createdEntry = await entry.save();
    res.status(201).json(createdEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all stress entries for a user
// @route   GET /api/stress
const getStressEntries = async (req, res) => {
  try {
    const entries = await Stress.find({ user: req.user.id });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createStressEntry, getStressEntries };
