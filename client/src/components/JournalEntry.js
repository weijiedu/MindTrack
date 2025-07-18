import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function JournalEntry({ mood, onSaved }) {
  const { fetchWithAuth, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [entry, setEntry] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestedMood, setSuggestedMood] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const analyzeSentiment = async (text) => {
    if (!text || text.trim().length < 10) {
      toast.warning('Please write at least 10 characters for AI analysis.');
      return;
    }

    setAnalyzing(true);
    try {
      const res = await fetch('https://mental-health-app-3xur.onrender.com/api/gpt/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        const data = await res.json();
        setSuggestedMood(data.suggestedMood);
        setShowSuggestion(true);
        toast.info(`🤖 ${data.analysis}`, {
          position: "top-center",
          autoClose: 4000,
        });
      }
    } catch (err) {
      console.error('Sentiment analysis failed:', err);
      toast.error('AI analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setEntry(newText);
    
    // Clear suggestion when user starts typing again
    if (showSuggestion) {
      setShowSuggestion(false);
      setSuggestedMood(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) {
      toast.error('Journal entry cannot be empty.');
      return;
    }
    if (!user) {
      navigate('/signin');
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth('https://mental-health-app-3xur.onrender.com/api/journals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: entry, mood }),
      });
      if (res.status === 401) {
        navigate('/signin');
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || 'Failed to save journal.');
        return;
      }
      toast.success('Journal saved!');
      const savedText = entry; // Store the text before clearing
      setEntry('');
      setSuggestedMood(null);
      setShowSuggestion(false);
      if (onSaved) onSaved(savedText);
    } catch (err) {
      toast.error('Error saving journal.');
    } finally {
      setLoading(false);
    }
  };

  const applySuggestedMood = () => {
    if (suggestedMood && onSaved) {
      // We need to pass the suggested mood to the parent component
      // For now, we'll show a toast and let the user manually select
      toast.info(`Suggested mood: ${suggestedMood} - Please select it manually if you agree!`);
      setShowSuggestion(false);
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
            onChange={handleTextChange}
          />
          
          {/* AI Analysis Button */}
          {entry.trim().length >= 10 && !mood && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => analyzeSentiment(entry)}
                disabled={analyzing}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {analyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    🤖 Analyze Mood with AI
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 mt-1">
                Let AI analyze your entry and suggest a mood
              </p>
            </div>
          )}

          {/* AI Analysis Suggestion */}
          {showSuggestion && suggestedMood && (
            <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{suggestedMood}</div>
                  <div>
                    <div className="text-blue-800 font-semibold">
                      AI Suggested Mood
                    </div>
                    <div className="text-sm text-blue-600">
                      {suggestedMood === '😊' && 'Happy & Positive'}
                      {suggestedMood === '😐' && 'Neutral & Calm'}
                      {suggestedMood === '😢' && 'Sad & Melancholic'}
                      {suggestedMood === '😠' && 'Angry & Frustrated'}
                      {suggestedMood === '😨' && 'Anxious & Worried'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={applySuggestedMood}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
                >
                  Use This Mood
                </button>
              </div>
            </div>
          )}

          {/* Manual Mood Selection Reminder */}
          {entry.trim().length > 0 && !mood && !showSuggestion && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600">💡</span>
                <span className="text-sm text-yellow-700">
                  Don't forget to select your mood above, or use AI analysis to get a suggestion!
                </span>
              </div>
            </div>
          )}
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