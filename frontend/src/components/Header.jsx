import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaBell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setNavOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>
              EngiConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors duration-200 hover:text-primary-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              } ${location.pathname === '/' ? 'text-primary-600' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/colleges" 
              className={`font-medium transition-colors duration-200 hover:text-primary-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              } ${location.pathname === '/colleges' ? 'text-primary-600' : ''}`}
            >
              Colleges
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors duration-200 hover:text-primary-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              } ${location.pathname === '/about' ? 'text-primary-600' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors duration-200 hover:text-primary-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              } ${location.pathname === '/contact' ? 'text-primary-600' : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-xl transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                scrolled ? 'text-gray-600' : 'text-white'
              }`}
              aria-label="Toggle search"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* Notification Bell */}
            <button
              className={`p-2 rounded-xl transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                scrolled ? 'text-gray-600' : 'text-white'
              }`}
              aria-label="Notifications"
            >
              <div className="relative">
                <FaBell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
            </button>

            {/* Authentication Section */}
            {isAuthenticated ? (
              /* User Menu */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className={`font-medium transition-colors duration-300 ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`}>
                    {user?.firstName || 'User'}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.fullName || 'User'}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaUser className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaCog className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Sign In Button */
              <Link 
                to="/login" 
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  scrolled 
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl' 
                    : 'bg-white text-primary-700 hover:bg-gray-100 shadow-lg hover:shadow-xl'
                }`}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-12 h-12 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl transition-all duration-300"
            aria-label="Toggle navigation menu"
            onClick={() => setNavOpen(v => !v)}
          >
            <div className={`w-6 h-0.5 transition-all duration-300 ${
              scrolled ? 'bg-gray-700' : 'bg-white'
            } ${navOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 my-1 transition-all duration-300 ${
              scrolled ? 'bg-gray-700' : 'bg-white'
            } ${navOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${
              scrolled ? 'bg-gray-700' : 'bg-white'
            } ${navOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          navOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-2">
            <Link 
              to="/" 
              className={`block px-6 py-3 rounded-xl transition-colors duration-200 ${
                location.pathname === '/' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/colleges" 
              className={`block px-6 py-3 rounded-xl transition-colors duration-200 ${
                location.pathname === '/colleges' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Colleges
            </Link>
            <Link 
              to="/about" 
              className={`block px-6 py-3 rounded-xl transition-colors duration-200 ${
                location.pathname === '/about' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block px-6 py-3 rounded-xl transition-colors duration-200 ${
                location.pathname === '/contact' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Contact
            </Link>
            
            {/* Mobile Authentication */}
            {!isAuthenticated && (
              <div className="pt-4 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="block mt-3 px-6 py-4 rounded-xl font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-300 text-center"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="block mt-3 px-6 py-4 rounded-xl font-semibold border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors duration-300 text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Enhanced Search Bar */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges, courses, or topics..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 