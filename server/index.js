import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import journalRoutes from './routes/journalRoutes.js';
import fetch from 'node-fetch';
import gptRoutes from './routes/gpt.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mindtracker25.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Explicitly handle preflight OPTIONS requests for all routes
// app.options('*', cors({
//   origin: [
//     'http://localhost:3000',
//     'https://mindtracker25.netlify.app'
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/journals', journalRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/auth', authRoutes);

// Proxy endpoint for quote of the day
app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/quotes');
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const randomIdx = Math.floor(Math.random() * data.length);
      res.json(data[randomIdx]);
    } else {
      res.status(500).json({ q: 'You are doing great. Keep going!', a: 'MindTrack AI' });
    }
  } catch (err) {
    res.status(500).json({ q: 'You are doing great. Keep going!', a: 'MindTrack AI' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));