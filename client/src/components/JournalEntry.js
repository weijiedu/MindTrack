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
      const res = await fetch('http://localhost:4000/api/journals', {
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
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Write about your day</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          rows="6"
          placeholder="Type your thoughts here..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
}