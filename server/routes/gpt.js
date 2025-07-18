import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/quote', async (req, res) => {
  const { mood, text } = req.body;

  if (!mood || !text) {
    return res.status(400).json({ message: 'Mood and journal text are required.' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a wise motivational coach. Given someone's mood and their journal entry, respond with one short motivational quote that feels personal and encouraging.`,
        },
        {
          role: 'user',
          content: `Mood: ${mood}\nJournal Entry: ${text}`,
        },
      ],
      max_tokens: 60,
    });

    const quote = response.choices[0].message.content.trim();
    res.json({ quote });
  } catch (err) {
    console.error('GPT error:', err);
    res.status(500).json({ message: 'Failed to generate quote' });
  }
});

// New sentiment analysis endpoint
router.post('/sentiment', async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length < 10) {
    return res.status(400).json({ message: 'Journal text must be at least 10 characters long.' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an AI sentiment analyzer. Analyze the emotional tone of the given text and return ONLY one of these 5 mood emojis:
- 😊 (Happy/Positive/Excited)
- 😐 (Neutral/Calm/Indifferent)
- 😢 (Sad/Depressed/Melancholy)
- 😠 (Angry/Frustrated/Annoyed)
- 😨 (Anxious/Worried/Stressed)

Consider the overall emotional tone, word choice, and context. Return ONLY the emoji, nothing else.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      max_tokens: 10,
      temperature: 0.3, // Lower temperature for more consistent results
    });

    const suggestedMood = response.choices[0].message.content.trim();
    
    // Validate the response is one of our expected moods
    const validMoods = ['😊', '😐', '😢', '😠', '😨'];
    if (!validMoods.includes(suggestedMood)) {
      return res.status(500).json({ message: 'Failed to analyze sentiment' });
    }

    res.json({ 
      suggestedMood,
      confidence: 'high', // You could implement confidence scoring here
      analysis: `AI detected a ${getMoodDescription(suggestedMood)} tone in your entry.`
    });
  } catch (err) {
    console.error('Sentiment analysis error:', err);
    res.status(500).json({ message: 'Failed to analyze sentiment' });
  }
});

// Helper function to get mood descriptions
function getMoodDescription(mood) {
  const descriptions = {
    '😊': 'positive and happy',
    '😐': 'neutral and calm',
    '😢': 'sad and melancholic',
    '😠': 'angry and frustrated',
    '😨': 'anxious and worried'
  };
  return descriptions[mood] || 'neutral';
}

export default router;