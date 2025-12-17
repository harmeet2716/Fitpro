import React from 'react';

const KettlebellSwingAnimation = ({ step, exercise, totalSteps, isPlaying, speed }) => {
  const swingHeight = step === 1 ? 40 : step === 2 ? 120 : 80;
  const bodyAngle = step === 1 ? 20 : step === 2 ? 0 : 10;
  
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Lifter */}
        <div 
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
          style={{ transform: `translateX(-50%) rotate(${bodyAngle}deg)` }}
        >
          {/* Head */}
          <div className="relative w-12 h-12 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-full mx-auto"></div>
          
          {/* Torso */}
          <div className="relative w-28 h-32 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg mt-2">
            {/* Core activation */}
            <div className="absolute inset-2 bg-green-500/20 rounded-lg"></div>
          </div>
          
          {/* Legs */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-12">
              <div className="w-6 h-16 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg"></div>
              <div className="w-6 h-16 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Kettlebell */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000"
          style={{ bottom: `${swingHeight}px` }}
        >
          <div className="relative">
            {/* Kettlebell body */}
            <div className="w-12 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg">
              {/* Handle */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gray-400 rounded-t-lg"></div>
              {/* Base */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gradient-to-r from-red-700 to-orange-700 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Swing path */}
        <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2 w-1 h-48 bg-purple-500/20 rounded-full"></div>
        
        {/* Hip hinge indicator */}
        {step === 1 && (
          <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2">
            <div className="animate-pulse">
              <div className="w-32 h-1 bg-orange-500 rounded-full"></div>
              <div className="text-center text-xs text-orange-300 mt-1">HIP HINGE</div>
            </div>
          </div>
        )}
        
        {/* Power zone */}
        {step === 2 && (
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-green-500/10 rounded-full animate-ping"></div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="inline-block bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-medium">
            {step === 0 && 'Starting position'}
            {step === 1 && 'Hip hinge back'}
            {step === 2 && 'Explosive hip drive'}
            {step === 3 && 'Control descent'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KettlebellSwingAnimation;