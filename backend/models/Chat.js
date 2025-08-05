import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  // Chat Participants
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  
  // Chat Type
  type: {
    type: String,
    enum: ['direct', 'group', 'mentorship'],
    default: 'direct'
  },
  
  // Chat Details
  name: {
    type: String,
    trim: true,
    maxlength: [100, 'Chat name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Chat description cannot exceed 500 characters']
  },
  
  // Group Chat Specific
  group: {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    members: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['admin', 'moderator', 'member'],
        default: 'member'
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }],
    maxMembers: {
      type: Number,
      default: 50
    }
  },
  
  // Mentorship Chat Specific
  mentorship: {
    connection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Connection'
    },
    subjects: [String]
  },
  
  // Messages
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    type: {
      type: String,
      enum: ['text', 'image', 'file', 'link', 'location', 'voice', 'video'],
      default: 'text'
    },
    file: {
      url: String,
      name: String,
      size: Number,
      mimeType: String
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    },
    edited: {
      type: Boolean,
      default: false
    },
    editedAt: Date,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date,
    readBy: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      readAt: {
        type: Date,
        default: Date.now
      }
    }],
    reactions: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      emoji: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Chat Settings
  settings: {
    notifications: {
      type: Boolean,
      default: true
    },
    mute: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      until: Date
    }],
    pinned: [{
      message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
      },
      pinnedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      pinnedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  
  // Chat Status
  isActive: {
    type: Boolean,
    default: true
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  
  // Last Activity
  lastMessage: {
    content: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: Date
  },
  
  // Unread Counts
  unreadCounts: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    count: {
      type: Number,
      default: 0
    },
    lastReadMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  }],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for message count
chatSchema.virtual('messageCount').get(function() {
  return this.messages ? this.messages.length : 0;
});

// Virtual for unread count for a specific user
chatSchema.virtual('getUnreadCount').get(function() {
  return function(userId) {
    const unreadData = this.unreadCounts.find(u => u.user.toString() === userId.toString());
    return unreadData ? unreadData.count : 0;
  };
});

// Indexes
chatSchema.index({ participants: 1 });
chatSchema.index({ type: 1 });
chatSchema.index({ 'lastMessage.timestamp': -1 });
chatSchema.index({ 'mentorship.connection': 1 });

// Pre-save middleware to update updatedAt
chatSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Pre-save middleware to validate participants
chatSchema.pre('save', function(next) {
  if (this.participants.length < 2) {
    return next(new Error('Chat must have at least 2 participants'));
  }
  
  if (this.type === 'direct' && this.participants.length !== 2) {
    return next(new Error('Direct chat must have exactly 2 participants'));
  }
  
  next();
});

// Static method to find chat by participants
chatSchema.statics.findByParticipants = function(participantIds) {
  return this.findOne({
    participants: { $all: participantIds, $size: participantIds.length },
    type: 'direct'
  });
};

// Static method to find chats for a user
chatSchema.statics.findByUser = function(userId) {
  return this.find({
    participants: userId,
    isActive: true
  }).populate('participants', 'firstName lastName email profilePicture');
};

// Instance method to add message
chatSchema.methods.addMessage = function(messageData) {
  this.messages.push(messageData);
  this.lastMessage = {
    content: messageData.content,
    sender: messageData.sender,
    timestamp: messageData.timestamp
  };
  
  // Update unread counts for other participants
  this.participants.forEach(participantId => {
    if (participantId.toString() !== messageData.sender.toString()) {
      const unreadData = this.unreadCounts.find(u => u.user.toString() === participantId.toString());
      if (unreadData) {
        unreadData.count += 1;
      } else {
        this.unreadCounts.push({
          user: participantId,
          count: 1
        });
      }
    }
  });
  
  return this.save();
};

// Instance method to mark messages as read
chatSchema.methods.markAsRead = function(userId, messageId = null) {
  const unreadData = this.unreadCounts.find(u => u.user.toString() === userId.toString());
  if (unreadData) {
    unreadData.count = 0;
    if (messageId) {
      unreadData.lastReadMessage = messageId;
    }
  }
  
  // Mark messages as read
  this.messages.forEach(message => {
    if (!message.readBy.find(r => r.user.toString() === userId.toString())) {
      message.readBy.push({
        user: userId,
        readAt: new Date()
      });
    }
  });
  
  return this.save();
};

// Instance method to add participant (for group chats)
chatSchema.methods.addParticipant = function(userId, role = 'member') {
  if (this.type !== 'group') {
    throw new Error('Can only add participants to group chats');
  }
  
  if (this.participants.includes(userId)) {
    throw new Error('User is already a participant');
  }
  
  if (this.group.members.length >= this.group.maxMembers) {
    throw new Error('Group has reached maximum member limit');
  }
  
  this.participants.push(userId);
  this.group.members.push({
    user: userId,
    role: role,
    joinedAt: new Date()
  });
  
  return this.save();
};

// Instance method to remove participant (for group chats)
chatSchema.methods.removeParticipant = function(userId) {
  if (this.type !== 'group') {
    throw new Error('Can only remove participants from group chats');
  }
  
  this.participants = this.participants.filter(p => p.toString() !== userId.toString());
  this.group.members = this.group.members.filter(m => m.user.toString() !== userId.toString());
  
  return this.save();
};

// Instance method to pin message
chatSchema.methods.pinMessage = function(messageId, userId) {
  const message = this.messages.id(messageId);
  if (!message) {
    throw new Error('Message not found');
  }
  
  this.settings.pinned.push({
    message: messageId,
    pinnedBy: userId,
    pinnedAt: new Date()
  });
  
  return this.save();
};

// Instance method to unpin message
chatSchema.methods.unpinMessage = function(messageId) {
  this.settings.pinned = this.settings.pinned.filter(p => p.message.toString() !== messageId.toString());
  return this.save();
};

const Chat = mongoose.model('Chat', chatSchema);

export default Chat; 