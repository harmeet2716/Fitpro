// frontend/src/pages/WorkoutBuilder.jsx
import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Clock, 
  Target, 
  Dumbbell, 
  Users, 
  Calendar,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const WorkoutBuilder = () => {
  const [workoutName, setWorkoutName] = useState('My Workout Plan');
  const [exercises, setExercises] = useState([
    { id: 1, name: 'Bench Press', sets: 3, reps: 8, rest: 60 },
    { id: 2, name: 'Squats', sets: 4, reps: 10, rest: 90 },
    { id: 3, name: 'Pull-ups', sets: 3, reps: 12, rest: 60 },
  ]);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const addExercise = () => {
    setExercises([...exercises, { 
      id: exercises.length + 1, 
      name: 'New Exercise', 
      sets: 3, 
      reps: 10, 
      rest: 60 
    }]);
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const calculateTotalTime = () => {
    return exercises.reduce((total, ex) => {
      const exerciseTime = ex.sets * (ex.rest + 30); // 30 seconds per set execution
      return total + exerciseTime;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Workout Builder</h1>
          <p className="text-lg text-gray-600">
            Create and customize your perfect workout routine
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workout Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <input
                  type="text"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  className="text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-0"
                />
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700">
                  <Save className="w-5 h-5" />
                  Save Workout
                </button>
              </div>

              {/* Exercises List */}
              <div className="space-y-4">
                {exercises.map(exercise => (
                  <div key={exercise.id} className="border rounded-xl p-4 hover:border-blue-500 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg">{exercise.name}</h3>
                      <button
                        onClick={() => removeExercise(exercise.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sets</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={exercise.sets}
                          onChange={(e) => {
                            const newExercises = exercises.map(ex => 
                              ex.id === exercise.id ? { ...ex, sets: parseInt(e.target.value) } : ex
                            );
                            setExercises(newExercises);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reps</label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={exercise.reps}
                          onChange={(e) => {
                            const newExercises = exercises.map(ex => 
                              ex.id === exercise.id ? { ...ex, reps: parseInt(e.target.value) } : ex
                            );
                            setExercises(newExercises);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rest (s)</label>
                        <input
                          type="number"
                          min="0"
                          max="300"
                          value={exercise.rest}
                          onChange={(e) => {
                            const newExercises = exercises.map(ex => 
                              ex.id === exercise.id ? { ...ex, rest: parseInt(e.target.value) } : ex
                            );
                            setExercises(newExercises);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Exercise Button */}
              <button
                onClick={addExercise}
                className="w-full mt-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Exercise
              </button>
            </div>
          </div>

          {/* Workout Preview */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-6">Workout Preview</h3>
              
              {/* Timer */}
              <div className="mb-6">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold font-mono mb-2">
                    {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setIsRunning(!isRunning)}
                      className={`p-3 rounded-full ${isRunning ? 'bg-yellow-600' : 'bg-green-600'} text-white`}
                    >
                      {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => setTimer(0)}
                      className="p-3 bg-red-600 text-white rounded-full"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Workout Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Exercises</span>
                  <span className="font-bold">{exercises.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Estimated Time</span>
                  <span className="font-bold">{Math.floor(calculateTotalTime() / 60)} min</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Sets</span>
                  <span className="font-bold">{exercises.reduce((sum, ex) => sum + ex.sets, 0)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Reps</span>
                  <span className="font-bold">{exercises.reduce((sum, ex) => sum + (ex.sets * ex.reps), 0)}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h4 className="font-bold mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-200">
                    <Calendar className="w-5 h-5" />
                    Schedule
                  </button>
                  <button className="p-3 bg-green-100 text-green-700 rounded-lg flex items-center justify-center gap-2 hover:bg-green-200">
                    <Users className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutBuilder;