import React from 'react';

const PullUpAnimation = ({ step, exercise, totalSteps, isPlaying, speed }) => {
  const pullHeight = step === 1 ? -20 : step === 2 ? -60 : 0;
  
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black">
        {/* Pull-up bar */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-64 h-6 bg-gray-700 rounded-full">
          <div className="absolute -bottom-4 left-8 w-4 h-4 bg-gray-600 rounded-full"></div>
          <div className="absolute -bottom-4 right-8 w-4 h-4 bg-gray-600 rounded-full"></div>
        </div>
        
        {/* Lifter */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
          style={{ marginTop: `${pullHeight}px` }}
        >
          {/* Head */}
          <div className="relative w-14 h-14 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mx-auto"></div>
          
          {/* Torso */}
          <div className="relative w-32 h-36 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mt-2">
            {/* Back muscles */}
            <div className="absolute inset-2 bg-red-500/20 rounded-lg"></div>
          </div>
          
          {/* Arms */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-16">
              <div className="w-6 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
              <div className="w-6 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Muscle activation */}
        {step === 1 && (
          <>
            <div className="absolute top-48 left-1/3 w-16 h-16 bg-red-500/10 rounded-full animate-ping"></div>
            <div className="absolute top-48 right-1/3 w-16 h-16 bg-red-500/10 rounded-full animate-ping"></div>
          </>
        )}
        
        {/* Range of motion indicator */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-48 text-center">
          <div className="text-xs text-gray-400">Chin over bar</div>
          <div className="w-full h-1 bg-green-500/30 rounded-full mt-1"></div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="inline-block bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-medium">
            {step === 0 && 'Hang with arms extended'}
            {step === 1 && 'Pull chest to bar'}
            {step === 2 && 'Chin over bar'}
            {step === 3 && 'Lower with control'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PullUpAnimation;