import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CollegeList from './pages/CollegeList';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';

// Placeholder components for other routes
const CollegeDetail = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">College Details</h1>
      <p className="text-gray-600">Detailed information about the selected college will be displayed here.</p>
    </div>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-gray-600">Learn more about our mission and values.</p>
    </div>
  </div>
);

const Premium = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Premium Features</h1>
      <p className="text-gray-600">Unlock advanced features and exclusive content.</p>
    </div>
  </div>
);

const Contact = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-gray-600">Get in touch with our team for support and inquiries.</p>
    </div>
  </div>
);

const Help = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Help & Support</h1>
      <p className="text-gray-600">Find answers to common questions and get help.</p>
    </div>
  </div>
);

const Blog = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog</h1>
      <p className="text-gray-600">Read our latest articles and insights.</p>
    </div>
  </div>
);

const Guides = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Guides</h1>
      <p className="text-gray-600">Comprehensive guides and tutorials.</p>
    </div>
  </div>
);

const Events = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Events</h1>
      <p className="text-gray-600">Discover upcoming events and workshops.</p>
    </div>
  </div>
);

const Careers = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Careers</h1>
      <p className="text-gray-600">Explore career opportunities with us.</p>
    </div>
  </div>
);

const FAQ = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">FAQ</h1>
      <p className="text-gray-600">Frequently asked questions and answers.</p>
    </div>
  </div>
);

const Privacy = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
      <p className="text-gray-600">Learn about how we protect your privacy.</p>
    </div>
  </div>
);

const Terms = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Service</h1>
      <p className="text-gray-600">Read our terms and conditions.</p>
    </div>
  </div>
);

const Cookies = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Cookie Policy</h1>
      <p className="text-gray-600">Understand how we use cookies.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/colleges" element={<CollegeList />} />
              <Route path="/chat/:collegeId" element={<Chat />} />
              <Route path="/college/:collegeId" element={<CollegeDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/events" element={<Events />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              
              {/* Protected Routes */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
