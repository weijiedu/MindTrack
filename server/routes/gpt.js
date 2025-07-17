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

export default router;