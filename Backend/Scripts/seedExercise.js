// Create a seed file: backend/seedExercises.js
import mongoose from 'mongoose';
import Exercise from './models/Exercise.js';

const sampleExercises = [
  {
    name: 'Bench Press',
    description: 'Lie on bench and press barbell upwards to work chest muscles',
    equipment: 'Barbell',
    muscleGroup: 'Chest',
    difficulty: 'Intermediate',
    popularity: 500,
    rating: 225,
    ratingCount: 50,
    tags: ['chest', 'barbell', 'strength']
  },
  {
    name: 'Squats',
    description: 'Compound leg exercise that targets quads, hamstrings, and glutes',
    equipment: 'Barbell',
    muscleGroup: 'Legs',
    difficulty: 'Intermediate',
    popularity: 450,
    rating: 380,
    ratingCount: 45,
    tags: ['legs', 'barbell', 'compound']
  },
  {
    name: 'Push Ups',
    description: 'Bodyweight exercise for chest, shoulders, and triceps',
    equipment: 'Bodyweight',
    muscleGroup: 'Chest',
    difficulty: 'Beginner',
    popularity: 600,
    rating: 840,
    ratingCount: 200,
    tags: ['chest', 'bodyweight', 'beginner']
  },
  {
    name: 'Pull Ups',
    description: 'Upper body exercise focusing on back and biceps',
    equipment: 'Bodyweight',
    muscleGroup: 'Back',
    difficulty: 'Intermediate',
    popularity: 400,
    rating: 690,
    ratingCount: 150,
    tags: ['back', 'bodyweight', 'pull']
  },
  {
    name: 'Dumbbell Curls',
    description: 'Isolation exercise for biceps using dumbbells',
    equipment: 'Dumbbell',
    muscleGroup: 'Arms',
    difficulty: 'Beginner',
    popularity: 350,
    rating: 774,
    ratingCount: 180,
    tags: ['arms', 'dumbbell', 'isolation']
  }
];

mongoose.connect('mongodb://localhost:27017/Fitnest')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing exercises
    await Exercise.deleteMany({});
    console.log('Cleared existing exercises');
    
    // Insert sample exercises
    await Exercise.insertMany(sampleExercises);
    console.log(`Added ${sampleExercises.length} sample exercises`);
    
    process.exit();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });