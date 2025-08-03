import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaArrowUp, FaRocket } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary-400 rounded-full"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-accent-400 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-accent-400 rounded-full"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Enhanced Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <span className="font-bold text-white text-xl">E</span>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">EngiConnect</span>
                <p className="text-xs text-gray-400">Connect • Learn • Grow</p>
              </div>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Connecting senior and junior students across India's top engineering colleges. 
              Find guidance, mentorship, and build meaningful connections.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary-600 hover:scale-110 transition-all duration-300 group"
              >
                <FaTwitter className="text-gray-400 group-hover:text-white transition-colors text-lg" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary-600 hover:scale-110 transition-all duration-300 group"
              >
                <FaFacebook className="text-gray-400 group-hover:text-white transition-colors text-lg" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all duration-300 group"
              >
                <FaInstagram className="text-gray-400 group-hover:text-white transition-colors text-lg" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 group"
              >
                <FaLinkedin className="text-gray-400 group-hover:text-white transition-colors text-lg" />
              </a>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <FaRocket className="text-primary-400" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/colleges" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Browse Colleges
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/premium" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Premium Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <FaRocket className="text-accent-400" />
              Resources
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link 
                  to="/guides" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Study Guides
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Events & Webinars
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <FaEnvelope className="text-green-400" />
              Contact Us
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <FaMapMarkerAlt className="text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    123 Tech Street, Bangalore<br />
                    Karnataka, India 560001
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">
                  <FaPhone className="text-green-400 group-hover:text-white transition-colors" />
                </div>
                <a 
                  href="tel:+91-9876543210" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                  <FaEnvelope className="text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <a 
                  href="mailto:info@engiconnect.com" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  info@engiconnect.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Footer */}
      <div className="relative z-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-gray-400">
              &copy; {currentYear} EngiConnect. All rights reserved.
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="mx-auto group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button>
    </footer>
  );
}

export default Footer; 