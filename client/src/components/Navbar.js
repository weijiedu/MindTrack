import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-blue-700">🧠 MindTrack</div>
          <div className="space-x-6 hidden md:flex items-center">
            <Link to="/" className="text-gray-600 hover:text-blue-700 transition font-medium">
              Home
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-700 transition font-medium">
              Dashboard
            </Link>
            <Link to="/journal" className="text-gray-600 hover:text-blue-700 transition font-medium">
              Journal
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-700 transition font-medium">
              About
            </Link>
            {user ? (
              <>
                <span className="ml-4 text-blue-700 font-medium">{user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-blue-600 hover:underline font-medium">Sign In</Link>
                <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}