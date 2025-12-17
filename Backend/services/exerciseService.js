// Mock exercise data - In production, this would connect to your backend API
const mockExercises = [
  {
    _id: '1',
    name: 'Barbell Squat',
    muscleGroup: 'Legs',
    equipment: 'Barbell',
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'A compound exercise that targets the quads, hamstrings, and glutes.',
    rating: 4.8,
    ratingCount: 2450,
    tutorial: {
      steps: [
        'Set the barbell on the rack at shoulder height',
        'Step under the bar and position it across your upper back',
        'Unrack the bar and take 1-2 steps back',
        'Keep chest up, back straight, and core tight',
        'Lower down by bending hips and knees',
        'Go down until thighs are parallel to the floor',
        'Drive through heels to return to starting position'
      ],
      tips: [
        'Keep knees in line with toes',
        'Don\'t let knees cave inward',
        'Maintain neutral spine throughout'
      ],
      commonMistakes: [
        'Leaning too far forward',
        'Not going deep enough',
        'Rounding the back'
      ],
      proTips: [
        'Focus on hip mobility',
        'Use proper footwear',
        'Progress gradually'
      ],
      setsReps: '3-4 sets of 8-12 reps',
      restTime: '90-120 seconds'
    },
    effectiveVariations: [
      { name: 'Dumbbell Squat', equipment: 'Dumbbell', focus: 'Balance and stability' },
      { name: 'Goblet Squat', equipment: 'Kettlebell', focus: 'Form and depth' },
      { name: 'Front Squat', equipment: 'Barbell', focus: 'Quads and core' }
    ]
  },
  {
    _id: '2',
    name: 'Bench Press',
    muscleGroup: 'Chest',
    equipment: 'Barbell',
    equipmentType: 'barbell',
    difficulty: 'Beginner',
    description: 'Classic chest exercise for building upper body strength.',
    rating: 4.7,
    ratingCount: 3200,
    tutorial: {
      steps: [
        'Lie flat on bench with feet on floor',
        'Grip bar slightly wider than shoulder width',
        'Unrack bar and lower to mid-chest',
        'Press bar up to starting position',
        'Keep wrists straight throughout movement'
      ],
      setsReps: '3-4 sets of 6-10 reps',
      restTime: '60-90 seconds'
    }
  },
  {
    _id: '3',
    name: 'Deadlift',
    muscleGroup: 'Back',
    equipment: 'Barbell',
    equipmentType: 'barbell',
    difficulty: 'Advanced',
    description: 'Full-body exercise targeting posterior chain.',
    rating: 4.9,
    ratingCount: 1800
  },
  {
    _id: '4',
    name: 'Dumbbell Curl',
    muscleGroup: 'Arms',
    equipment: 'Dumbbell',
    equipmentType: 'dumbbell',
    difficulty: 'Beginner',
    description: 'Isolation exercise for biceps development.',
    rating: 4.5,
    ratingCount: 1500
  },
  {
    _id: '5',
    name: 'Pull-up',
    muscleGroup: 'Back',
    equipment: 'Bodyweight',
    equipmentType: 'bodyweight',
    difficulty: 'Intermediate',
    description: 'Bodyweight exercise for back and arm strength.',
    rating: 4.6,
    ratingCount: 2200
  },
  {
    _id: '6',
    name: 'Push-up',
    muscleGroup: 'Chest',
    equipment: 'Bodyweight',
    equipmentType: 'bodyweight',
    difficulty: 'Beginner',
    description: 'Fundamental bodyweight chest exercise.',
    rating: 4.4,
    ratingCount: 2800
  },
  {
    _id: '7',
    name: 'Kettlebell Swing',
    muscleGroup: 'Core',
    equipment: 'Kettlebell',
    equipmentType: 'kettlebell',
    difficulty: 'Intermediate',
    description: 'Explosive exercise for hips and posterior chain.',
    rating: 4.7,
    ratingCount: 1200
  },
  {
    _id: '8',
    name: 'Resistance Band Rows',
    muscleGroup: 'Back',
    equipment: 'Resistance Band',
    equipmentType: 'resistance_band',
    difficulty: 'Beginner',
    description: 'Back exercise using resistance bands.',
    rating: 4.3,
    ratingCount: 800
  },
  {
    _id: '9',
    name: 'Leg Press',
    muscleGroup: 'Legs',
    equipment: 'Machine',
    equipmentType: 'machine',
    difficulty: 'Beginner',
    description: 'Machine exercise for quad development.',
    rating: 4.2,
    ratingCount: 1100
  },
  {
    _id: '10',
    name: 'Cable Crossover',
    muscleGroup: 'Chest',
    equipment: 'Cable',
    equipmentType: 'cable',
    difficulty: 'Intermediate',
    description: 'Cable exercise for chest definition.',
    rating: 4.5,
    ratingCount: 900
  },
  {
    _id: '11',
    name: 'Dumbbell Shoulder Press',
    muscleGroup: 'Shoulders',
    equipment: 'Dumbbell',
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'Shoulder exercise with dumbbells.',
    rating: 4.6,
    ratingCount: 1400
  },
  {
    _id: '12',
    name: 'Barbell Row',
    muscleGroup: 'Back',
    equipment: 'Barbell',
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'Back thickness builder.',
    rating: 4.7,
    ratingCount: 1600
  }
];

