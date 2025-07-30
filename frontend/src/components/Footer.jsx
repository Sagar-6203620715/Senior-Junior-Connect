import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-12 text-center border-t">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="mb-2 md:mb-0 text-sm">&copy; {new Date().getFullYear()} EngiConnect. All rights reserved.</div>
        <div className="flex gap-4 justify-center">
          <Link to="/about" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1">About</Link>
          <Link to="/colleges" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1">Colleges</Link>
          <Link to="/premium" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1">Premium</Link>
        </div>
        <div className="flex gap-3 justify-center">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.13 12.13 0 013 4.89a4.28 4.28 0 001.32 5.71c-.7-.02-1.36-.21-1.94-.53v.05a4.28 4.28 0 003.43 4.19c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0024 4.59a8.48 8.48 0 01-2.54.7z" /></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
          </a>
          <a href="mailto:info@engiconnect.com" aria-label="Email" className="hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065L.8 4.8A1.2 1.2 0 012.4 3.6h19.2a1.2 1.2 0 011.6 1.2l-11.2 8.265zm11.2-7.065v13.2a1.2 1.2 0 01-1.2 1.2H2.4a1.2 1.2 0 01-1.2-1.2V6l10.8 7.965a1.2 1.2 0 001.44 0L23.2 6z" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 