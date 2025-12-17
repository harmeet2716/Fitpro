import React from 'react';

const BodyweightExerciseAnimation = ({ step, exercise, totalSteps, isPlaying, speed }) => {
  const isUp = step % 2 === 0;
  
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black">
        {/* Animated Figure */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
          isUp ? 'bottom-40' : 'bottom-32'
        }`}>
          {/* Head */}
          <div className="relative w-16 h-16 bg-gradient-to-r from-teal-300 to-cyan-300 rounded-full animate-pulse">
            <div className="absolute top-4 left-4 w-4 h-2 bg-white rounded-full"></div>
            <div className="absolute top-4 right-4 w-4 h-2 bg-white rounded-full"></div>
          </div>
          
          {/* Torso */}
          <div className="relative w-32 h-40 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg mt-2">
            {/* Core activation */}
            <div className="absolute inset-2 bg-yellow-500/20 rounded-lg"></div>
          </div>
          
          {/* Arms & Legs */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-24">
              <div className="w-6 h-24 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg"></div>
              <div className="w-6 h-24 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg"></div>
            </div>
          </div>
          
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-24">
              <div className="w-6 h-24 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg"></div>
              <div className="w-6 h-24 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Motion Rings */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-blue-400/20 rounded-full animate-ping"></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-teal-400/20 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        {/* Energy Lines */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-8">
            {[0, 1, 2, 3].map(i => (
              <div 
                key={i}
                className="w-2 h-8 bg-gradient-to-t from-blue-400 to-cyan-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-900">
          <div className="h-1 bg-gray-700"></div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="inline-block bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-medium">
            {step === 0 && 'Starting position'}
            {step === 1 && 'Concentric phase'}
            {step === 2 && 'Peak contraction'}
            {step === 3 && 'Eccentric phase'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BodyweightExerciseAnimation;