import React, { useEffect, useState } from 'react';

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://mental-health-app-3xur.onrender.com/api/journals')
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            📚 Journal Entries
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reflect on your journey and see how your thoughts and feelings have evolved over time.
          </p>
        </header>

        {/* Content Section */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading your journal entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No entries yet</h3>
              <p className="text-gray-600 mb-6">Start your journaling journey by writing your first entry.</p>
              <a 
                href="/" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm"
              >
                Write Your First Entry
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {entries.map((entry) => (
                <article 
                  key={entry._id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Entry Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{entry.mood}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {formatDate(entry.date)}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatTime(entry.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Journal Entry
                      </span>
                    </div>
                  </div>

                  {/* Entry Content */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {entry.text}
                    </p>
                  </div>

                  {/* Entry Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Entry #{entries.indexOf(entry) + 1}</span>
                      <span>Word count: {entry.text.split(' ').length}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Your thoughts matter. Keep writing, keep growing. 💙</p>
        </footer>
      </div>
    </div>
  );
}