import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaCrown, FaBell, FaSearch } from 'react-icons/fa';

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect with enhanced performance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav when route changes
  useEffect(() => {
    setNavOpen(false);
    setSearchOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl p-2 transition-all duration-300"
          >
            <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
              scrolled 
                ? 'bg-gradient-to-br from-primary-600 to-primary-700 shadow-lg' 
                : 'bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20'
            }`}>
              <span className={`font-bold text-xl transition-colors duration-300 ${
                scrolled ? 'text-white' : 'text-white'
              }`}>E</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                EngiConnect
              </span>
              <span className={`text-xs font-medium transition-colors duration-300 ${
                scrolled ? 'text-gray-600' : 'text-white/80'
              }`}>
                Connect • Learn • Grow
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/colleges" 
              className={`nav-link relative px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/colleges') 
                  ? (scrolled ? 'text-primary-600 bg-primary-50' : 'text-white bg-white/10') 
                  : (scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200')
              }`}
            >
              <span className="relative z-10">Colleges</span>
              {isActive('/colleges') && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-primary-50 rounded-xl opacity-80"></div>
              )}
            </Link>
            
            <Link 
              to="/about" 
              className={`nav-link relative px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/about') 
                  ? (scrolled ? 'text-primary-600 bg-primary-50' : 'text-white bg-white/10') 
                  : (scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200')
              }`}
            >
              <span className="relative z-10">About</span>
              {isActive('/about') && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-primary-50 rounded-xl opacity-80"></div>
              )}
            </Link>
            
            <Link 
              to="/premium" 
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-500 bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg hover:shadow-xl"
            >
              <FaCrown className="text-sm" />
              Premium
            </Link>
          </nav>

          {/* Enhanced User Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                scrolled 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-600' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <FaSearch className="text-lg" />
            </button>

            {/* Notifications */}
            <button className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              scrolled 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-600' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}>
              <FaBell className="text-lg" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Profile */}
            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
              scrolled 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-white/10 hover:bg-white/20'
            }`}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
              <span className={`font-medium transition-colors duration-300 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Welcome, User
              </span>
            </div>

            {/* Sign In Button */}
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

        {/* Enhanced Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          navOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-6 space-y-3 border-t border-white/20">
            <Link 
              to="/colleges" 
              className={`block px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/colleges') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Colleges
            </Link>
            <Link 
              to="/about" 
              className={`block px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/about') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              About
            </Link>
            <Link 
              to="/premium" 
              className="flex items-center gap-2 px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 transition-all duration-300"
            >
              <FaCrown className="text-sm" />
              Premium
            </Link>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-gray-100">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <span className="font-medium text-gray-700">Welcome, User</span>
              </div>
              <Link 
                to="/login" 
                className="block mt-3 px-6 py-4 rounded-xl font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-all duration-300 text-center"
              >
                Sign In
              </Link>
            </div>
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