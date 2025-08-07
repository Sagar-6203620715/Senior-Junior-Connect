import express from 'express';
import { body, validationResult } from 'express-validator';
import Connection from '../models/Connection.js';
import User from '../models/User.js';
import Chat from '../models/Chat.js';
import { protect, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// @desc    Get user's connections
// @route   GET /api/connections
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  let query = {
    $or: [
      { mentor: req.user.id },
      { mentee: req.user.id }
    ]
  };

  if (status) {
    query.status = status;
  }

  const connections = await Connection.find(query)
    .populate('mentor', 'firstName lastName avatar college role')
    .populate('mentee', 'firstName lastName avatar college role')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ updatedAt: -1 });

  const total = await Connection.countDocuments(query);

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

// @desc    Get connection by ID
// @route   GET /api/connections/:id
// @access  Private
router.get('/:id', asyncHandler(async (req, res) => {
  const connection = await Connection.findById(req.params.id)
    .populate('mentor', 'firstName lastName avatar college role skills bio')
    .populate('mentee', 'firstName lastName avatar college role skills bio');

  if (!connection) {
    return res.status(404).json({
      success: false,
      message: 'Connection not found'
    });
  }

  // Check if user is part of this connection
  if (connection.mentor._id.toString() !== req.user.id && 
      connection.mentee._id.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this connection'
    });
  }

  res.json({
    success: true,
    data: connection
  });
}));

// @desc    Send connection request
// @route   POST /api/connections
// @access  Private
router.post('/', [
  body('mentorId').isMongoId().withMessage('Please provide a valid mentor ID'),
  body('message').trim().isLength({ min: 10, max: 500 }).withMessage('Message must be between 10 and 500 characters'),
  body('goals').optional().isArray().withMessage('Goals must be an array'),
  body('preferredSchedule').optional().isObject().withMessage('Preferred schedule must be an object'),
  body('topics').optional().isArray().withMessage('Topics must be an array')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { mentorId, message, goals, preferredSchedule, topics } = req.body;

  // Check if user is trying to connect with themselves
  if (mentorId === req.user.id) {
    return res.status(400).json({
      success: false,
      message: 'You cannot send a connection request to yourself'
    });
  }

  // Check if mentor exists and is actually a senior
  const mentor = await User.findById(mentorId);
  if (!mentor) {
    return res.status(404).json({
      success: false,
      message: 'Mentor not found'
    });
  }

  if (mentor.role !== 'senior') {
    return res.status(400).json({
      success: false,
      message: 'User is not a senior/mentor'
    });
  }

  // Check if current user is a junior
  const currentUser = await User.findById(req.user.id);
  if (currentUser.role !== 'junior') {
    return res.status(400).json({
      success: false,
      message: 'Only juniors can send connection requests'
    });
  }

  // Check if connection already exists
  const existingConnection = await Connection.findOne({
    mentor: mentorId,
    mentee: req.user.id
  });

  if (existingConnection) {
    return res.status(400).json({
      success: false,
      message: 'Connection request already exists'
    });
  }

  // Create connection request
  const connection = await Connection.create({
    mentor: mentorId,
    mentee: req.user.id,
    status: 'pending',
    request: {
      message,
      goals,
      preferredSchedule,
      topics
    }
  });

  const populatedConnection = await Connection.findById(connection._id)
    .populate('mentor', 'firstName lastName avatar college role')
    .populate('mentee', 'firstName lastName avatar college role');

  res.status(201).json({
    success: true,
    data: populatedConnection
  });
}));

