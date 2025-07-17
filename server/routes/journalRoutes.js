import express from 'express';
import Journal from '../models/Journal.js';

const router = express.Router();

// POST /api/journals
router.post('/', async (req, res) => {
  const { text, mood } = req.body;

  console.log('Received:', { text, mood }); 

  if (!text || !mood) {
    console.log('Missing field:', { text, mood }); 
    return res.status(400).json({ message: 'Text and mood are required.' });
  }

  try {
    const newEntry = await Journal.create({ text, mood });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/journals - get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Journal.find().sort({ date: -1 }); // newest first
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load journal entries' });
  }
});
export default router;