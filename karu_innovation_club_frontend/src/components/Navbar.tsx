import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-white shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Karu Innovation Club</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