// @desc    Accept connection request
// @route   PUT /api/connections/:id/accept
// @access  Private
router.put('/:id/accept', [
  body('message').optional().trim().isLength({ max: 500 }).withMessage('Message must be less than 500 characters'),
  body('schedule').optional().isObject().withMessage('Schedule must be an object'),
  body('expectations').optional().isArray().withMessage('Expectations must be an array')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const connection = await Connection.findById(req.params.id);
  if (!connection) {
    return res.status(404).json({
      success: false,
      message: 'Connection not found'
    });
  }

  // Check if user is the mentor
  if (connection.mentor.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Only the mentor can accept connection requests'
    });
  }

  if (connection.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'Connection request is not pending'
    });
  }

  // Update connection status and add mentor response
  connection.status = 'accepted';
  connection.mentorResponse = {
    message: req.body.message,
    schedule: req.body.schedule,
    expectations: req.body.expectations,
    respondedAt: new Date()
  };

  // Create a chat for this connection
  const chat = await Chat.create({
    participants: [connection.mentor, connection.mentee],
    type: 'mentorship',
    name: `Mentorship: ${connection.mentor} & ${connection.mentee}`,
    mentorshipDetails: {
      connectionId: connection._id,
      startDate: new Date()
    }
  });

  connection.chat = chat._id;
  await connection.save();

  const populatedConnection = await Connection.findById(connection._id)
    .populate('mentor', 'firstName lastName avatar college role')
    .populate('mentee', 'firstName lastName avatar college role')
    .populate('chat', 'name type');

  res.json({
    success: true,
    data: populatedConnection
  });
}));

// @desc    Reject connection request
// @route   PUT /api/connections/:id/reject
// @access  Private
router.put('/:id/reject', [
  body('reason').optional().trim().isLength({ max: 500 }).withMessage('Reason must be less than 500 characters')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const connection = await Connection.findById(req.params.id);
  if (!connection) {
    return res.status(404).json({
      success: false,
      message: 'Connection not found'
    });
  }

  // Check if user is the mentor
  if (connection.mentor.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Only the mentor can reject connection requests'
    });
  }

  if (connection.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'Connection request is not pending'
    });
  }

  connection.status = 'rejected';
  connection.mentorResponse = {
    message: req.body.reason || 'Connection request rejected',
    respondedAt: new Date()
  };

  await connection.save();

  const populatedConnection = await Connection.findById(connection._id)
    .populate('mentor', 'firstName lastName avatar college role')
    .populate('mentee', 'firstName lastName avatar college role');

  res.json({
    success: true,
    data: populatedConnection
  });
}));

// @desc    Cancel connection request
// @route   PUT /api/connections/:id/cancel
// @access  Private
router.put('/:id/cancel', asyncHandler(async (req, res) => {
  const connection = await Connection.findById(req.params.id);
  if (!connection) {
    return res.status(404).json({
      success: false,
      message: 'Connection not found'
    });
  }

  // Check if user is the mentee
  if (connection.mentee.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Only the mentee can cancel connection requests'
    });
  }

  if (connection.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'Connection request is not pending'
    });
  }

  await Connection.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Connection request cancelled successfully'
  });
}));

// @desc    End connection
// @route   PUT /api/connections/:id/end
// @access  Private
router.put('/:id/end', [
  body('reason').optional().trim().isLength({ max: 500 }).withMessage('Reason must be less than 500 characters'),
  body('feedback').optional().trim().isLength({ max: 1000 }).withMessage('Feedback must be less than 1000 characters')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const connection = await Connection.findById(req.params.id);
  if (!connection) {
    return res.status(404).json({
      success: false,
      message: 'Connection not found'
    });
  }

  // Check if user is part of this connection
  if (connection.mentor.toString() !== req.user.id && 
      connection.mentee.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to end this connection'
    });
  }

  if (connection.status !== 'accepted') {
    return res.status(400).json({
      success: false,
      message: 'Connection is not active'
    });
  }

  connection.status = 'ended';
  connection.endDate = new Date();
  connection.endReason = req.body.reason;
  connection.feedback = req.body.feedback;

  await connection.save();

  const populatedConnection = await Connection.findById(connection._id)
    .populate('mentor', 'firstName lastName avatar college role')
    .populate('mentee', 'firstName lastName avatar college role');

  res.json({
    success: true,
    data: populatedConnection
  });
}));

