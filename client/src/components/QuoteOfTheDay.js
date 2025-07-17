import React, { useEffect, useState } from 'react';

export default function QuoteOfTheDay({ mood, journalText, refreshTrigger }) {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  // Load the last saved quote on mount
  useEffect(() => {
    const savedQuote = localStorage.getItem('lastGeneratedQuote');
    if (savedQuote) {
      setQuote(savedQuote);
    } else {
      setQuote('You are doing great. Keep going!');
    }
  }, []);

  // Generate new quote when refreshTrigger changes (when journal is saved)
  useEffect(() => {
    if (refreshTrigger > 0 && mood && journalText) {
      generateQuote();
    }
  }, [refreshTrigger, mood, journalText]);

  const generateQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/gpt/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, text: journalText }),
      });

      if (res.ok) {
        const data = await res.json();
        // Clean the quote by removing any existing quotation marks
        let newQuote = data.quote.trim();
        newQuote = newQuote.replace(/^["""]+|["""]+$/g, ''); // Remove quotes from start and end
        setQuote(newQuote);
        localStorage.setItem('lastGeneratedQuote', newQuote);
      } else {
        console.error('Failed to generate quote');
      }
    } catch (err) {
      console.error('Error generating quote:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewQuote = () => {
    if (mood && journalText) {
      generateQuote();
    } else {
      // If no recent journal entry, show a message
      alert('Please save a journal entry first to generate a personalized quote.');
    }
  };

  return (
    <div className="bg-white border-l-4 border-blue-500 shadow p-4 rounded-lg mb-6 max-w-3xl mx-auto">
      <p className="text-lg italic text-gray-700 min-h-[60px]">"{quote}"</p>
      <p className="text-right text-sm text-gray-500 mt-2">– MindTrack AI</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleNewQuote}
          disabled={loading}
          className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'New Quote'}
        </button>
      </div>
    </div>
  );
}