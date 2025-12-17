import React from 'react';

const BarbellSquatAnimation = ({ step, exercise, totalSteps, isPlaying, speed }) => {
  const squatDepth = step === 1 ? 40 : step === 2 ? 80 : 20;
  
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black">
        {/* Lifter */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          {/* Head */}
          <div className="relative w-16 h-16 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full mx-auto"></div>
          
          {/* Torso */}
          <div className="relative w-40 h-48 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg mt-2">
            {/* Core activation */}
            <div className="absolute inset-2 bg-yellow-500/20 rounded-lg"></div>
          </div>
          
          {/* Legs */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
            style={{ height: `${squatDepth}px` }}
          >
            <div className="relative">
              <div className="absolute -left-12 w-8 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg transform -rotate-45 origin-bottom"></div>
              <div className="absolute -right-12 w-8 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg transform rotate-45 origin-bottom"></div>
            </div>
          </div>
        </div>
        
        {/* Barbell */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-64 h-4 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full shadow-lg"></div>
            <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-7 h-7 bg-blue-700 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-7 h-7 bg-blue-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-900"></div>
        
        {/* Muscle activation */}
        {step === 1 && (
          <>
            <div className="absolute bottom-40 left-1/3 w-16 h-16 bg-red-500/10 rounded-full animate-ping"></div>
            <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-red-500/10 rounded-full animate-ping"></div>
          </>
        )}
        
        {/* Depth indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <div className="w-32 h-1 bg-orange-500/50 rounded-full"></div>
            <div className="text-xs text-orange-300 mt-1">PARALLEL</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="inline-block bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-medium">
            {step === 0 && 'Stand with barbell'}
            {step === 1 && 'Initiate descent'}
            {step === 2 && 'Reach parallel'}
            {step === 3 && 'Drive upward'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BarbellSquatAnimation;