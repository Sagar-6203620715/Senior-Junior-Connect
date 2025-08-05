import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  
  // Profile Information
  profilePicture: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: ''
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    default: 'prefer-not-to-say'
  },
  
  // Academic Information
  studentType: {
    type: String,
    enum: ['senior', 'junior'],
    required: [true, 'Student type is required']
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: [true, 'College is required']
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    trim: true
  },
  yearOfStudy: {
    type: Number,
    required: [true, 'Year of study is required'],
    min: [1, 'Year of study must be at least 1'],
    max: [4, 'Year of study cannot exceed 4']
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true
  },
  cgpa: {
    type: Number,
    min: [0, 'CGPA cannot be negative'],
    max: [10, 'CGPA cannot exceed 10'],
    default: null
  },
  
  // Contact Information
  phoneNumber: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'],
    default: null
  },
  whatsappNumber: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit WhatsApp number'],
    default: null
  },
  
  // Skills and Interests
  skills: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  languages: [{
    type: String,
    trim: true
  }],
  
  // Social Links
  linkedin: {
    type: String,
    match: [/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, 'Please enter a valid LinkedIn URL'],
    default: null
  },
  github: {
    type: String,
    match: [/^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/, 'Please enter a valid GitHub URL'],
    default: null
  },
  portfolio: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
    default: null
  },
  
  // Preferences
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    },
    privacy: {
      profileVisibility: { type: String, enum: ['public', 'private', 'connections'], default: 'public' },
      showContactInfo: { type: Boolean, default: true },
      showAcademicInfo: { type: Boolean, default: true }
    },
    mentorship: {
      seekingMentorship: { type: Boolean, default: false },
      offeringMentorship: { type: Boolean, default: false },
      preferredSubjects: [String]
    }
  },
  
  // Account Status
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  
  // Authentication
  refreshToken: {
    type: String,
    default: null
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
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

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ college: 1, branch: 1, yearOfStudy: 1 });
userSchema.index({ studentType: 1 });
userSchema.index({ skills: 1 });
userSchema.index({ 'preferences.mentorship.seekingMentorship': 1 });
userSchema.index({ 'preferences.mentorship.offeringMentorship': 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to update updatedAt
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to get public profile
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.refreshToken;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpires;
  return userObject;
};

// Static method to find users by criteria
userSchema.statics.findByCriteria = function(criteria) {
  return this.find(criteria)
    .populate('college', 'name location')
    .select('-password -refreshToken');
};

const User = mongoose.model('User', userSchema);

export default User; 