// Equipment types with icons
export const equipmentTypes = [
  { id: 'all', name: 'All', description: 'All equipment types', color: 'bg-gray-100' },
  { id: 'barbell', name: 'Barbell', description: 'Barbell exercises', color: 'bg-red-100' },
  { id: 'dumbbell', name: 'Dumbbell', description: 'Dumbbell exercises', color: 'bg-blue-100' },
  { id: 'bodyweight', name: 'Bodyweight', description: 'No equipment needed', color: 'bg-green-100' },
  { id: 'kettlebell', name: 'Kettlebell', description: 'Kettlebell exercises', color: 'bg-purple-100' },
  { id: 'resistance_band', name: 'Resistance Band', description: 'Band exercises', color: 'bg-yellow-100' },
  { id: 'machine', name: 'Machine', description: 'Gym machines', color: 'bg-teal-100' },
  { id: 'cable', name: 'Cable', description: 'Cable machine', color: 'bg-indigo-100' }
];

// Muscle groups
export const muscleGroups = [
  'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'
];

// Difficulties
export const difficulties = [
  'Beginner', 'Intermediate', 'Advanced'
];

// Get exercises with filtering
export const getExercises = async (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockExercises];

      // Apply filters
      if (filters.equipmentType && filters.equipmentType !== 'all') {
        filtered = filtered.filter(ex => ex.equipmentType === filters.equipmentType);
      }

      if (filters.muscleGroup && filters.muscleGroup !== 'all') {
        filtered = filtered.filter(ex => ex.muscleGroup === filters.muscleGroup);
      }

      if (filters.difficulty && filters.difficulty !== 'all') {
        filtered = filtered.filter(ex => ex.difficulty === filters.difficulty);
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(ex => 
          ex.name.toLowerCase().includes(searchTerm) ||
          ex.description.toLowerCase().includes(searchTerm) ||
          ex.muscleGroup.toLowerCase().includes(searchTerm)
        );
      }

      // Apply sorting
      if (filters.sortBy) {
        filtered.sort((a, b) => {
          if (filters.sortBy === 'name') {
            return a.name.localeCompare(b.name) * (filters.sortOrder === 'desc' ? -1 : 1);
          }
          if (filters.sortBy === 'rating') {
            return (b.rating - a.rating) * (filters.sortOrder === 'desc' ? -1 : 1);
          }
          if (filters.sortBy === 'difficulty') {
            const diffOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
            return (diffOrder[a.difficulty] - diffOrder[b.difficulty]) * (filters.sortOrder === 'desc' ? -1 : 1);
          }
          return 0;
        });
      }

      // Pagination
      const page = filters.page || 1;
      const limit = filters.limit || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginated = filtered.slice(startIndex, endIndex);

      resolve({
        data: paginated,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit)
      });
    }, 500); // Simulate network delay
  });
};

// Get exercise by ID
export const getExerciseById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exercise = mockExercises.find(ex => ex._id === id);
      resolve(exercise || null);
    }, 300);
  });
};

// Get variations for an exercise
export const getVariations = async (exerciseId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const variations = [
        'Alternate Equipment Variation',
        'Different Grip/Stance',
        'Tempo Variation (slow eccentric)',
        'Partial Range of Motion',
        'Drop Sets',
        'Superset Variation'
      ];
      resolve(variations);
    }, 300);
  });
};

// Get most effective exercises for equipment
export const getMostEffectiveForEquipment = async (equipmentType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const equipmentExercises = mockExercises
        .filter(ex => ex.equipmentType === equipmentType)
        .map(ex => ex.name);
      
      // Return top 5-8 exercises
      resolve(equipmentExercises.slice(0, 8));
    }, 300);
  });
};

// Search exercises
export const searchExercises = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve(mockExercises.slice(0, 10));
      }

      const searchTerm = query.toLowerCase();
      const results = mockExercises.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm) ||
        ex.muscleGroup.toLowerCase().includes(searchTerm) ||
        ex.description.toLowerCase().includes(searchTerm)
      ).slice(0, 10);

      resolve(results);
    }, 300);
  });
};

// Get exercises by muscle group
export const getExercisesByMuscleGroup = async (muscleGroup) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockExercises.filter(ex => ex.muscleGroup === muscleGroup);
      resolve(results);
    }, 300);
  });
};

// Get beginner exercises
export const getBeginnerExercises = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockExercises.filter(ex => ex.difficulty === 'Beginner');
      resolve(results);
    }, 300);
  });
};

// Get exercises by equipment
export const getExercisesByEquipment = async (equipment) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockExercises.filter(ex => ex.equipment === equipment);
      resolve(results);
    }, 300);
  });
};

// Get random workout
export const getRandomWorkout = async (count = 5) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shuffled = [...mockExercises].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, count));
    }, 300);
  });
};

// Save favorite exercise
export const saveFavorite = async (userId, exerciseId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Saved favorite: User ${userId}, Exercise ${exerciseId}`);
      resolve({ success: true });
    }, 300);
  });
};

// Remove favorite exercise
export const removeFavorite = async (userId, exerciseId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Removed favorite: User ${userId}, Exercise ${exerciseId}`);
      resolve({ success: true });
    }, 300);
  });
};

// Get user favorites
export const getUserFavorites = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return random favorites for demo
      const shuffled = [...mockExercises].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, 5));
    }, 300);
  });
};

// Get exercise suggestions based on workout history
export const getSuggestions = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suggestions = mockExercises
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      resolve(suggestions);
    }, 300);
  });
};

export default {
  getExercises,
  getExerciseById,
  getVariations,
  getMostEffectiveForEquipment,
  searchExercises,
  getExercisesByMuscleGroup,
  getBeginnerExercises,
  getExercisesByEquipment,
  getRandomWorkout,
  saveFavorite,
  removeFavorite,
  getUserFavorites,
  getSuggestions,
  equipmentTypes,
  muscleGroups,
  difficulties
};