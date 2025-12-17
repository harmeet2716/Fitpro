import React from 'react';

const BarbellBenchPressAnimation = ({ step, exercise, totalSteps, isPlaying, speed }) => {
  const barbellHeight = step === 1 ? 60 : 140;
  
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black">
        {/* Bench */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-gray-700 rounded-lg">
          <div className="absolute -bottom-8 left-8 w-4 h-8 bg-gray-600 rounded-t"></div>
          <div className="absolute -bottom-8 right-8 w-4 h-8 bg-gray-600 rounded-t"></div>
        </div>
        
        {/* Lifter */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <div className="relative w-16 h-16 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mx-auto">
            <div className="absolute top-4 left-4 w-4 h-2 bg-white rounded-full"></div>
            <div className="absolute top-4 right-4 w-4 h-2 bg-white rounded-full"></div>
          </div>
          
          <div className="relative w-48 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg mt-2">
            <div className="absolute top-4 left-1/4 w-8 h-12 bg-red-400/30 rounded-full"></div>
            <div className="absolute top-4 right-1/4 w-8 h-12 bg-red-400/30 rounded-full"></div>
          </div>
          
          <div className="absolute top-12 -left-16 w-16 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 transform -rotate-45 origin-right rounded-lg"></div>
          <div className="absolute top-12 -right-16 w-16 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 transform rotate-45 origin-left rounded-lg"></div>
        </div>
        
        {/* Barbell */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000"
          style={{ bottom: `${barbellHeight}px` }}
        >
          <div className="relative">
            <div className="w-72 h-4 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full shadow-lg"></div>
            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-red-700 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-red-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {step >= 1 && step <= 3 && (
          <>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-500/10 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-red-500/10 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
          </>
        )}
        
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-2 h-32 bg-blue-500/20 rounded-full"></div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="inline-block bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-medium">
            {step === 0 && 'Unrack the barbell'}
            {step === 1 && 'Lower to chest'}
            {step === 2 && 'Press upward'}
            {step === 3 && 'Lock out arms'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BarbellBenchPressAnimation;