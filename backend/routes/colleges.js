import express from 'express';
import { body, validationResult } from 'express-validator';
import College from '../models/College.js';
import User from '../models/User.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// @desc    Get all colleges
// @route   GET /api/colleges
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = 'name', order = 'asc' } = req.query;
  const skip = (page - 1) * limit;

  const sortOptions = {};
  sortOptions[sort] = order === 'desc' ? -1 : 1;

  const colleges = await College.find()
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sortOptions);

  const total = await College.countDocuments();

  res.json({
    success: true,
    data: colleges,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// @desc    Get college by ID
// @route   GET /api/colleges/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);

  if (!college) {
    return res.status(404).json({
      success: false,
      message: 'College not found'
    });
  }

  res.json({
    success: true,
    data: college
  });
}));

// @desc    Search colleges
// @route   GET /api/colleges/search
// @access  Public
router.get('/search', asyncHandler(async (req, res) => {
  const { query, location, ranking, programs, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  let searchQuery = {};

  // Text search
  if (query) {
    searchQuery.$or = [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { programs: { $in: [new RegExp(query, 'i')] } }
    ];
  }

  // Location filter
  if (location) {
    searchQuery['location.city'] = { $regex: location, $options: 'i' };
  }

  // Ranking filter
  if (ranking) {
    searchQuery['rankings.national'] = { $lte: parseInt(ranking) };
  }

  // Programs filter
  if (programs) {
    const programArray = programs.split(',');
    searchQuery.programs = { $in: programArray };
  }

  const colleges = await College.find(searchQuery)
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ 'rankings.national': 1, name: 1 });

  const total = await College.countDocuments(searchQuery);

  res.json({
    success: true,
    data: colleges,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// @desc    Get top colleges
// @route   GET /api/colleges/top
// @access  Public
router.get('/top', asyncHandler(async (req, res) => {
  const { limit = 10, category } = req.query;

  let sortQuery = {};
  if (category === 'national') {
    sortQuery = { 'rankings.national': 1 };
  } else if (category === 'international') {
    sortQuery = { 'rankings.international': 1 };
  } else {
    sortQuery = { 'rankings.national': 1 };
  }

  const colleges = await College.find()
    .sort(sortQuery)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: colleges
  });
}));

// @desc    Get college students
// @route   GET /api/colleges/:id/students
// @access  Private
router.get('/:id/students', protect, asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role } = req.query;
  const skip = (page - 1) * limit;

  let query = { college: req.params.id };
  if (role) {
    query.role = role;
  }

  const students = await User.find(query)
    .select('-password -email -phone -verificationToken -resetPasswordToken')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  res.json({
    success: true,
    data: students,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// @desc    Get college statistics
// @route   GET /api/colleges/:id/stats
// @access  Public
router.get('/:id/stats', asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);
  
  if (!college) {
    return res.status(404).json({
      success: false,
      message: 'College not found'
    });
  }

  // Get user statistics
  const totalStudents = await User.countDocuments({ college: req.params.id });
  const seniors = await User.countDocuments({ college: req.params.id, role: 'senior' });
  const juniors = await User.countDocuments({ college: req.params.id, role: 'junior' });
  const verifiedUsers = await User.countDocuments({ college: req.params.id, isVerified: true });

  const stats = {
    college: {
      name: college.name,
      location: college.location,
      ranking: college.rankings,
      programs: college.programs.length,
      faculty: college.faculty.count,
      students: college.students.count
    },
    platform: {
      totalStudents,
      seniors,
      juniors,
      verifiedUsers,
      verificationRate: totalStudents > 0 ? (verifiedUsers / totalStudents * 100).toFixed(1) : 0
    }
  };

  res.json({
    success: true,
    data: stats
  });
}));

// @desc    Create new college (Admin only)
// @route   POST /api/colleges
// @access  Private/Admin
router.post('/', [
  protect,
  authorize('admin'),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('College name must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
  body('location').isObject().withMessage('Location must be an object'),
  body('location.address').trim().isLength({ min: 5, max: 200 }).withMessage('Address must be between 5 and 200 characters'),
  body('location.city').trim().isLength({ min: 2, max: 50 }).withMessage('City must be between 2 and 50 characters'),
  body('location.state').trim().isLength({ min: 2, max: 50 }).withMessage('State must be between 2 and 50 characters'),
  body('location.country').trim().isLength({ min: 2, max: 50 }).withMessage('Country must be between 2 and 50 characters'),
  body('location.zipCode').optional().trim().isLength({ max: 20 }).withMessage('Zip code must be less than 20 characters'),
  body('contact.email').optional().isEmail().withMessage('Please provide a valid email'),
  body('contact.phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('contact.website').optional().isURL().withMessage('Please provide a valid website URL'),
  body('academic.yearFounded').optional().isInt({ min: 1800, max: new Date().getFullYear() }).withMessage('Year founded must be a valid year'),
  body('academic.accreditation').optional().isArray().withMessage('Accreditation must be an array'),
  body('rankings.national').optional().isInt({ min: 1 }).withMessage('National ranking must be a positive integer'),
  body('rankings.international').optional().isInt({ min: 1 }).withMessage('International ranking must be a positive integer'),
  body('programs').isArray().withMessage('Programs must be an array'),
  body('faculty.count').optional().isInt({ min: 0 }).withMessage('Faculty count must be a non-negative integer'),
  body('students.count').optional().isInt({ min: 0 }).withMessage('Student count must be a non-negative integer'),
  body('images').optional().isArray().withMessage('Images must be an array')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const college = await College.create(req.body);

  res.status(201).json({
    success: true,
    data: college
  });
}));

// @desc    Update college (Admin only)
// @route   PUT /api/colleges/:id
// @access  Private/Admin
router.put('/:id', [
  protect,
  authorize('admin'),
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('College name must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
  body('location').optional().isObject().withMessage('Location must be an object'),
  body('contact.email').optional().isEmail().withMessage('Please provide a valid email'),
  body('contact.phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('contact.website').optional().isURL().withMessage('Please provide a valid website URL'),
  body('academic.yearFounded').optional().isInt({ min: 1800, max: new Date().getFullYear() }).withMessage('Year founded must be a valid year'),
  body('rankings.national').optional().isInt({ min: 1 }).withMessage('National ranking must be a positive integer'),
  body('rankings.international').optional().isInt({ min: 1 }).withMessage('International ranking must be a positive integer'),
  body('programs').optional().isArray().withMessage('Programs must be an array'),
  body('faculty.count').optional().isInt({ min: 0 }).withMessage('Faculty count must be a non-negative integer'),
  body('students.count').optional().isInt({ min: 0 }).withMessage('Student count must be a non-negative integer')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const college = await College.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!college) {
    return res.status(404).json({
      success: false,
      message: 'College not found'
    });
  }

  res.json({
    success: true,
    data: college
  });
}));

// @desc    Delete college (Admin only)
// @route   DELETE /api/colleges/:id
// @access  Private/Admin
router.delete('/:id', [
  protect,
  authorize('admin')
], asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);

  if (!college) {
    return res.status(404).json({
      success: false,
      message: 'College not found'
    });
  }

  // Check if there are users associated with this college
  const userCount = await User.countDocuments({ college: req.params.id });
  if (userCount > 0) {
    return res.status(400).json({
      success: false,
      message: `Cannot delete college. ${userCount} users are still associated with this college.`
    });
  }

  await College.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'College deleted successfully'
  });
}));

