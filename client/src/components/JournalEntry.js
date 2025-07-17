import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function JournalEntry() {
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!entry.trim()) {
      toast.error('🛑 Journal entry cannot be empty.');
      return;
    }

    // Simulate save success
    toast.success('Journal saved!');
    setEntry('');
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
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}