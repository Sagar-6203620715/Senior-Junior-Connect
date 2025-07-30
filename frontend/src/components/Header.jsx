import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaCrown } from 'react-icons/fa';

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav when route changes
  useEffect(() => {
    setNavOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-gradient-to-r from-blue-800 to-blue-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-2xl font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1 transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
              scrolled ? 'bg-blue-600 text-white' : 'bg-yellow-400 text-blue-900'
            }`}>
              <span className="font-bold text-lg">E</span>
            </div>
            <span className={scrolled ? 'text-gray-900' : 'text-white'}>
              EngiConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/colleges" 
              className={`font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 ${
                isActive('/colleges') 
                  ? (scrolled ? 'text-blue-600 bg-blue-50' : 'text-yellow-400 bg-white/10') 
                  : (scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-400')
              }`}
            >
              Colleges
            </Link>
            <Link 
              to="/about" 
              className={`font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 ${
                isActive('/about') 
                  ? (scrolled ? 'text-blue-600 bg-blue-50' : 'text-yellow-400 bg-white/10') 
                  : (scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-400')
              }`}
            >
              About
            </Link>
            <Link 
              to="/premium" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                scrolled 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600' 
                  : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
              } shadow-lg hover:shadow-xl`}
            >
              <FaCrown className="text-sm" />
              Premium
            </Link>
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
            <div className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
              scrolled ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/10 hover:bg-white/20'
            }`}>
              <FaUser className={`text-lg ${scrolled ? 'text-gray-600' : 'text-white'}`} />
              <span className={`font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                Welcome, User
              </span>
            </div>
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                scrolled 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl' 
                  : 'bg-white text-blue-700 hover:bg-gray-100 shadow-lg hover:shadow-xl'
              }`}
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg transition-all duration-200"
            aria-label="Toggle navigation menu"
            onClick={() => setNavOpen(v => !v)}
          >
            {navOpen ? (
              <FaTimes className={`text-2xl ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <FaBars className={`text-2xl ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          navOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-2 border-t border-gray-200">
            <Link 
              to="/colleges" 
              className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isActive('/colleges') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Colleges
            </Link>
            <Link 
              to="/about" 
              className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isActive('/about') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              About
            </Link>
            <Link 
              to="/premium" 
              className="flex items-center gap-2 px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200"
            >
              <FaCrown className="text-sm" />
              Premium
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-100">
                <FaUser className="text-gray-600" />
                <span className="font-medium text-gray-700">Welcome, User</span>
              </div>
              <Link 
                to="/login" 
                className="block mt-2 px-4 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 text-center"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 