// @desc    Add college image (Admin only)
// @route   POST /api/colleges/:id/images
// @access  Private/Admin
router.post('/:id/images', [
  protect,
  authorize('admin'),
  body('imageUrl').isURL().withMessage('Please provide a valid image URL'),
  body('caption').optional().trim().isLength({ max: 200 }).withMessage('Caption must be less than 200 characters'),
  body('type').optional().isIn(['campus', 'building', 'event', 'other']).withMessage('Type must be one of: campus, building, event, other')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const college = await College.findById(req.params.id);
  if (!college) {
    return res.status(404).json({
      success: false,
      message: 'College not found'
    });
  }

  college.images.push(req.body);
  await college.save();

  res.json({
    success: true,
    data: college.images[college.images.length - 1]
  });
}));

// @desc    Remove college image (Admin only)
// @route   DELETE /api/colleges/:id/images/:imageId
// @access  Private/Admin
router.delete('/:id/images/:imageId', [
  protect,
  authorize('admin')
], asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);
  if (!college) {
    return res.status(404).json({
      success: false,
      message: 'College not found'
    });
  }

  const imageIndex = college.images.findIndex(img => img._id.toString() === req.params.imageId);
  if (imageIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Image not found'
    });
  }

  college.images.splice(imageIndex, 1);
  await college.save();

  res.json({
    success: true,
    message: 'Image removed successfully'
  });
}));

export default router; 