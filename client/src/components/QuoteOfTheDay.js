import React, { useEffect, useState } from 'react';

export default function QuoteOfTheDay({ mood, journalText, refreshTrigger }) {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
    setIsAnimating(true);
    try {
      const res = await fetch('https://mental-health-app-3xur.onrender.com/api/gpt/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, text: journalText }),
      });

      if (res.ok) {
        const data = await res.json();
        // Clean the quote by removing any existing quotation marks
        let newQuote = data.quote.trim();
        newQuote = newQuote.replace(/^["""]+|["""]+$/g, ''); // Remove quotes from start and end
        
        // Add a small delay for smooth animation
        setTimeout(() => {
          setQuote(newQuote);
          localStorage.setItem('lastGeneratedQuote', newQuote);
          setIsAnimating(false);
        }, 300);
      } else {
        console.error('Failed to generate quote');
        setIsAnimating(false);
      }
    } catch (err) {
      console.error('Error generating quote:', err);
      setIsAnimating(false);
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
      <div className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
        <p className="text-lg italic text-gray-700 min-h-[80px] leading-relaxed">"{quote}"</p>
        <p className="text-right text-sm text-gray-500 mt-3">– MindTrack AI</p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleNewQuote}
          disabled={loading || isAnimating}
          className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
        >
          {loading ? 'Generating...' : 'New Quote'}
        </button>
      </div>
    </div>
  );
}