// backend/controllers/exerciseController.js
import Exercise from '../models/Exercise.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all exercises with filtering
// @route   GET /api/exercises
// @access  Public
const getExercises = asyncHandler(async (req, res) => {
  try {
    const {
      equipment,
      muscleGroup,
      difficulty,
      search,
      limit = 20,
      page = 1
    } = req.query;

    // Build query
    const query = {};

    if (equipment && equipment !== 'all') {
      query.equipment = equipment;
    }

    if (muscleGroup && muscleGroup !== 'all') {
      query.muscleGroup = muscleGroup;
    }

    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { muscleGroup: { $regex: search, $options: 'i' } },
        { equipment: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Get exercises
    const exercises = await Exercise.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count
    const total = await Exercise.countDocuments(query);

    res.json({
      success: true,
      count: exercises.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: exercises,
      filters: {
        equipment: ['Barbell', 'Dumbbell', 'Bodyweight', 'Machine', 'Cable', 'Kettlebell'],
        muscleGroup: ['Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core', 'Full Body'],
        difficulty: ['Beginner', 'Intermediate', 'Advanced']
      }
    });
  } catch (error) {
    console.error('Error in getExercises:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.toString()
    });
  }
});

// @desc    Get single exercise
// @route   GET /api/exercises/:id
// @access  Public
const getExercise = asyncHandler(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      res.status(404);
      throw new Error('Exercise not found');
    }

    // Increment popularity
    exercise.popularity += 1;
    await exercise.save();

    res.json({
      success: true,
      data: exercise
    });
  } catch (error) {
    console.error('Error in getExercise:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new exercise
// @route   POST /api/exercises
// @access  Private/Admin
const createExercise = asyncHandler(async (req, res) => {
  try {
    const exercise = new Exercise({
      ...req.body,
      createdBy: req.user?._id
    });

    const createdExercise = await exercise.save();
    
    res.status(201).json({
      success: true,
      data: createdExercise
    });
  } catch (error) {
    console.error('Error in createExercise:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update exercise
// @route   PUT /api/exercises/:id
// @access  Private/Admin
const updateExercise = asyncHandler(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      res.status(404);
      throw new Error('Exercise not found');
    }

    // Check if user is admin or creator
    if (!req.user?.isAdmin && exercise.createdBy?.toString() !== req.user?._id?.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    Object.keys(req.body).forEach(key => {
      exercise[key] = req.body[key];
    });

    const updatedExercise = await exercise.save();
    
    res.json({
      success: true,
      data: updatedExercise
    });
  } catch (error) {
    console.error('Error in updateExercise:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete exercise
// @route   DELETE /api/exercises/:id
// @access  Private/Admin
const deleteExercise = asyncHandler(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      res.status(404);
      throw new Error('Exercise not found');
    }

    if (!req.user?.isAdmin && exercise.createdBy?.toString() !== req.user?._id?.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await exercise.deleteOne();
    
    res.json({
      success: true,
      message: 'Exercise removed'
    });
  } catch (error) {
    console.error('Error in deleteExercise:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Rate exercise
// @route   POST /api/exercises/:id/rate
// @access  Private
const rateExercise = asyncHandler(async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (rating < 1 || rating > 5) {
      res.status(400);
      throw new Error('Rating must be between 1 and 5');
    }

    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      res.status(404);
      throw new Error('Exercise not found');
    }

    // Simple rating calculation
    const totalRating = exercise.rating + rating;
    const totalCount = exercise.ratingCount + 1;
    const averageRating = totalRating / totalCount;

    exercise.rating = totalRating;
    exercise.ratingCount = totalCount;
    
    await exercise.save();
    
    res.json({
      success: true,
      data: {
        averageRating: averageRating.toFixed(2),
        ratingCount: totalCount
      }
    });
  } catch (error) {
    console.error('Error in rateExercise:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get exercise statistics
// @route   GET /api/exercises/stats
// @access  Public
const getExerciseStats = asyncHandler(async (req, res) => {
  try {
    const totalExercises = await Exercise.countDocuments();
    
    const equipmentStats = await Exercise.aggregate([
      { $group: { _id: '$equipment', count: { $sum: 1 } } }
    ]);
    
    const muscleGroupStats = await Exercise.aggregate([
      { $group: { _id: '$muscleGroup', count: { $sum: 1 } } }
    ]);
    
    const difficultyStats = await Exercise.aggregate([
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);

    const equipment = {};
    equipmentStats.forEach(stat => {
      equipment[stat._id] = stat.count;
    });

    const muscleGroup = {};
    muscleGroupStats.forEach(stat => {
      muscleGroup[stat._id] = stat.count;
    });

    const difficulty = {};
    difficultyStats.forEach(stat => {
      difficulty[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: {
        totalExercises,
        equipment,
        muscleGroup,
        difficulty
      }
    });
  } catch (error) {
    console.error('Error in getExerciseStats:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get similar exercises
// @route   GET /api/exercises/:id/similar
// @access  Public
const getSimilarExercises = asyncHandler(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    
    if (!exercise) {
      res.status(404);
      throw new Error('Exercise not found');
    }

    const similarExercises = await Exercise.find({
      $or: [
        { muscleGroup: exercise.muscleGroup },
        { equipment: exercise.equipment }
      ],
      _id: { $ne: exercise._id }
    })
    .sort({ popularity: -1 })
    .limit(5)
    .select('name equipment muscleGroup difficulty rating popularity');

    res.json({
      success: true,
      data: similarExercises
    });
  } catch (error) {
    console.error('Error in getSimilarExercises:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Export all functions
export {
  getExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
  rateExercise,
  getExerciseStats,
  getSimilarExercises
};