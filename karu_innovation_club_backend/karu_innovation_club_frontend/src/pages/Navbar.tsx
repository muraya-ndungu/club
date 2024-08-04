import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="/path-to-your-logo.png" alt="Karu Innovation Club Logo" className="h-10 mr-4" />
          <div className="text-2xl font-bold text-gray-800">Karu Innovation Club</div>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-800 hover:text-blue-500">Home</Link>
          <Link to="/communities" className="text-gray-800 hover:text-blue-500">Communities</Link>
          <Link to="/register" className="text-gray-800 hover:text-blue-500">Register</Link>
          <Link to="/login" className="text-gray-800 hover:text-blue-500">Login</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button className="outline-none mobile-menu-button">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="hidden mobile-menu">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="block text-sm px-2 py-4 text-gray-800 hover:bg-gray-200">Home</Link>
          </li>
          <li>
             <Link to="/communities" className="block text-sm px-2 py-4 text-gray-800 hover:bg-gray-200">Communities</Link>
          </li>
          <li>
            <Link to="/register" className="block text-sm px-2 py-4 text-gray-800 hover:bg-gray-200">Register</Link>
          </li>
          <li>
            <Link to="/login" className="block text-sm px-2 py-4 text-gray-800 hover:bg-gray-200">Login</Link>
          </li>
      
        </ul>
      </div>
    </nav>
  );
};

// Add script to handle the mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  menuButton?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });
});

export default Navbar;
