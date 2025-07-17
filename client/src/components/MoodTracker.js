import React, { useState } from 'react';

export default function MoodTracker() {
  const [mood, setMood] = useState('');

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">How are you feeling today?</h2>
      <select
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        <p className="mt-3 text-blue-600 text-lg">You selected: <span className="font-medium">{mood}</span></p>
      )}
    </div>
  );
}