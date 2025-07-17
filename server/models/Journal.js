import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  text: { type: String, required: true },
  mood: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Journal', journalSchema);