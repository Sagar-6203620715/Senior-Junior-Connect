# EngiConnect Frontend

A modern React application for connecting senior and junior engineering students across India's top colleges.

## 🚀 Features

- **Modern UI/UX**: Built with Tailwind CSS and modern design principles
- **Authentication System**: Complete sign-in/sign-up functionality with JWT
- **Responsive Design**: Mobile-first approach with beautiful animations
- **College Management**: Browse and search colleges with detailed information
- **Chat System**: Real-time messaging between students
- **User Profiles**: Comprehensive user profiles with editing capabilities
- **Settings Management**: User preferences, privacy, and notification settings

## 🛠️ Tech Stack

- **React 19** - Latest React with modern hooks and features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Icons** - Beautiful icon library
- **Context API** - State management for authentication

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd Senior-Junior-Connect/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Authentication System

The application includes a complete authentication system with the following features:

### Components
- **Login** (`/login`) - User sign-in with email/password
- **Register** (`/register`) - User registration with multi-step form
- **Profile** (`/profile`) - User profile management (protected route)
- **Settings** (`/settings`) - Account settings and preferences (protected route)
- **ForgotPassword** (`/forgot-password`) - Password reset functionality

### Features
- JWT-based authentication
- Protected routes for authenticated users
- Form validation and error handling
- Password strength indicators
- Social login placeholders (Google, GitHub)
- Remember me functionality
- Password reset via email

### Usage
1. **Registration**: Users can create accounts with basic info and academic details
2. **Login**: Existing users can sign in with email/password
3. **Profile Management**: Authenticated users can view and edit their profiles
4. **Settings**: Users can manage notifications, privacy, and security settings

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`from-primary-600 to-purple-600`)
- **Accent**: Orange/amber for highlights
- **Neutral**: Gray scale for text and backgrounds

### Components
- **Cards**: Glass morphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Modern inputs with focus states
- **Navigation**: Responsive header with mobile menu

### Animations
- **Hover Effects**: Scale, shadow, and color transitions
- **Page Transitions**: Smooth loading states
- **Micro-interactions**: Button clicks and form submissions

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Responsive grid system for all screen sizes
- **Touch Friendly**: Optimized for touch interactions
- **Performance**: Optimized images and animations

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   └── ProtectedRoute.jsx # Route protection
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication state
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Sign-in page
│   ├── Register.jsx    # Sign-up page
│   ├── Profile.jsx     # User profile
│   ├── Settings.jsx    # User settings
│   ├── CollegeList.jsx # College browsing
│   ├── Chat.jsx        # Chat interface
│   └── ForgotPassword.jsx # Password reset
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind
```

## 🌐 Backend Integration

The frontend is designed to work with the EngiConnect backend API:

- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT tokens for secure API calls
- **Endpoints**: RESTful API for all CRUD operations
- **Error Handling**: Comprehensive error handling and user feedback

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

3. **Environment Variables**: Update API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code examples
- Open an issue on GitHub

## 🔮 Roadmap

- [ ] Real-time chat with WebSocket
- [ ] File upload and sharing
- [ ] Advanced search and filtering
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Dark mode theme
- [ ] Internationalization (i18n)
- [ ] Advanced analytics dashboard

---

Made with ❤️ by the EngiConnect Team
