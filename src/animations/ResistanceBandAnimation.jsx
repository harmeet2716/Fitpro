import React from 'react';

const ResistanceBandAnimation = ({ step, exercise, totalSteps, isPlaying, speed }) => {
  const bandStretch = step === 1 ? 20 : step === 2 ? 40 : 0;
  
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black">
        {/* Anchor point */}
        <div className="absolute top-1/2 left-1/4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          </div>
        </div>
        
        {/* Lifter */}
        <div className="absolute top-1/2 right-1/3">
          {/* Head */}
          <div className="relative w-12 h-12 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full mx-auto"></div>
          
          {/* Torso */}
          <div className="relative w-24 h-28 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg mt-2"></div>
          
          {/* Arm */}
          <div className="absolute top-4 -left-8">
            <div className="w-8 h-24 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg"></div>
          </div>
        </div>
        
        {/* Resistance Band */}
        <div className="absolute top-1/2 left-1/4 transform translate-x-12">
          <div 
            className="relative transition-all duration-1000"
            style={{ width: `${100 + bandStretch}px` }}
          >
            {/* Band line */}
            <div className="w-full h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full"></div>
            
            {/* Band handles */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full"></div>
            
            {/* Tension indicator */}
            {step === 2 && (
              <div className="absolute inset-0 border-2 border-red-500/30 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
        
        {/* Tension lines */}
        {step >= 1 && (
          <>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500/20 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-red-500/10 rounded-full animate-ping" style={{animationDelay: '0.1s'}}></div>
          </>
        )}
        
        {/* Resistance indicator */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <div className={`text-sm font-bold transition-all duration-300 ${step === 2 ? 'text-red-400 scale-110' : 'text-gray-400'}`}>
              {step === 0 && 'No Tension'}
              {step === 1 && 'Light Tension'}
              {step === 2 && 'Peak Tension'}
              {step === 3 && 'Releasing'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="inline-block bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-medium">
            {step === 0 && 'Starting position'}
            {step === 1 && 'Begin pull'}
            {step === 2 && 'Peak contraction'}
            {step === 3 && 'Control release'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResistanceBandAnimation;