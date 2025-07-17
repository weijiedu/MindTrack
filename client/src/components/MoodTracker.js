import React from 'react';

export default function MoodTracker({ mood, setMood }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">How are you feeling today?</h2>
      <div className="space-y-4">
        <select
          className="w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="">Select a mood</option>
          <option value="😊">😊 Happy</option>
          <option value="😐">😐 Neutral</option>
          <option value="😢">😢 Sad</option>
          <option value="😠">😠 Angry</option>
          <option value="😨">😨 Anxious</option>
        </select>
        {mood && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-blue-700 font-medium">
              You selected: <span className="text-2xl">{mood}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}