import React from 'react';

const DumbbellPressAnimation = ({ step, exercise, totalSteps, isPlaying, speed }) => {
  const pressHeight = step === 1 ? -20 : step === 2 ? -60 : 0;
  
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black">
        {/* Bench */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-56 h-8 bg-gray-700 rounded-lg">
          <div className="absolute -bottom-8 left-6 w-4 h-8 bg-gray-600 rounded-t"></div>
          <div className="absolute -bottom-8 right-6 w-4 h-8 bg-gray-600 rounded-t"></div>
        </div>
        
        {/* Lifter */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          {/* Head */}
          <div className="relative w-14 h-14 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full mx-auto"></div>
          
          {/* Torso */}
          <div className="relative w-36 h-20 bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg mt-2">
            {/* Shoulder activation */}
            <div className="absolute top-2 left-6 w-6 h-8 bg-blue-400/30 rounded-full"></div>
            <div className="absolute top-2 right-6 w-6 h-8 bg-blue-400/30 rounded-full"></div>
          </div>
          
          {/* Arms */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-20">
              <div className="w-6 h-16 bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg"></div>
              <div className="w-6 h-16 bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Dumbbells */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000"
          style={{ bottom: `${120 + pressHeight}px` }}
        >
          <div className="flex gap-32">
            <div className="w-8 h-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full"></div>
            <div className="w-8 h-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full"></div>
          </div>
        </div>
        
        {/* Muscle activation */}
        {step === 2 && (
          <>
            <div className="absolute top-40 left-1/3 w-12 h-12 bg-blue-500/10 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-1/3 w-12 h-12 bg-blue-500/10 rounded-full animate-ping"></div>
          </>
        )}
        
        {/* Press path */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-1 h-48 bg-blue-500/20 rounded-full"></div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="inline-block bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-medium">
            {step === 0 && 'Hold dumbbells at shoulders'}
            {step === 1 && 'Press upward'}
            {step === 2 && 'Lock out arms'}
            {step === 3 && 'Lower with control'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DumbbellPressAnimation;