import { Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CollegeList from './pages/CollegeList';
import Chat from './pages/Chat';

// Placeholder components for missing pages
const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">About EngiConnect</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          EngiConnect is a platform designed to bridge the gap between senior and junior engineering students across India's top colleges.
        </p>
        <p className="text-slate-600 mb-6">
          Our mission is to provide a seamless connection between experienced students and those seeking guidance, creating a supportive community for academic and career growth.
        </p>
        <p className="text-slate-600">
          We believe that peer-to-peer mentorship is one of the most effective ways to learn and grow in the engineering field.
        </p>
      </div>
    </div>
  </div>
);

const Premium = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Premium Features</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Unlock premium features to enhance your learning experience and connect with more senior students.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Priority Support</h3>
            <p className="text-slate-600">Get faster responses and priority access to senior students.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Advanced Analytics</h3>
            <p className="text-slate-600">Track your progress and get detailed insights about your connections.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Login = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">Sign In</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input type="password" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Contact Us</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Get in touch with us for any questions, feedback, or support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <p className="text-slate-600">Email: info@engiconnect.com</p>
              <p className="text-slate-600">Phone: +91 98765 43210</p>
              <p className="text-slate-600">Address: 123 Tech Street, Bangalore, Karnataka, India 560001</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Send us a message</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Help = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Help & Support</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Find answers to common questions and get the support you need.
        </p>
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">How to connect with senior students?</h3>
            <p className="text-slate-600">Browse colleges, find the one you're interested in, and click the Chat button to start a conversation.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">How to update my profile?</h3>
            <p className="text-slate-600">Go to your profile settings and update your information as needed.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Blog = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Blog & Articles</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Read the latest articles and insights from our community.
        </p>
        <p className="text-slate-600">Coming soon...</p>
      </div>
    </div>
  </div>
);

const Guides = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Study Guides</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Comprehensive study guides and resources for engineering students.
        </p>
        <p className="text-slate-600">Coming soon...</p>
      </div>
    </div>
  </div>
);

const Events = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Events & Webinars</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Join our upcoming events and webinars to learn from experts.
        </p>
        <p className="text-slate-600">Coming soon...</p>
      </div>
    </div>
  </div>
);

const Careers = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Career Guidance</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Get expert career guidance and advice from industry professionals.
        </p>
        <p className="text-slate-600">Coming soon...</p>
      </div>
    </div>
  </div>
);

const FAQ = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Frequently Asked Questions</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Find answers to the most common questions about our platform.
        </p>
        <p className="text-slate-600">Coming soon...</p>
      </div>
    </div>
  </div>
);

const Privacy = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Privacy Policy</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Learn about how we protect your privacy and handle your data.
        </p>
        <p className="text-slate-600">Coming soon...</p>
      </div>
    </div>
  </div>
);

const Terms = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Terms of Service</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Read our terms of service and user agreement.
        </p>
        <p className="text-slate-600">Coming soon...</p>
      </div>
    </div>
  </div>
);

const Cookies = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Cookie Policy</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-lg text-slate-600 mb-6">
          Learn about how we use cookies and similar technologies.
        </p>
        <p className="text-slate-600">Coming soon...</p>
      </div>
    </div>
  </div>
);

const CollegeDetail = () => {
  const { collegeId } = useParams();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">College Details</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-lg text-slate-600 mb-6">
            Detailed information about college ID: {collegeId}
          </p>
          <p className="text-slate-600">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
