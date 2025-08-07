import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import Connection from '../models/Connection.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
router.get('/me', asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({
    success: true,
    data: user
  });
}));

// @desc    Update current user profile
// @route   PUT /api/users/me
// @access  Private
router.put('/me', [
  body('firstName').optional().trim().isLength({ min: 1, max: 50 }).withMessage('First name must be between 1 and 50 characters'),
  body('lastName').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Last name must be between 1 and 50 characters'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  body('location').optional().trim().isLength({ max: 100 }).withMessage('Location must be less than 100 characters'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('interests').optional().isArray().withMessage('Interests must be an array'),
  body('socialLinks').optional().isObject().withMessage('Social links must be an object'),
  body('preferences').optional().isObject().withMessage('Preferences must be an object')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true, runValidators: true }
  ).select('-password');

  res.json({
    success: true,
    data: user
  });
}));

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password -email -phone -verificationToken -resetPasswordToken')
    .populate('college', 'name location');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
}));

// @desc    Search users
// @route   GET /api/users/search
// @access  Private
router.get('/search', [
  body('query').optional().trim().isLength({ min: 1 }).withMessage('Search query is required'),
  body('filters').optional().isObject().withMessage('Filters must be an object'),
  body('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  body('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
], asyncHandler(async (req, res) => {
  const { query, filters = {}, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  let searchQuery = { _id: { $ne: req.user.id } }; // Exclude current user

  // Text search
  if (query) {
    searchQuery.$or = [
      { firstName: { $regex: query, $options: 'i' } },
      { lastName: { $regex: query, $options: 'i' } },
      { bio: { $regex: query, $options: 'i' } },
      { skills: { $in: [new RegExp(query, 'i')] } }
    ];
  }

  // Apply filters
  if (filters.role) searchQuery.role = filters.role;
  if (filters.college) searchQuery.college = filters.college;
  if (filters.skills) searchQuery.skills = { $in: filters.skills };
  if (filters.location) searchQuery.location = { $regex: filters.location, $options: 'i' };
  if (filters.verified) searchQuery.isVerified = filters.verified === 'true';

  const users = await User.find(searchQuery)
    .select('-password -email -phone -verificationToken -resetPasswordToken')
    .populate('college', 'name location')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(searchQuery);

  res.json({
    success: true,
    data: users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// @desc    Get user connections
// @route   GET /api/users/:id/connections
// @access  Private
router.get('/:id/connections', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const connections = await Connection.find({
    $or: [
      { mentor: req.params.id },
      { mentee: req.params.id }
    ],
    status: 'accepted'
  })
    .populate('mentor', 'firstName lastName avatar college')
    .populate('mentee', 'firstName lastName avatar college')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ updatedAt: -1 });

  const total = await Connection.countDocuments({
    $or: [
      { mentor: req.params.id },
      { mentee: req.params.id }
    ],
    status: 'accepted'
  });

  res.json({
    success: true,
    data: connections,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// @desc    Get user recommendations
// @route   GET /api/users/recommendations
// @access  Private
router.get('/recommendations', asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  
  // Find users with similar skills and interests
  const recommendations = await User.find({
    _id: { $ne: req.user.id },
    role: currentUser.role === 'senior' ? 'junior' : 'senior',
    skills: { $in: currentUser.skills },
    isVerified: true
  })
    .select('-password -email -phone -verificationToken -resetPasswordToken')
    .populate('college', 'name location')
    .limit(10)
    .sort({ rating: -1, reviewCount: -1 });

  res.json({
    success: true,
    data: recommendations
  });
}));

// @desc    Follow/Unfollow user
// @route   POST /api/users/:id/follow
// @access  Private
router.post('/:id/follow', asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
    return res.status(400).json({
      success: false,
      message: 'You cannot follow yourself'
    });
  }

  const userToFollow = await User.findById(req.params.id);
  if (!userToFollow) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const currentUser = await User.findById(req.user.id);
  const isFollowing = currentUser.following.includes(req.params.id);

  if (isFollowing) {
    // Unfollow
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { following: req.params.id }
    });
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.user.id }
    });

    res.json({
      success: true,
      message: 'User unfollowed successfully',
      following: false
    });
  } else {
    // Follow
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { following: req.params.id }
    });
    await User.findByIdAndUpdate(req.params.id, {
      $addToSet: { followers: req.user.id }
    });

    res.json({
      success: true,
      message: 'User followed successfully',
      following: true
    });
  }
}));

// @desc    Get user followers
// @route   GET /api/users/:id/followers
// @access  Private
router.get('/:id/followers', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const user = await User.findById(req.params.id).populate({
    path: 'followers',
    select: '-password -email -phone -verificationToken -resetPasswordToken',
    populate: { path: 'college', select: 'name location' },
    options: { skip, limit: parseInt(limit) }
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const total = user.followers.length;

  res.json({
    success: true,
    data: user.followers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// @desc    Get user following
// @route   GET /api/users/:id/following
// @access  Private
router.get('/:id/following', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const user = await User.findById(req.params.id).populate({
    path: 'following',
    select: '-password -email -phone -verificationToken -resetPasswordToken',
    populate: { path: 'college', select: 'name location' },
    options: { skip, limit: parseInt(limit) }
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const total = user.following.length;

  res.json({
    success: true,
    data: user.following,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// @desc    Delete user account
// @route   DELETE /api/users/me
// @access  Private
router.delete('/me', asyncHandler(async (req, res) => {
  // Delete user's connections
  await Connection.deleteMany({
    $or: [
      { mentor: req.user.id },
      { mentee: req.user.id }
    ]
  });

  // Delete user
  await User.findByIdAndDelete(req.user.id);

  res.json({
    success: true,
    message: 'Account deleted successfully'
  });
}));

export default router; 