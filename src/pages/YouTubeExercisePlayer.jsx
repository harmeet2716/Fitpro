import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const YouTubeExercisePlayer = ({ exerciseName, equipmentType, step = 0, showVariations = false }) => {
  const [videoId, setVideoId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [channel, setChannel] = useState('');
  const [player, setPlayer] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Map exercises to YouTube video IDs
  const exerciseVideos = {
    // Barbell exercises
    'Barbell Squat': 'SW_C1A-rejs', // Athlean-X
    'Bench Press': '4Y2ZdHCOXok', // Jeff Nippard
    'Deadlift': 'op9kVnSps6Q', // Alan Thrall
    'Barbell Row': 'rvSMcN6gRYY', // Jeremy Ethier
    
    // Dumbbell exercises
    'Dumbbell Curl': 'ykJmrZ5v0Oo', // Athlean-X
    'Dumbbell Shoulder Press': 'qEwKCR5JCog', // Jeff Nippard
    
    // Bodyweight exercises
    'Pull-up': 'eGo4IYlbE5g', // Athlean-X
    'Push-up': 'IODxDxX7oi4', // Calisthenicmovement
    
    // Kettlebell exercises
    'Kettlebell Swing': 'YSxHifyI6o8', // Pavel Tsatsouline
    
    // Other exercises - fallback IDs
    'default': 'SW_C1A-rejs' // Athlean-X squat tutorial
  };

  // Map equipment to popular fitness channels
  const channelMap = {
    barbell: { name: 'Athlean-X', color: 'bg-red-600' },
    dumbbell: { name: 'Jeff Nippard', color: 'bg-blue-600' },
    bodyweight: { name: 'Calisthenicmovement', color: 'bg-green-600' },
    kettlebell: { name: 'Pavel Tsatsouline', color: 'bg-purple-600' },
    resistance_band: { name: 'Jeremy Ethier', color: 'bg-yellow-600' },
    machine: { name: 'Scott Herman', color: 'bg-teal-600' },
    cable: { name: 'Buff Dudes', color: 'bg-orange-600' },
    default: { name: 'Athlean-X', color: 'bg-red-600' }
  };

  useEffect(() => {
    // Find video ID for the exercise
    let foundVideoId = exerciseVideos[exerciseName];
    if (!foundVideoId) {
      // Try to find by partial match
      for (const [key, id] of Object.entries(exerciseVideos)) {
        if (exerciseName.includes(key) || key.includes(exerciseName)) {
          foundVideoId = id;
          break;
        }
      }
    }
    
    // Fallback to default
    if (!foundVideoId) {
      foundVideoId = exerciseVideos.default;
    }
    
    setVideoId(foundVideoId);
    
    // Set channel info
    const channelInfo = channelMap[equipmentType] || channelMap.default;
    setChannel(channelInfo.name);
    setVideoTitle(`${exerciseName} - Proper Form Tutorial`);
  }, [exerciseName, equipmentType]);

  // YouTube player options
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: showVariations ? 0 : 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 1,
      iv_load_policy: 3,
      disablekb: 0,
      enablejsapi: 1,
      origin: window.location.origin
    },
  };

  // Event handlers for YouTube player
  const onReady = (event) => {
    setPlayer(event.target);
    setIsReady(true);
    
    // Update time every second
    setInterval(() => {
      if (event.target && event.target.getCurrentTime) {
        const time = event.target.getCurrentTime();
        setCurrentTime(Math.floor(time));
      }
    }, 1000);
  };

  const onStateChange = (event) => {
    // Handle player state changes
    // event.data can be:
    // -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
  };

  const onError = (event) => {
    console.error('YouTube Player Error:', event.data);
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!videoId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-white text-4xl mb-4 animate-pulse">🎬</div>
          <h3 className="text-white text-xl mb-2">Loading YouTube Tutorial</h3>
          <p className="text-gray-400">Professional form demonstration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* YouTube Player */}
      <div className="w-full h-full relative">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          onError={onError}
          className="absolute inset-0 w-full h-full"
        />
      </div>
      
      {/* Overlay info */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 max-w-md pointer-events-auto">
          <h3 className="text-white font-bold text-lg mb-1">{videoTitle}</h3>
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded text-xs font-bold ${(channelMap[equipmentType] || channelMap.default).color} text-white`}>
              {channel}
            </div>
            <span className="text-gray-300 text-sm">Professional Tutorial</span>
          </div>
        </div>
        
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 pointer-events-auto">
          <div className="text-white text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span>Step {step + 1}</span>
            </div>
            <div className="text-gray-300 text-xs">Watch for proper form</div>
          </div>
        </div>
      </div>
      
      {/* Bottom controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
        {showVariations ? (
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 max-w-md pointer-events-auto">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              Variation Mode
            </h4>
            <p className="text-gray-300 text-sm">
              Watch different equipment variations and techniques for this exercise.
              Compare form points with the main tutorial.
            </p>
          </div>
        ) : (
          <div className="flex gap-3 pointer-events-none">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 pointer-events-auto">
              <div className="text-white text-sm font-bold flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Form Tip
              </div>
              <div className="text-gray-300 text-xs">Focus on controlled movement</div>
            </div>
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 pointer-events-auto">
              <div className="text-white text-sm font-bold flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                Progression
              </div>
              <div className="text-gray-300 text-xs">Add weight gradually</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Time display */}
      {isReady && (
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 pointer-events-auto">
          <div className="text-white text-sm font-mono">{formatTime(currentTime)}</div>
        </div>
      )}
      
      {/* Loading indicator */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <div className="text-white text-xl mb-2">Loading Professional Tutorial...</div>
            <div className="text-gray-400 text-sm">From {channel} channel</div>
            <div className="text-gray-500 text-xs mt-2">Video ID: {videoId}</div>
          </div>
        </div>
      )}
      
      {/* Player controls overlay (optional advanced controls) */}
      {player && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          <button
            onClick={() => player.seekTo(currentTime - 10)}
            className="bg-black/70 text-white p-2 rounded-full pointer-events-auto hover:bg-black/90"
            title="Rewind 10s"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => player.pauseVideo()}
            className="bg-black/70 text-white p-2 rounded-full pointer-events-auto hover:bg-black/90"
            title="Pause"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => player.playVideo()}
            className="bg-black/70 text-white p-2 rounded-full pointer-events-auto hover:bg-black/90"
            title="Play"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => player.seekTo(currentTime + 10)}
            className="bg-black/70 text-white p-2 rounded-full pointer-events-auto hover:bg-black/90"
            title="Forward 10s"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0zm8 0a1 1 0 010-1.414L16.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubeExercisePlayer;