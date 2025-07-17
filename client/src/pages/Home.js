import React, { useState } from 'react';
import MoodTracker from '../components/MoodTracker';
import JournalEntry from '../components/JournalEntry';

export default function Home() {
  const [mood, setMood] = useState('');

  // Add a handler to reset mood
  const handleJournalSaved = () => {
    setMood('');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-10">
      <h1 className="text-4xl font-bold text-center text-blue-700">🧠 Mental Health Tracker</h1>
      <MoodTracker mood={mood} setMood={setMood} />
      <JournalEntry mood={mood} onSaved={handleJournalSaved} />
    </div>
  );
}