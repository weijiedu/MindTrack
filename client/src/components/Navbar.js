import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-blue-700">🧠 MindTrack</div>
          <div className="space-x-6 hidden md:flex">
            <a href="#" className="text-gray-600 hover:text-blue-700 transition font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition font-medium">Journal</a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition font-medium">About</a>
          </div>
        </div>
      </div>
    </nav>
  );
}