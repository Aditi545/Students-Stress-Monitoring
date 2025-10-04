const Feedback = require('../models/feedbackModel');

// 🎨 Create Feedback Entry
const createFeedback = async (req, res) => {
  try {
    console.log('📝 Creating feedback entry:', req.body);
    
    const { rating, category, title, message, priority, tags } = req.body;
    
    // Validate required fields
    if (!rating || !category || !title || !message) {
      return res.status(400).json({
        success: false,
        message: "❌ Missing required fields",
        required: ['rating', 'category', 'title', 'message']
      });
    }

    // Create feedback entry
    const feedback = await Feedback.create({
      user: req.user.id,
      rating,
      category,
      title,
      message,
      priority: priority || 'Medium',
      tags: tags || []
    });

    // Populate user details for response
    await feedback.populate('user', 'username email');

    res.status(201).json({
      success: true,
      message: "✅ Feedback submitted successfully!",
      data: {
        id: feedback._id,
        rating: feedback.rating,
        category: feedback.category,
        title: feedback.title,
        status: feedback.status,
        priority: feedback.priority,
        createdAt: feedback.createdAt
      }
    });

  } catch (error) {
    console.error('🚨 Feedback creation error:', error);
    res.status(500).json({
      success: false,
      message: "❌ Server Error",
      error: error.message
    });
  }
};

// 🎨 Get User's Feedback History
const getUserFeedback = async (req, res) => {
  try {
    console.log('📋 Fetching feedback for user:', req.user.id);
    
    const { page = 1, limit = 10, status, category } = req.query;
    
    // Build filter object
    const filter = { user: req.user.id };
    if (status) filter.status = status;
    if (category) filter.category = category;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    const feedback = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-user'); // Exclude user details for privacy

    const total = await Feedback.countDocuments(filter);

    res.json({
      success: true,
      message: "📋 Feedback history retrieved",
      data: {
        feedback,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count: feedback.length,
          totalRecords: total
        }
      }
    });

  } catch (error) {
    console.error('🚨 Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: "❌ Server Error",
      error: error.message
    });
  }
};

// 🎨 Get Feedback Statistics
const getFeedbackStats = async (req, res) => {
  try {
    console.log('📊 Generating feedback statistics for user:', req.user.id);
    
    const stats = await Feedback.aggregate([
      { $match: { user: req.user.id } },
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          categoryStats: {
            $push: {
              category: '$category',
              rating: '$rating',
              status: '$status'
            }
          }
        }
      }
    ]);

    // Get category breakdown
    const categoryBreakdown = await Feedback.aggregate([
      { $match: { user: req.user.id } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    // Get status breakdown
    const statusBreakdown = await Feedback.aggregate([
      { $match: { user: req.user.id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      message: "📊 Feedback statistics generated",
      data: {
        overview: stats[0] || {
          totalFeedback: 0,
          averageRating: 0,
          categoryStats: []
        },
        categoryBreakdown,
        statusBreakdown
      }
    });

  } catch (error) {
    console.error('🚨 Error generating stats:', error);
    res.status(500).json({
      success: false,
      message: "❌ Server Error",
      error: error.message
    });
  }
};

// 🎨 Update Feedback Status (Admin function)
const updateFeedbackStatus = async (req, res) => {
  try {
    console.log('🔄 Updating feedback status:', req.params.id);
    
    const { status, adminResponse } = req.body;
    const feedbackId = req.params.id;

    const feedback = await Feedback.findOneAndUpdate(
      { _id: feedbackId, user: req.user.id },
      { 
        status: status || 'In Review',
        adminResponse: adminResponse || null
      },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "❌ Feedback not found"
      });
    }

    res.json({
      success: true,
      message: "✅ Feedback status updated",
      data: {
        id: feedback._id,
        status: feedback.status,
        adminResponse: feedback.adminResponse,
        updatedAt: feedback.updatedAt
      }
    });

  } catch (error) {
    console.error('🚨 Error updating feedback:', error);
    res.status(500).json({
      success: false,
      message: "❌ Server Error",
      error: error.message
    });
  }
};

module.exports = {
  createFeedback,
  getUserFeedback,
  getFeedbackStats,
  updateFeedbackStatus
};
