import React, { useState } from 'react';
import MoodTracker from '../components/MoodTracker';
import JournalEntry from '../components/JournalEntry';
import QuoteOfTheDay from '../components/QuoteOfTheDay';

export default function Home() {
  const [mood, setMood] = useState('');
  const [journalText, setJournalText] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [savedMood, setSavedMood] = useState(''); // Store mood for quote generation

  // Add a handler to reset mood and trigger quote refresh
  const handleJournalSaved = (savedText) => {
    setSavedMood(mood); // Store the mood before clearing it
    setMood('');
    setJournalText(savedText); // Store the text that was just saved
    setRefreshTrigger(prev => prev + 1); // Trigger quote refresh
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-10">
      <h1 className="text-4xl font-bold text-center text-blue-700">🧠 Mental Health Tracker</h1>
      <QuoteOfTheDay mood={savedMood} journalText={journalText} refreshTrigger={refreshTrigger} />
      <MoodTracker mood={mood} setMood={setMood} />
      <JournalEntry mood={mood} onSaved={handleJournalSaved} />
    </div>
  );
}