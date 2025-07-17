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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🧠 MindTrack
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your mood, reflect on your day, and receive personalized insights to support your mental well-being.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Quote */}
          <div className="lg:col-span-1">
            <QuoteOfTheDay mood={savedMood} journalText={journalText} refreshTrigger={refreshTrigger} />
          </div>

          {/* Right Column - Mood & Journal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood Tracker Section */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <MoodTracker mood={mood} setMood={setMood} />
            </section>

            {/* Journal Entry Section */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <JournalEntry mood={mood} onSaved={handleJournalSaved} />
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Take care of your mental health, one day at a time. 💙</p>
        </footer>
      </div>
    </div>
  );
}