// @desc    Add mentorship session
// @route   POST /api/connections/:id/sessions
// @access  Private
router.post('/:id/sessions', [
  body('date').isISO8601().withMessage('Please provide a valid date'),
  body('duration').isInt({ min: 15, max: 480 }).withMessage('Duration must be between 15 and 480 minutes'),
  body('topic').trim().isLength({ min: 1, max: 200 }).withMessage('Topic must be between 1 and 200 characters'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes must be less than 1000 characters'),
  body('goals').optional().isArray().withMessage('Goals must be an array')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const connection = await Connection.findById(req.params.id);
  if (!connection) {
    return res.status(404).json({
      success: false,
      message: 'Connection not found'
    });
  }

  // Check if user is part of this connection
  if (connection.mentor.toString() !== req.user.id && 
      connection.mentee.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to add sessions to this connection'
    });
  }

  if (connection.status !== 'accepted') {
    return res.status(400).json({
      success: false,
      message: 'Connection is not active'
    });
  }

  const session = {
    date: new Date(req.body.date),
    duration: req.body.duration,
    topic: req.body.topic,
    notes: req.body.notes,
    goals: req.body.goals,
    addedBy: req.user.id
  };

  connection.sessions.push(session);
  await connection.save();

  res.json({
    success: true,
    data: session
  });
}));

// @desc    Update mentorship session
// @route   PUT /api/connections/:id/sessions/:sessionId
// @access  Private
router.put('/:id/sessions/:sessionId', [
  body('date').optional().isISO8601().withMessage('Please provide a valid date'),
  body('duration').optional().isInt({ min: 15, max: 480 }).withMessage('Duration must be between 15 and 480 minutes'),
  body('topic').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Topic must be between 1 and 200 characters'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes must be less than 1000 characters'),
  body('goals').optional().isArray().withMessage('Goals must be an array'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const connection = await Connection.findById(req.params.id);
  if (!connection) {
    return res.status(404).json({
      success: false,
      message: 'Connection not found'
    });
  }

  // Check if user is part of this connection
  if (connection.mentor.toString() !== req.user.id && 
      connection.mentee.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update sessions in this connection'
    });
  }

  const session = connection.sessions.id(req.params.sessionId);
  if (!session) {
    return res.status(404).json({
      success: false,
      message: 'Session not found'
    });
  }

  // Update session fields
  Object.keys(req.body).forEach(key => {
    if (req.body[key] !== undefined) {
      session[key] = req.body[key];
    }
  });

  await connection.save();

  res.json({
    success: true,
    data: session
  });
}));

// @desc    Delete mentorship session
// @route   DELETE /api/connections/:id/sessions/:sessionId
// @access  Private
router.delete('/:id/sessions/:sessionId', asyncHandler(async (req, res) => {
  const connection = await Connection.findById(req.params.id);
  if (!connection) {
    return res.status(404).json({
      success: false,
      message: 'Connection not found'
    });
  }

  // Check if user is part of this connection
  if (connection.mentor.toString() !== req.user.id && 
      connection.mentee.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete sessions from this connection'
    });
  }

  const session = connection.sessions.id(req.params.sessionId);
  if (!session) {
    return res.status(404).json({
      success: false,
      message: 'Session not found'
    });
  }

  session.remove();
  await connection.save();

  res.json({
    success: true,
    message: 'Session deleted successfully'
  });
}));

// @desc    Add progress update
// @route   POST /api/connections/:id/progress
// @access  Private
router.post('/:id/progress', [
  body('milestone').trim().isLength({ min: 1, max: 200 }).withMessage('Milestone must be between 1 and 200 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('achievement').optional().isBoolean().withMessage('Achievement must be a boolean'),
  body('date').optional().isISO8601().withMessage('Please provide a valid date')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const connection = await Connection.findById(req.params.id);
  if (!connection) {
    return res.status(404).json({
      success: false,
      message: 'Connection not found'
    });
  }

  // Check if user is part of this connection
  if (connection.mentor.toString() !== req.user.id && 
      connection.mentee.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to add progress to this connection'
    });
  }

  const progress = {
    milestone: req.body.milestone,
    description: req.body.description,
    achievement: req.body.achievement || false,
    date: req.body.date ? new Date(req.body.date) : new Date(),
    addedBy: req.user.id
  };

  connection.progress.push(progress);
  await connection.save();

  res.json({
    success: true,
    data: progress
  });
}));

export default router; 