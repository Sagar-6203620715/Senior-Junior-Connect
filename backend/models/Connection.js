import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  // Connection Details
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Mentor is required']
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Mentee is required']
  },
  
  // Connection Status
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Request Details
  request: {
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Request initiator is required']
    },
    message: {
      type: String,
      maxlength: [500, 'Request message cannot exceed 500 characters'],
      required: [true, 'Request message is required']
    },
    subjects: [{
      type: String,
      required: [true, 'At least one subject is required']
    }],
    goals: [{
      type: String,
      maxlength: [200, 'Goal description cannot exceed 200 characters']
    }],
    preferredSchedule: {
      type: String,
      enum: ['weekdays', 'weekends', 'flexible', 'evenings'],
      default: 'flexible'
    },
    duration: {
      type: Number, // in months
      min: [1, 'Duration must be at least 1 month'],
      max: [12, 'Duration cannot exceed 12 months'],
      default: 3
    }
  },
  
  // Mentorship Details
  mentorship: {
    startDate: Date,
    endDate: Date,
    frequency: {
      type: String,
      enum: ['weekly', 'bi-weekly', 'monthly', 'on-demand'],
      default: 'weekly'
    },
    duration: {
      type: Number, // in minutes per session
      min: [30, 'Session duration must be at least 30 minutes'],
      max: [180, 'Session duration cannot exceed 3 hours'],
      default: 60
    },
    platform: {
      type: String,
      enum: ['video-call', 'voice-call', 'chat', 'in-person', 'hybrid'],
      default: 'video-call'
    },
    subjects: [{
      name: String,
      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
      },
      notes: String
    }]
  },
  
  // Sessions
  sessions: [{
    date: {
      type: Date,
      required: true
    },
    duration: {
      type: Number, // in minutes
      required: true
    },
    platform: {
      type: String,
      enum: ['video-call', 'voice-call', 'chat', 'in-person'],
      required: true
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
      default: 'scheduled'
    },
    topics: [String],
    notes: {
      mentor: String,
      mentee: String
    },
    rating: {
      mentor: {
        type: Number,
        min: 1,
        max: 5
      },
      mentee: {
        type: Number,
        min: 1,
        max: 5
      }
    },
    feedback: {
      mentor: String,
      mentee: String
    }
  }],
  
  // Progress Tracking
  progress: {
    overall: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    goals: [{
      description: String,
      completed: {
        type: Boolean,
        default: false
      },
      completionDate: Date
    }],
    milestones: [{
      title: String,
      description: String,
      targetDate: Date,
      completed: {
        type: Boolean,
        default: false
      },
      completionDate: Date
    }]
  },
  
  // Communication
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    type: {
      type: String,
      enum: ['text', 'file', 'link', 'image'],
      default: 'text'
    },
    fileUrl: String,
    read: {
      type: Boolean,
      default: false
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Resources
  resources: [{
    title: String,
    description: String,
    type: {
      type: String,
      enum: ['document', 'video', 'link', 'book', 'other'],
      required: true
    },
    url: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Reviews and Ratings
  reviews: {
    mentor: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: [500, 'Review comment cannot exceed 500 characters']
      },
      date: Date
    },
    mentee: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: [500, 'Review comment cannot exceed 500 characters']
      },
      date: Date
    }
  },
  
  // Notifications
  notifications: [{
    type: {
      type: String,
      enum: ['session-reminder', 'message', 'progress-update', 'goal-completed', 'milestone-reached'],
      required: true
    },
    title: String,
    message: String,
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    timestamp: {
      type: Date,
      default: Date.now
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

// Virtual for connection duration
connectionSchema.virtual('duration').get(function() {
  if (!this.mentorship.startDate || !this.mentorship.endDate) return null;
  const diffTime = Math.abs(this.mentorship.endDate - this.mentorship.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for next session
connectionSchema.virtual('nextSession').get(function() {
  if (!this.sessions || this.sessions.length === 0) return null;
  const upcomingSessions = this.sessions.filter(session => 
    session.date > new Date() && session.status === 'scheduled'
  );
  return upcomingSessions.length > 0 ? upcomingSessions[0] : null;
});

// Indexes
connectionSchema.index({ mentor: 1, mentee: 1 }, { unique: true });
connectionSchema.index({ status: 1 });
connectionSchema.index({ 'request.initiatedBy': 1 });
connectionSchema.index({ 'mentorship.startDate': 1 });
connectionSchema.index({ 'sessions.date': 1 });

// Pre-save middleware to update updatedAt
connectionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Pre-save middleware to validate mentor-mentee relationship
connectionSchema.pre('save', function(next) {
  if (this.mentor.toString() === this.mentee.toString()) {
    return next(new Error('Mentor and mentee cannot be the same person'));
  }
  next();
});

// Static method to find connections by user
connectionSchema.statics.findByUser = function(userId) {
  return this.find({
    $or: [{ mentor: userId }, { mentee: userId }]
  }).populate('mentor mentee', 'firstName lastName email profilePicture college branch yearOfStudy');
};

// Static method to find active connections
connectionSchema.statics.findActive = function() {
  return this.find({ status: 'accepted' })
    .populate('mentor mentee', 'firstName lastName email profilePicture college branch yearOfStudy');
};

// Instance method to add session
connectionSchema.methods.addSession = function(sessionData) {
  this.sessions.push(sessionData);
  return this.save();
};

// Instance method to add message
connectionSchema.methods.addMessage = function(messageData) {
  this.messages.push(messageData);
  return this.save();
};

// Instance method to update progress
connectionSchema.methods.updateProgress = function(progressData) {
  this.progress = { ...this.progress, ...progressData };
  return this.save();
};

// Instance method to add notification
connectionSchema.methods.addNotification = function(notificationData) {
  this.notifications.push(notificationData);
  return this.save();
};

const Connection = mongoose.model('Connection', connectionSchema);

export default Connection; 