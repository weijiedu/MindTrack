import React, { useEffect, useState } from 'react';

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/journals')
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert('Failed to load journal entries');
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">📚 My Journal Entries</h1>
      {loading ? (
        <p>Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-gray-600">No entries yet.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li key={entry._id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl">{entry.mood}</span>
                <span className="text-sm text-gray-500">
                  {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-gray-700">{entry.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}