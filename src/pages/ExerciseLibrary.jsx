// frontend/src/pages/ExerciseLibrary.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Dumbbell, Target, Flame, Zap, Award, Clock, Star } from 'lucide-react';

const ExerciseLibrary = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch exercises from API
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/exercises');
        const data = await response.json();
        setExercises(data.data || []);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExercises();
  }, []);

  const exerciseCategories = [
    { id: 'all', name: 'All Exercises', icon: Dumbbell, count: exercises.length },
    { id: 'chest', name: 'Chest', icon: Target, count: exercises.filter(e => e.muscleGroup === 'Chest').length },
    { id: 'back', name: 'Back', icon: Zap, count: exercises.filter(e => e.muscleGroup === 'Back').length },
    { id: 'legs', name: 'Legs', icon: Flame, count: exercises.filter(e => e.muscleGroup === 'Legs').length },
    { id: 'arms', name: 'Arms', icon: Award, count: exercises.filter(e => e.muscleGroup === 'Arms').length },
    { id: 'core', name: 'Core', icon: Clock, count: exercises.filter(e => e.muscleGroup === 'Core').length },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl shadow p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Exercise Library</h1>
          <p className="text-lg text-gray-600">
            Browse {exercises.length}+ exercises with detailed tutorials and form guides
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search exercises..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-200">
                <Filter className="w-5 h-5" />
                Filters
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 rounded-lg font-medium flex items-center gap-2 ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 rounded-lg font-medium flex items-center gap-2 ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {exerciseCategories.map(category => (
              <div key={category.id} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 cursor-pointer transition-colors">
                <category.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-bold">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} exercises</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map(exercise => (
            <div key={exercise._id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Dumbbell className="w-16 h-16 text-white opacity-50" />
                </div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold ${
                  exercise.difficulty === 'Beginner' ? 'bg-green-500 text-white' :
                  exercise.difficulty === 'Intermediate' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {exercise.difficulty}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{exercise.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{exercise.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {exercise.equipment}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {exercise.muscleGroup}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold">{exercise.rating || 4.5}</span>
                  </div>
                  <Link
                    to={`/exercises/${exercise._id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  >
                    View Tutorial
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Exercises</p>
            <p className="text-2xl font-bold">{exercises.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Muscle Groups</p>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Equipment Types</p>
            <p className="text-2xl font-bold">7</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Tutorial Videos</p>
            <p className="text-2xl font-bold">{exercises.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseLibrary;