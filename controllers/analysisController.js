const Stress = require('../models/stressModel');

// @desc    Analyze a user's stress data
// @route   GET /api/analysis
const getAnalysis = async (req, res) => {
  try {
    console.log('Analysis controller called for user:', req.user.id);
    // 1. Fetch all stress entries for the logged-in user
    const entries = await Stress.find({ user: req.user.id }).sort({ createdAt: 'asc' });
    console.log('Found entries:', entries.length);

    if (entries.length < 3) {
      return res.json({
        message: "Not enough data to provide an analysis. Keep logging your stress levels!"
      });
    }

    // 2. Perform Calculations
    const totalEntries = entries.length;
    const averageStress = entries.reduce((acc, entry) => acc + entry.stressLevel, 0) / totalEntries;

    const recentEntries = entries.slice(-3); // Get the last 3 entries
    const recentAverageStress = recentEntries.reduce((acc, entry) => acc + entry.stressLevel, 0) / recentEntries.length;

    // 3. Apply Rules to Generate Insights
    const insights = [];

    // Rule 1: Trend detection
    if (recentAverageStress > averageStress + 1) {
      insights.push("Your stress levels have been trending higher recently. Take some time to reflect on what might have changed.");
    } else if (recentAverageStress < averageStress - 1) {
      insights.push("Great job! Your stress levels have been trending lower recently. Keep up the good work.");
    }

    // Rule 2: High stress alert
    const highStressCount = entries.filter(e => e.stressLevel > 7).length;
    if (highStressCount / totalEntries > 0.5) {
      insights.push("A significant number of your entries indicate high stress. Consider talking to a professional or a trusted friend.");
    }

    // You can add more rules here based on your dataset analysis (e.g., specific symptoms)

    // 4. Determine recent trend
    let recentTrend;
    if (recentAverageStress > averageStress + 1) {
      recentTrend = "📈 Increasing";
    } else if (recentAverageStress < averageStress - 1) {
      recentTrend = "📉 Decreasing";
    } else {
      recentTrend = "➡️ Stable";
    }

    // 5. Send the Response
    res.json({
      totalEntries,
      averageStress: parseFloat(averageStress.toFixed(1)),
      recentTrend,
      insights
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAnalysis };
