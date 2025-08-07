import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import College from '../models/College.js';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createSampleColleges = async () => {
  const colleges = [
    {
      name: 'Indian Institute of Technology Bombay',
      description: 'Premier engineering institute in Mumbai',
      location: {
        address: 'Powai, Mumbai, Maharashtra',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '400076'
      },
      contact: {
        email: 'info@iitb.ac.in',
        phone: '+91-22-25722545',
        website: 'https://www.iitb.ac.in'
      },
      academic: {
        yearFounded: 1958,
        accreditation: ['AICTE', 'UGC']
      },
      rankings: {
        national: 1,
        international: 172
      },
      programs: [
        'Computer Science and Engineering',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Chemical Engineering',
        'Civil Engineering'
      ],
      faculty: {
        count: 550,
        studentRatio: 1.2
      },
      students: {
        count: 12000,
        malePercentage: 65,
        femalePercentage: 35
      }
    },
    {
      name: 'Delhi Technological University',
      description: 'State university of engineering and technology in Delhi',
      location: {
        address: 'Shahbad Daulatpur, Main Bawana Road, Delhi',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110042'
      },
      contact: {
        email: 'info@dtu.ac.in',
        phone: '+91-11-27871018',
        website: 'https://www.dtu.ac.in'
      },
      academic: {
        yearFounded: 1941,
        accreditation: ['AICTE', 'UGC']
      },
      rankings: {
        national: 15,
        international: 1200
      },
      programs: [
        'Computer Engineering',
        'Information Technology',
        'Electronics and Communication',
        'Mechanical Engineering',
        'Civil Engineering'
      ],
      faculty: {
        count: 450,
        studentRatio: 1.5
      },
      students: {
        count: 8000,
        malePercentage: 70,
        femalePercentage: 30
      }
    },
    {
      name: 'Vellore Institute of Technology',
      description: 'Private deemed university in Vellore, Tamil Nadu',
      location: {
        address: 'Vellore, Tamil Nadu',
        city: 'Vellore',
        state: 'Tamil Nadu',
        country: 'India',
        zipCode: '632014'
      },
      contact: {
        email: 'info@vit.ac.in',
        phone: '+91-416-2202155',
        website: 'https://www.vit.ac.in'
      },
      academic: {
        yearFounded: 1984,
        accreditation: ['AICTE', 'UGC', 'NAAC']
      },
      rankings: {
        national: 12,
        international: 1000
      },
      programs: [
        'Computer Science and Engineering',
        'Information Technology',
        'Electronics and Communication',
        'Mechanical Engineering',
        'Civil Engineering',
        'Biotechnology'
      ],
      faculty: {
        count: 800,
        studentRatio: 1.8
      },
      students: {
        count: 15000,
        malePercentage: 60,
        femalePercentage: 40
      }
    }
  ];

  try {
    // Clear existing colleges
    await College.deleteMany({});
    
    // Insert new colleges
    const createdColleges = await College.insertMany(colleges);
    console.log(`✅ Created ${createdColleges.length} sample colleges`);
    
    return createdColleges;
  } catch (error) {
    console.error('❌ Error creating colleges:', error);
    throw error;
  }
};

const createSampleUsers = async (colleges) => {
  const hashedPassword = await bcrypt.hash('Password123!', 12);
  
  const users = [
    {
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'rahul.sharma@example.com',
      password: hashedPassword,
      studentType: 'senior',
      college: colleges[0]._id, // IIT Bombay
      branch: 'Computer Science and Engineering',
      yearOfStudy: 4,
      rollNumber: 'CS2020001',
      dateOfBirth: new Date('2000-03-15'),
      phoneNumber: '9876543210',
      whatsappNumber: '9876543210',
      bio: 'Passionate about software engineering and mentoring junior students. Love working with React, Node.js, and cloud technologies.',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS', 'System Design'],
      interests: ['Web Development', 'Cloud Computing', 'Open Source', 'Mentoring'],
      isVerified: true,
      rating: 4.8,
      reviewCount: 15
    },
    {
      firstName: 'Priya',
      lastName: 'Patel',
      email: 'priya.patel@example.com',
      password: hashedPassword,
      studentType: 'junior',
      college: colleges[1]._id, // DTU
      branch: 'Computer Engineering',
      yearOfStudy: 2,
      rollNumber: 'CE2022001',
      dateOfBirth: new Date('2002-07-22'),
      phoneNumber: '9876543211',
      whatsappNumber: '9876543211',
      bio: 'Second-year student eager to learn and grow. Interested in web development and looking for guidance from seniors.',
      skills: ['HTML', 'CSS', 'JavaScript', 'Python'],
      interests: ['Web Development', 'Machine Learning', 'Competitive Programming'],
      isVerified: true
    },
    {
      firstName: 'Amit',
      lastName: 'Kumar',
      email: 'amit.kumar@example.com',
      password: hashedPassword,
      studentType: 'senior',
      college: colleges[2]._id, // VIT
      branch: 'Information Technology',
      yearOfStudy: 4,
      rollNumber: 'IT2020001',
      dateOfBirth: new Date('2000-11-08'),
      phoneNumber: '9876543212',
      whatsappNumber: '9876543212',
      bio: 'Final year IT student with expertise in full-stack development. Happy to help juniors with their projects and career guidance.',
      skills: ['Java', 'Spring Boot', 'React', 'MySQL', 'Docker', 'Kubernetes'],
      interests: ['Full Stack Development', 'DevOps', 'Database Design', 'Mentoring'],
      isVerified: true,
      rating: 4.6,
      reviewCount: 12
    },
    {
      firstName: 'Neha',
      lastName: 'Singh',
      email: 'neha.singh@example.com',
      password: hashedPassword,
      studentType: 'junior',
      college: colleges[0]._id, // IIT Bombay
      branch: 'Electrical Engineering',
      yearOfStudy: 3,
      rollNumber: 'EE2021001',
      dateOfBirth: new Date('2001-04-12'),
      phoneNumber: '9876543213',
      whatsappNumber: '9876543213',
      bio: 'Third-year EE student interested in embedded systems and IoT. Looking for mentorship in hardware and software integration.',
      skills: ['C++', 'Arduino', 'Python', 'Circuit Design'],
      interests: ['Embedded Systems', 'IoT', 'Hardware Programming', 'Robotics'],
      isVerified: true
    }
  ];

  try {
    // Clear existing users
    await User.deleteMany({});
    
    // Insert new users
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} sample users`);
    
    return createdUsers;
  } catch (error) {
    console.error('❌ Error creating users:', error);
    throw error;
  }
};

const main = async () => {
  console.log('🚀 Starting setup script...');
  
  try {
    // Connect to database
    await connectDB();
    
    // Create sample colleges
    const colleges = await createSampleColleges();
    
    // Create sample users
    const users = await createSampleUsers(colleges);
    
    console.log('\n📊 Sample Data Summary:');
    console.log(`- Colleges: ${colleges.length}`);
    console.log(`- Users: ${users.length}`);
    console.log(`  - Seniors: ${users.filter(u => u.studentType === 'senior').length}`);
    console.log(`  - Juniors: ${users.filter(u => u.studentType === 'junior').length}`);
    
    console.log('\n🔑 Test Credentials:');
    console.log('All users have the password: Password123!');
    users.forEach(user => {
      console.log(`- ${user.email} (${user.studentType})`);
    });
    
    console.log('\n✅ Setup completed successfully!');
    console.log('You can now start the server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the setup
main(); 