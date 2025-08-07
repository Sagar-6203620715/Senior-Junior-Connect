# EngiConnect Backend API

A comprehensive backend API for the Senior-Junior Connect platform, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user profiles, verification, and preferences
- **College Management**: College information, rankings, and statistics
- **Mentorship Connections**: Request, accept, reject, and manage mentorship relationships
- **Real-time Chat**: Direct messaging, group chats, and mentorship conversations
- **File Upload**: Cloudinary integration for profile pictures and documents
- **Email Notifications**: Password reset and email verification
- **Security**: Rate limiting, CORS, helmet, and input validation

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB Cloud account
- Cloudinary account
- Email service (Gmail, SendGrid, etc.)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd Senior-Junior-Connect/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables in `.env`:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB
   MONGODB_URI=your_mongodb_cloud_connection_string
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=your_refresh_token_secret
   JWT_REFRESH_EXPIRE=30d
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email (Gmail example)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=your_email@gmail.com
   
   # CORS
   FRONTEND_URL=http://localhost:5173
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   
   # File Upload
   MAX_FILE_SIZE=5242880
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
```
**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "studentType": "junior",
  "college": "college_id",
  "branch": "Computer Science",
  "yearOfStudy": 2,
  "rollNumber": "CS2023001",
  "dateOfBirth": "2002-05-15"
}
```

#### Login
```http
POST /auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Get Current User
```http
GET /auth/me
```
**Headers:** `Authorization: Bearer <token>`

#### Update Profile
```http
PUT /auth/profile
```
**Headers:** `Authorization: Bearer <token>`

### User Management

#### Get User Profile
```http
GET /users/:id
```
**Headers:** `Authorization: Bearer <token>`

#### Search Users
```http
GET /users/search?query=john&filters[role]=senior&page=1&limit=10
```
**Headers:** `Authorization: Bearer <token>`

#### Get User Recommendations
```http
GET /users/recommendations
```
**Headers:** `Authorization: Bearer <token>`

#### Follow/Unfollow User
```http
POST /users/:id/follow
```
**Headers:** `Authorization: Bearer <token>`

### College Management

#### Get All Colleges
```http
GET /colleges?page=1&limit=10&sort=name&order=asc
```

#### Get College Details
```http
GET /colleges/:id
```

#### Search Colleges
```http
GET /colleges/search?query=engineering&location=mumbai&ranking=100
```

#### Get Top Colleges
```http
GET /colleges/top?limit=10&category=national
```

#### Get College Students
```http
GET /colleges/:id/students?role=senior&page=1&limit=20
```
**Headers:** `Authorization: Bearer <token>`

### Mentorship Connections

#### Get User Connections
```http
GET /connections?status=accepted&page=1&limit=10
```
**Headers:** `Authorization: Bearer <token>`

#### Send Connection Request
```http
POST /connections
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "mentorId": "mentor_user_id",
  "message": "I would like to connect with you for guidance",
  "goals": ["Improve coding skills", "Learn system design"],
  "preferredSchedule": {
    "days": ["monday", "wednesday"],
    "time": "18:00"
  },
  "topics": ["JavaScript", "React", "Node.js"]
}
```

#### Accept Connection Request
```http
PUT /connections/:id/accept
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "message": "I'd be happy to mentor you!",
  "schedule": {
    "days": ["monday", "wednesday"],
    "time": "18:00"
  },
  "expectations": ["Regular communication", "Goal setting"]
}
```

#### Add Mentorship Session
```http
POST /connections/:id/sessions
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "date": "2024-01-15T18:00:00Z",
  "duration": 60,
  "topic": "JavaScript Fundamentals",
  "notes": "Covered variables, functions, and scope",
  "goals": ["Understand closures", "Practice async/await"]
}
```

### Chat System

#### Get User Chats
```http
GET /chat?type=direct&page=1&limit=20
```
**Headers:** `Authorization: Bearer <token>`

#### Create New Chat
```http
POST /chat
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "participants": ["user_id_1", "user_id_2"],
  "type": "direct",
  "name": "Study Group",
  "description": "Group for studying algorithms"
}
```

#### Send Message
```http
POST /chat/:id/messages
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "content": "Hello! How are you doing?",
  "type": "text"
}
```

#### Mark Messages as Read
```http
PUT /chat/:id/read
```
**Headers:** `Authorization: Bearer <token>`

### File Upload

#### Upload Profile Picture
```http
POST /upload/profile-picture
```
**Headers:** `Authorization: Bearer <token>`
**Body:** `multipart/form-data` with `image` field

#### Upload College Images
```http
POST /upload/college-images
```
**Headers:** `Authorization: Bearer <token>`
**Body:** `multipart/form-data` with `images` field (max 5 files)

#### Upload Chat Images
```http
POST /upload/chat-images
```
**Headers:** `Authorization: Bearer <token>`
**Body:** `multipart/form-data` with `image` field

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Types
- **Access Token**: Short-lived (7 days), used for API requests
- **Refresh Token**: Long-lived (30 days), used to get new access tokens

## 📊 Database Schema

### User Model
- Basic info (name, email, password)
- Academic details (college, branch, year)
- Skills and interests
- Social links and preferences
- Authentication tokens

### College Model
- Basic information and location
- Academic programs and rankings
- Faculty and student statistics
- Images and social media

### Connection Model
- Mentor and mentee references
- Request details and status
- Sessions and progress tracking
- Communication history

### Chat Model
- Participants and chat type
- Messages with reactions and replies
- Read receipts and unread counts
- Pinned messages and settings

## 🛡️ Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers for Express
- **Input Validation**: Express-validator for request validation
- **Password Hashing**: bcryptjs for secure password storage
- **JWT**: Secure token-based authentication

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | - |
| `EMAIL_HOST` | SMTP host | - |
| `EMAIL_PORT` | SMTP port | 587 |
| `EMAIL_USER` | SMTP username | - |
| `EMAIL_PASS` | SMTP password | - |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set up proper CORS origins
4. Configure email service
5. Set up Cloudinary credentials

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📞 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.

## 📄 License

This project is licensed under the MIT License. 