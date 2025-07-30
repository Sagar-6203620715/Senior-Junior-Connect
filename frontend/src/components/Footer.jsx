import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <span className="font-bold text-white text-lg">E</span>
              </div>
              <span className="text-2xl font-bold text-white">EngiConnect</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting senior and junior students across India's top engineering colleges. 
              Find guidance, mentorship, and build meaningful connections.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-200 group"
              >
                <FaTwitter className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-200 group"
              >
                <FaFacebook className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-all duration-200 group"
              >
                <FaInstagram className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-all duration-200 group"
              >
                <FaLinkedin className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/colleges" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Browse Colleges
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/premium" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Premium Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link 
                  to="/guides" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Study Guides
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Events & Webinars
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400">
                  123 Tech Street, Bangalore<br />
                  Karnataka, India 560001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-400 flex-shrink-0" />
                <a 
                  href="tel:+91-9876543210" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400 flex-shrink-0" />
                <a 
                  href="mailto:info@engiconnect.com" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  info@engiconnect.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              &copy; {currentYear} EngiConnect. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 