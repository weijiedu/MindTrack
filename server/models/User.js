import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String }, // Only for email/password users
  googleId: { type: String },     // Only for Google users
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema); 