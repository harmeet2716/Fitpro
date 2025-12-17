// Create a quick test: backend/testData.js
import mongoose from 'mongoose';
import Exercise from './models/Exercise.js';

mongoose.connect('mongodb://localhost:27017/Fitnest')
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
    // Check count
    const count = await Exercise.countDocuments();
    console.log(`📊 Total exercises: ${count}`);
    
    if (count === 0) {
      console.log('⚠️ No exercises found. Creating sample data...');
      
      const sampleExercises = [
        {
          name: 'Bench Press',
          description: 'Chest exercise using barbell',
          equipment: 'Barbell',
          muscleGroup: 'Chest',
          difficulty: 'Intermediate'
        },
        {
          name: 'Squats',
          description: 'Leg exercise',
          equipment: 'Barbell',
          muscleGroup: 'Legs',
          difficulty: 'Intermediate'
        },
        {
          name: 'Push Ups',
          description: 'Bodyweight chest exercise',
          equipment: 'Bodyweight',
          muscleGroup: 'Chest',
          difficulty: 'Beginner'
        }
      ];
      
      await Exercise.insertMany(sampleExercises);
      console.log('✅ Added sample exercises');
    }
    
    // List exercises
    const exercises = await Exercise.find().limit(5);
    console.log('📝 First 5 exercises:', exercises.map(e => ({
      id: e._id,
      name: e.name,
      muscle: e.muscleGroup,
      equipment: e.equipment
    })));
    
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });