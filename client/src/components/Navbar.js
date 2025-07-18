import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-blue-700">🧠 MindTrack</div>
          <div className="space-x-6 hidden md:flex">
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
          </div>
        </div>
      </div>
    </nav>
  );
}