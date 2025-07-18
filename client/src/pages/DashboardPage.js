import React from 'react';
import MoodDashboard from '../components/MoodDashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <MoodDashboard />
      </div>
    </div>
  );
} 