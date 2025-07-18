import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function JournalEntry({ mood, onSaved }) {
  const [entry, setEntry] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) {
      toast.error('Journal entry cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://mental-health-app-3xur.onrender.com/api/journals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: entry, mood }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || 'Failed to save journal.');
        return;
      }

      toast.success('✅ Journal saved!');
      const savedText = entry; // Store the text before clearing
      setEntry('');
      if (onSaved) onSaved(savedText); // Pass the saved text
    } catch (err) {
      toast.error('Error saving journal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Write about your day</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="journal-textarea" className="block text-sm font-medium text-gray-700 mb-2">
            Share your thoughts, feelings, or experiences from today
          </label>
          <textarea
            id="journal-textarea"
            className="w-full p-4 border border-gray-200 rounded-lg resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-gray-700 bg-white"
            rows="6"
            placeholder="Type your thoughts here..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
}