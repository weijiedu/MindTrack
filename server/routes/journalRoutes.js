import express from 'express';
import Journal from '../models/Journal.js';
import { requireAuth } from './auth.js';

const router = express.Router();

// GET /api/journals (user-specific)
router.get('/', requireAuth, async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.userId }).sort({ date: -1 });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch journals.' });
  }
});

// POST /api/journals (user-specific)
router.post('/', requireAuth, async (req, res) => {
  const { text, mood } = req.body;

  if (!text || !mood) {
    return res.status(400).json({ message: 'Text and mood are required.' });
  }

  try {
    const newEntry = await Journal.create({ text, mood, user: req.userId });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;