// backend/models/Exercise.js
import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  equipment: {
    type: String,
    required: true,
    enum: ['Barbell', 'Dumbbell', 'Bodyweight', 'Machine', 'Cable', 'Kettlebell', 'Band', 'Other']
  },
  muscleGroup: {
    type: String,
    required: true,
    enum: ['Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core', 'Full Body']
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  // Add these fields that the controller uses:
  popularity: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    default: []
  },
  variations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;