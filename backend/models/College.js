import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    unique: true
  },
  shortName: {
    type: String,
    trim: true,
    required: [true, 'College short name is required']
  },
  code: {
    type: String,
    unique: true,
    required: [true, 'College code is required'],
    uppercase: true,
    trim: true
  },
  
  // Location Information
  location: {
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    country: {
      type: String,
      default: 'India',
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode'],
      required: [true, 'Pincode is required']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  // Contact Information
  contact: {
    phone: {
      type: String,
      match: [/^[0-9+\-\s()]+$/, 'Please enter a valid phone number'],
      required: [true, 'Phone number is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    website: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please enter a valid website URL'],
      required: [true, 'Website is required']
    }
  },
  
  // Academic Information
  type: {
    type: String,
    enum: ['IIT', 'NIT', 'IIIT', 'Government', 'Private', 'Deemed University', 'Central University'],
    required: [true, 'College type is required']
  },
  category: {
    type: String,
    enum: ['Engineering', 'Medical', 'Arts', 'Commerce', 'Science', 'Mixed'],
    default: 'Engineering'
  },
  establishedYear: {
    type: Number,
    required: [true, 'Established year is required'],
    min: [1800, 'Established year must be after 1800'],
    max: [new Date().getFullYear(), 'Established year cannot be in the future']
  },
  
  // Rankings and Recognition
  rankings: {
    nirf: {
      rank: Number,
      year: Number,
      category: String
    },
    timesHigherEducation: {
      rank: Number,
      year: Number
    },
    qsWorldRanking: {
      rank: Number,
      year: Number
    }
  },
  
  // Accreditation
  accreditation: {
    naac: {
      grade: {
        type: String,
        enum: ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'D'],
        default: null
      },
      score: Number,
      validUntil: Date
    },
    nba: {
      accredited: {
        type: Boolean,
        default: false
      },
      validUntil: Date
    },
    aicte: {
      approved: {
        type: Boolean,
        default: true
      },
      validUntil: Date
    }
  },
  
  // Infrastructure
  infrastructure: {
    campusArea: {
      type: Number, // in acres
      default: null
    },
    library: {
      books: Number,
      digitalResources: Boolean,
      seatingCapacity: Number
    },
    laboratories: {
      count: Number,
      types: [String]
    },
    sports: {
      facilities: [String],
      grounds: Number
    },
    hostel: {
      available: Boolean,
      capacity: Number,
      gender: {
        type: String,
        enum: ['male', 'female', 'both'],
        default: 'both'
      }
    },
    wifi: {
      type: Boolean,
      default: true
    },
    transport: {
      available: Boolean,
      routes: [String]
    }
  },
  
  // Academic Programs
  programs: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['BTech', 'MTech', 'BSc', 'MSc', 'BBA', 'MBA', 'PhD', 'Diploma'],
      required: true
    },
    duration: {
      type: Number, // in years
      required: true
    },
    branches: [{
      name: String,
      seats: Number,
      cutoff: {
        general: Number,
        obc: Number,
        sc: Number,
        st: Number,
        ews: Number
      }
    }],
    fees: {
      tuition: Number,
      hostel: Number,
      other: Number
    }
  }],
  
  // Faculty Information
  faculty: {
    total: Number,
    phd: Number,
    experience: {
      average: Number,
      range: {
        min: Number,
        max: Number
      }
    },
    departments: [{
      name: String,
      head: String,
      facultyCount: Number
    }]
  },
  
  // Student Information
  students: {
    total: Number,
    male: Number,
    female: Number,
    international: Number,
    placement: {
      percentage: Number,
      averagePackage: Number,
      highestPackage: Number,
      companies: [String]
    }
  },
  
  // Research and Innovation
  research: {
    publications: Number,
    patents: Number,
    projects: Number,
    funding: Number,
    centers: [String]
  },
  
  // Images and Media
  images: {
    logo: String,
    campus: [String],
    infrastructure: [String],
    events: [String]
  },
  
  // Social Media
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String
  },
  
  // Additional Information
  description: {
    type: String,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  highlights: [String],
  achievements: [String],
  events: [{
    name: String,
    date: Date,
    description: String
  }],
  
  // Statistics
  statistics: {
    totalStudents: {
      type: Number,
      default: 0
    },
    totalFaculty: {
      type: Number,
      default: 0
    },
    activeUsers: {
      type: Number,
      default: 0
    },
    mentorshipConnections: {
      type: Number,
      default: 0
    }
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  
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

// Virtual for full address
collegeSchema.virtual('fullAddress').get(function() {
  return `${this.location.address}, ${this.location.city}, ${this.location.state} - ${this.location.pincode}`;
});

// Virtual for student gender ratio
collegeSchema.virtual('genderRatio').get(function() {
  if (!this.students.male || !this.students.female) return null;
  return (this.students.male / this.students.female).toFixed(2);
});

// Indexes
collegeSchema.index({ name: 1 });
collegeSchema.index({ code: 1 });
collegeSchema.index({ 'location.city': 1, 'location.state': 1 });
collegeSchema.index({ type: 1 });
collegeSchema.index({ 'rankings.nirf.rank': 1 });
collegeSchema.index({ 'accreditation.naac.grade': 1 });
collegeSchema.index({ 'students.placement.averagePackage': -1 });

// Pre-save middleware to update updatedAt
collegeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to find colleges by criteria
collegeSchema.statics.findByCriteria = function(criteria) {
  return this.find(criteria).sort({ 'rankings.nirf.rank': 1 });
};

// Static method to get top colleges
collegeSchema.statics.getTopColleges = function(limit = 10) {
  return this.find({ 'rankings.nirf.rank': { $exists: true } })
    .sort({ 'rankings.nirf.rank': 1 })
    .limit(limit);
};

// Instance method to update statistics
collegeSchema.methods.updateStatistics = async function() {
  const User = mongoose.model('User');
  const Connection = mongoose.model('Connection');
  
  const studentCount = await User.countDocuments({ college: this._id, isActive: true });
  const connectionCount = await Connection.countDocuments({
    $or: [
      { mentor: { $in: await User.find({ college: this._id }).select('_id') } },
      { mentee: { $in: await User.find({ college: this._id }).select('_id') } }
    ]
  });
  
  this.statistics.totalStudents = studentCount;
  this.statistics.mentorshipConnections = connectionCount;
  await this.save();
};

const College = mongoose.model('College', collegeSchema);

export default College; 