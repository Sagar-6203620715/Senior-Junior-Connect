import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-500 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded">
          <span className="inline-block bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-blue-900 font-bold">E</span>
          EngiConnect
        </Link>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
          aria-label="Toggle navigation menu"
          onClick={() => setNavOpen(v => !v)}
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-transform ${navOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 ${navOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform ${navOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/premium" className="bg-yellow-400 text-blue-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">Premium</Link>
          <Link to="/colleges" className="hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-white rounded">Colleges</Link>
          <Link to="/about" className="hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-white rounded">About</Link>
        </nav>
        {/* Mobile Nav */}
        {navOpen && (
          <nav className="absolute top-full left-0 w-full bg-blue-800 flex flex-col items-center gap-4 py-4 shadow-lg md:hidden animate-fade-in z-40">
            <Link to="/premium" className="bg-yellow-400 text-blue-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition shadow w-11/12 text-center focus:outline-none focus:ring-2 focus:ring-yellow-400" onClick={() => setNavOpen(false)}>Premium</Link>
            <Link to="/colleges" className="hover:underline font-semibold w-11/12 text-center focus:outline-none focus:ring-2 focus:ring-white rounded" onClick={() => setNavOpen(false)}>Colleges</Link>
            <Link to="/about" className="hover:underline font-semibold w-11/12 text-center focus:outline-none focus:ring-2 focus:ring-white rounded" onClick={() => setNavOpen(false)}>About</Link>
          </nav>
        )}
        <div className="flex items-center gap-2 ml-2">
          <span className="inline-block w-8 h-8 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold text-lg shadow"> <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' /><path strokeLinecap='round' strokeLinejoin='round' d='M4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z' /></svg></span>
          <Link to="/login" className="bg-white text-blue-700 px-3 py-1 rounded font-semibold hover:bg-blue-100 transition shadow focus:outline-none focus:ring-2 focus:ring-blue-400">Sign Up / Login</Link>
        </div>
      </div>
    </header>
  );
}

export default Header; 