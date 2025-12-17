// frontend/src/components/MuscleHighlight.jsx
const MuscleHighlight = ({ exercise, isActive }) => {
  const muscleGroups = {
    'Chest': {
      path: 'M 50,80 Q 80,60 110,80 Q 140,100 110,120 Q 80,140 50,120 Z',
      color: '#EF4444',
      labelPosition: { x: 80, y: 100 }
    },
    'Back': {
      path: 'M 40,60 Q 80,40 120,60 Q 160,80 120,100 Q 80,120 40,100 Z',
      color: '#3B82F6',
      labelPosition: { x: 80, y: 80 }
    },
    'Legs': {
      paths: [
        'M 60,140 L 60,200 L 40,200 Z', // Left leg
        'M 100,140 L 100,200 L 120,200 Z' // Right leg
      ],
      color: '#10B981',
      labelPosition: { x: 80, y: 170 }
    },
    'Shoulders': {
      path: 'M 30,50 Q 80,30 130,50 Q 180,70 130,90 Q 80,110 30,90 Z',
      color: '#8B5CF6',
      labelPosition: { x: 80, y: 70 }
    },
    'Arms': {
      paths: [
        'M 20,70 L 10,120 L 30,120 Z', // Left arm
        'M 140,70 L 150,120 L 130,120 Z' // Right arm
      ],
      color: '#F59E0B',
      labelPosition: { x: 80, y: 100 }
    },
    'Core': {
      path: 'M 50,90 Q 80,85 110,90 Q 140,95 110,110 Q 80,125 50,110 Z',
      color: '#06B6D4',
      labelPosition: { x: 80, y: 100 }
    }
  };

  const muscle = muscleGroups[exercise.muscleGroup] || muscleGroups['Chest'];

  return (
    <div className="relative w-full h-64 bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 160 240">
        {/* Body Outline */}
        <path
          d="M 80,20 Q 120,40 120,80 Q 120,120 100,140 Q 80,160 60,140 Q 40,120 40,80 Q 40,40 80,20 Z"
          fill="none"
          stroke="#4B5563"
          strokeWidth="2"
        />
        
        {/* Highlighted Muscle */}
        {muscle.paths ? (
          muscle.paths.map((path, index) => (
            <path
              key={index}
              d={path}
              fill={muscle.color}
              className={`${isActive ? 'animate-pulse opacity-80' : 'opacity-40'}`}
            />
          ))
        ) : (
          <path
            d={muscle.path}
            fill={muscle.color}
            className={`${isActive ? 'animate-pulse opacity-80' : 'opacity-40'}`}
          />
        )}
        
        {/* Muscle Label */}
        <text
          x={muscle.labelPosition.x}
          y={muscle.labelPosition.y}
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="bold"
          className="drop-shadow-lg"
        >
          {exercise.muscleGroup}
        </text>
        
        {/* Animated Dots */}
        {isActive && (
          <>
            <circle cx="40" cy="60" r="2" fill="white" className="animate-ping">
              <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="120" cy="60" r="2" fill="white" className="animate-ping" style={{animationDelay: '0.5s'}}>
              <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full" style={{backgroundColor: muscle.color}}></div>
          <span className="text-white text-sm font-medium">Primary Muscle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span className="text-gray-300 text-sm">Secondary Muscles</span>
        </div>
      </div>
    </div>
  );
};

export default MuscleHighlight;