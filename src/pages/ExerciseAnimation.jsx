// src/components/ExerciseAnimation.jsx
import React from 'react';

const ExerciseAnimation = ({ step, exercise, equipmentType, isPlaying, speed }) => {
  // Simple fallback animations
  const renderAnimation = () => {
    switch(equipmentType) {
      case 'barbell':
        return <BarbellAnimation step={step} />;
      case 'dumbbell':
        return <DumbbellAnimation step={step} />;
      case 'bodyweight':
        return <BodyweightAnimation step={step} />;
      case 'kettlebell':
        return <KettlebellAnimation step={step} />;
      case 'resistance_band':
        return <ResistanceBandAnimation step={step} />;
      default:
        return <GenericAnimation step={step} />;
    }
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden">
      {renderAnimation()}
    </div>
  );
};

// Simple inline animations
const BarbellAnimation = ({ step }) => {
  const height = step === 1 ? '60%' : '40%';
  return (
    <div className="relative w-full h-full">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-gray-700"></div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-gray-300 rounded-full" style={{ bottom: height }}></div>
    </div>
  );
};

const DumbbellAnimation = ({ step }) => {
  const height = step === 1 ? '70%' : '30%';
  return (
    <div className="relative w-full h-full flex items-center justify-center gap-8">
      <div className="w-6 h-24 bg-yellow-500 rounded-full" style={{ height: height }}></div>
      <div className="w-6 h-24 bg-yellow-500 rounded-full" style={{ height: height }}></div>
    </div>
  );
};

// Add similar simple animations for other equipment types...

export default ExerciseAnimation;