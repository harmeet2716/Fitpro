// src/components/SimpleExerciseAnimation.jsx
import React from 'react';

const SimpleExerciseAnimation = ({ step, exercise, equipmentType }) => {
  const steps = exercise?.tutorial?.steps || [];
  const currentStep = step || 0;
  
  // Determine color based on equipment type
  const getEquipmentColor = () => {
    switch(equipmentType) {
      case 'barbell': return 'from-red-500 to-red-700';
      case 'dumbbell': return 'from-blue-500 to-blue-700';
      case 'bodyweight': return 'from-green-500 to-green-700';
      case 'kettlebell': return 'from-purple-500 to-purple-700';
      case 'resistance_band': return 'from-yellow-500 to-yellow-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };
  
  // Get icon based on equipment type
  const getEquipmentIcon = () => {
    switch(equipmentType) {
      case 'barbell': return '🏋️';
      case 'dumbbell': return '💪';
      case 'bodyweight': return '🧍';
      case 'kettlebell': return '⚖️';
      case 'resistance_band': return '🔄';
      default: return '🏃';
    }
  };
  
  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="text-center text-white mb-8">
          <h3 className="text-2xl font-bold mb-2">{exercise?.name}</h3>
          <p className="text-gray-300">Step {currentStep + 1} of {steps.length}</p>
        </div>
        
        <div className={`w-48 h-48 bg-gradient-to-r ${getEquipmentColor()} rounded-full flex items-center justify-center mb-8 animate-pulse`}>
          <div className="text-white text-6xl">
            {getEquipmentIcon()}
          </div>
        </div>
        
        <div className="text-white text-center max-w-lg">
          <p className="text-lg mb-6 px-4">{steps[currentStep] || 'Start your exercise'}</p>
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'bg-blue-500 scale-125' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-gray-300">
              <span className="font-bold text-blue-400">Equipment:</span> {exercise?.equipment || 'Various'}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-bold text-green-400">Muscle Group:</span> {exercise?.muscleGroup || 'Full Body'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleExerciseAnimation;