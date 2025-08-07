import express from 'express';
import { body, validationResult } from 'express-validator';
import Chat from '../models/Chat.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// @desc    Get user's chats
// @route   GET /api/chat
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  const { type, page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  let query = { participants: req.user.id };
  if (type) {
    query.type = type;
  }

  const chats = await Chat.find(query)
    .populate('participants', 'firstName lastName avatar college role')
    .populate('lastMessage.sender', 'firstName lastName avatar')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ lastActivity: -1 });

  const total = await Chat.countDocuments(query);

  res.json({
    success: true,
    data: chats,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// @desc    Get chat by ID
// @route   GET /api/chat/:id
// @access  Private
router.get('/:id', asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id)
    .populate('participants', 'firstName lastName avatar college role')
    .populate('messages.sender', 'firstName lastName avatar')
    .populate('messages.replies.sender', 'firstName lastName avatar');

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  // Check if user is a participant
  if (!chat.participants.some(p => p._id.toString() === req.user.id)) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this chat'
    });
  }

  // Mark messages as read for this user
  chat.messages.forEach(message => {
    if (!message.reads.includes(req.user.id)) {
      message.reads.push(req.user.id);
    }
  });

  await chat.save();

  res.json({
    success: true,
    data: chat
  });
}));

// @desc    Create new chat
// @route   POST /api/chat
// @access  Private
router.post('/', [
  body('participants').isArray({ min: 1 }).withMessage('At least one participant is required'),
  body('participants.*').isMongoId().withMessage('Invalid participant ID'),
  body('type').isIn(['direct', 'group', 'mentorship']).withMessage('Type must be direct, group, or mentorship'),
  body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { participants, type, name, description } = req.body;

  // Add current user to participants if not already included
  if (!participants.includes(req.user.id)) {
    participants.push(req.user.id);
  }

  // For direct chats, ensure only 2 participants
  if (type === 'direct' && participants.length !== 2) {
    return res.status(400).json({
      success: false,
      message: 'Direct chats must have exactly 2 participants'
    });
  }

  // Check if direct chat already exists
  if (type === 'direct') {
    const existingChat = await Chat.findOne({
      type: 'direct',
      participants: { $all: participants, $size: participants.length }
    });

    if (existingChat) {
      return res.status(400).json({
        success: false,
        message: 'Direct chat already exists',
        data: existingChat
      });
    }
  }

  // Verify all participants exist
  const participantUsers = await User.find({ _id: { $in: participants } });
  if (participantUsers.length !== participants.length) {
    return res.status(400).json({
      success: false,
      message: 'One or more participants not found'
    });
  }

  const chatData = {
    participants,
    type,
    name: name || (type === 'direct' ? 
      `${participantUsers[0].firstName} & ${participantUsers[1].firstName}` : 
      'Group Chat'),
    description
  };

  const chat = await Chat.create(chatData);

  const populatedChat = await Chat.findById(chat._id)
    .populate('participants', 'firstName lastName avatar college role');

  res.status(201).json({
    success: true,
    data: populatedChat
  });
}));

// @desc    Send message
// @route   POST /api/chat/:id/messages
// @access  Private
router.post('/:id/messages', [
  body('content').trim().isLength({ min: 1, max: 2000 }).withMessage('Message must be between 1 and 2000 characters'),
  body('type').optional().isIn(['text', 'image', 'file', 'audio', 'video']).withMessage('Invalid message type'),
  body('file').optional().isObject().withMessage('File must be an object'),
  body('replyTo').optional().isMongoId().withMessage('Invalid reply message ID')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  // Check if user is a participant
  if (!chat.participants.includes(req.user.id)) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to send messages in this chat'
    });
  }

  const { content, type = 'text', file, replyTo } = req.body;

  const message = {
    sender: req.user.id,
    content,
    type,
    file,
    replyTo,
    timestamp: new Date(),
    reads: [req.user.id] // Sender has read their own message
  };

  chat.messages.push(message);
  chat.lastActivity = new Date();
  chat.lastMessage = {
    sender: req.user.id,
    content: content.length > 50 ? content.substring(0, 50) + '...' : content,
    timestamp: new Date()
  };

  // Update unread counts for other participants
  chat.participants.forEach(participantId => {
    if (participantId.toString() !== req.user.id) {
      const participantIndex = chat.unreadCounts.findIndex(
        uc => uc.user.toString() === participantId.toString()
      );
      if (participantIndex !== -1) {
        chat.unreadCounts[participantIndex].count += 1;
      } else {
        chat.unreadCounts.push({ user: participantId, count: 1 });
      }
    }
  });

  await chat.save();

  const populatedChat = await Chat.findById(chat._id)
    .populate('messages.sender', 'firstName lastName avatar')
    .populate('messages.replies.sender', 'firstName lastName avatar');

  const newMessage = populatedChat.messages[populatedChat.messages.length - 1];

  res.json({
    success: true,
    data: newMessage
  });
}));

// @desc    Edit message
// @route   PUT /api/chat/:id/messages/:messageId
// @access  Private
router.put('/:id/messages/:messageId', [
  body('content').trim().isLength({ min: 1, max: 2000 }).withMessage('Message must be between 1 and 2000 characters')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  const message = chat.messages.id(req.params.messageId);
  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  // Check if user is the message sender
  if (message.sender.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to edit this message'
    });
  }

  // Check if message is too old to edit (e.g., 15 minutes)
  const timeDiff = Date.now() - message.timestamp.getTime();
  if (timeDiff > 15 * 60 * 1000) {
    return res.status(400).json({
      success: false,
      message: 'Message is too old to edit'
    });
  }

  message.content = req.body.content;
  message.edited = true;
  message.editHistory = message.editHistory || [];
  message.editHistory.push({
    content: message.content,
    timestamp: new Date()
  });

  await chat.save();

  res.json({
    success: true,
    data: message
  });
}));

// @desc    Delete message
// @route   DELETE /api/chat/:id/messages/:messageId
// @access  Private
router.delete('/:id/messages/:messageId', asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  const message = chat.messages.id(req.params.messageId);
  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  // Check if user is the message sender or chat admin
  if (message.sender.toString() !== req.user.id && 
      !chat.admins.includes(req.user.id)) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this message'
    });
  }

  message.remove();
  await chat.save();

  res.json({
    success: true,
    message: 'Message deleted successfully'
  });
}));

// @desc    Mark messages as read
// @route   PUT /api/chat/:id/read
// @access  Private
router.put('/:id/read', asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  // Check if user is a participant
  if (!chat.participants.includes(req.user.id)) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this chat'
    });
  }

  // Mark all unread messages as read
  chat.messages.forEach(message => {
    if (!message.reads.includes(req.user.id)) {
      message.reads.push(req.user.id);
    }
  });

  // Reset unread count for this user
  const unreadIndex = chat.unreadCounts.findIndex(
    uc => uc.user.toString() === req.user.id
  );
  if (unreadIndex !== -1) {
    chat.unreadCounts[unreadIndex].count = 0;
  }

  await chat.save();

  res.json({
    success: true,
    message: 'Messages marked as read'
  });
}));

// @desc    Add reaction to message
// @route   POST /api/chat/:id/messages/:messageId/reactions
// @access  Private
router.post('/:id/messages/:messageId/reactions', [
  body('reaction').isIn(['👍', '👎', '❤️', '😊', '😮', '😢', '😡', '🎉', '👏', '🙏']).withMessage('Invalid reaction')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  const message = chat.messages.id(req.params.messageId);
  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  const { reaction } = req.body;

  // Remove existing reaction from this user
  message.reactions = message.reactions.filter(r => r.user.toString() !== req.user.id);

  // Add new reaction
  message.reactions.push({
    user: req.user.id,
    reaction,
    timestamp: new Date()
  });

  await chat.save();

  res.json({
    success: true,
    data: message.reactions
  });
}));

// @desc    Remove reaction from message
// @route   DELETE /api/chat/:id/messages/:messageId/reactions
// @access  Private
router.delete('/:id/messages/:messageId/reactions', asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  const message = chat.messages.id(req.params.messageId);
  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  // Remove user's reaction
  message.reactions = message.reactions.filter(r => r.user.toString() !== req.user.id);

  await chat.save();

  res.json({
    success: true,
    data: message.reactions
  });
}));

// @desc    Pin message
// @route   POST /api/chat/:id/messages/:messageId/pin
// @access  Private
router.post('/:id/messages/:messageId/pin', asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  const message = chat.messages.id(req.params.messageId);
  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  // Check if user is chat admin or message sender
  if (!chat.admins.includes(req.user.id) && 
      message.sender.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to pin this message'
    });
  }

  if (chat.pinnedMessages.includes(message._id)) {
    return res.status(400).json({
      success: false,
      message: 'Message is already pinned'
    });
  }

  chat.pinnedMessages.push(message._id);
  await chat.save();

  res.json({
    success: true,
    message: 'Message pinned successfully'
  });
}));

// @desc    Unpin message
// @route   DELETE /api/chat/:id/messages/:messageId/pin
// @access  Private
router.delete('/:id/messages/:messageId/pin', asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  // Check if user is chat admin
  if (!chat.admins.includes(req.user.id)) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to unpin messages'
    });
  }

  chat.pinnedMessages = chat.pinnedMessages.filter(
    msgId => msgId.toString() !== req.params.messageId
  );
  await chat.save();

  res.json({
    success: true,
    message: 'Message unpinned successfully'
  });
}));

// @desc    Update chat settings
// @route   PUT /api/chat/:id/settings
// @access  Private
router.put('/:id/settings', [
  body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('settings').optional().isObject().withMessage('Settings must be an object')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  // Check if user is chat admin
  if (!chat.admins.includes(req.user.id)) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update chat settings'
    });
  }

  const { name, description, settings } = req.body;

  if (name) chat.name = name;
  if (description) chat.description = description;
  if (settings) chat.settings = { ...chat.settings, ...settings };

  await chat.save();

  res.json({
    success: true,
    data: chat
  });
}));

// @desc    Leave chat
// @route   DELETE /api/chat/:id/leave
// @access  Private
router.delete('/:id/leave', asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat not found'
    });
  }

  // Check if user is a participant
  if (!chat.participants.includes(req.user.id)) {
    return res.status(403).json({
      success: false,
      message: 'Not a participant in this chat'
    });
  }

  // Remove user from participants
  chat.participants = chat.participants.filter(p => p.toString() !== req.user.id);
  chat.admins = chat.admins.filter(a => a.toString() !== req.user.id);

  // If no participants left, delete the chat
  if (chat.participants.length === 0) {
    await Chat.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: 'Chat deleted (no participants left)'
    });
  }

  // If user was the last admin, make the first participant an admin
  if (chat.admins.length === 0 && chat.participants.length > 0) {
    chat.admins.push(chat.participants[0]);
  }

  await chat.save();

  res.json({
    success: true,
    message: 'Left chat successfully'
  });
}));

export default router; 