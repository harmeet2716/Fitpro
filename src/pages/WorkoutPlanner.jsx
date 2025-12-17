// Complete WorkoutPlanner.jsx with all imports
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import * as exerciseService from "../services/exerciseService";
import YouTubeExercisePlayer from './YouTubeExercisePlayer';

// Essential Lucide icons only
import {
  Search,
  Dumbbell,
  Plus,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Star,
  Target,
  Users,
  TrendingUp,
  Flame,
  Zap,
  Award,
  Clock,
  AlertCircle,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Video,
  BarChart,
  RefreshCw,
  Settings,
  Brain,
  Share2,
  Download,
  Filter,
  Grid,
  List,
  ThumbsUp,
  HelpCircle,
  SkipBack,
  SkipForward,
  Maximize,
  Activity,
  Package,
  Sparkles,
  Shield,
  GitBranch,
  GitPullRequest,
  ArrowRightLeft,
  Crown,
  Medal,
  Crosshair,
  Navigation,
  X,
  ChevronDown,
  ChevronUp,
  Eye,
  MessageSquare,
  Home,
  Calendar,
  Bell,
  BellOff,
  Lock,
  Unlock,
  User,
  Users as UsersIcon,
  Settings as SettingsIcon,
  Hexagon,
  Layers,
  Menu,
  LogOut,
  Apple,
  Trophy,
  Moon,
  Sun,
  Footprints,
  Droplets,
  Bot,
  Send,
  Maximize2,
  Minimize2,
  Edit,
  Save,
  ListChecks,
  BookOpen,
  ChartBar,
  FileText,
  MessageCircle,
  Cloud,
  CloudRain,
  Thermometer,
  Wind,
  CloudLightning,
  Umbrella,
  Sunrise,
  Sunset
} from "lucide-react";

export default function WorkoutPlanner() {
  const navigate = useNavigate(); // Now this will work
  
  const [exercises, setExercises] = useState([]);
  const [filters, setFilters] = useState({
    equipmentType: 'all',
    muscleGroup: 'all',
    difficulty: 'all',
    search: '',
    page: 1,
    limit: 12,
    sortBy: 'name',
    sortOrder: 'asc'
  });
  
  const [loading, setLoading] = useState(true);
  const [selectedExercises, setSelectedExercises] = useState(new Set());
  const [favoriteExercises, setFavoriteExercises] = useState(new Set());
  const [workoutTime, setWorkoutTime] = useState(0);
  const [activeWorkout, setActiveWorkout] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workoutProgress, setWorkoutProgress] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('all');
  const [activeEquipment, setActiveEquipment] = useState('all');
  const [restTimer, setRestTimer] = useState(60);
  const [restTimerActive, setRestTimerActive] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [currentAnimationStep, setCurrentAnimationStep] = useState(0);
  const [animationTimer, setAnimationTimer] = useState(null);
  const [variations, setVariations] = useState([]);
  const [showVariations, setShowVariations] = useState(false);
  const [effectiveExercises, setEffectiveExercises] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [user, setUser] = useState(null);
  
  // Navigation items
  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, description: 'Overview', color: 'text-blue-600 bg-blue-50' },
    { name: 'Workout Planner', path: '/workout-planner', icon: ListChecks, description: 'Plan workouts', color: 'text-purple-600 bg-purple-50' },
    { name: 'Exercise Library', path: '/exercise-library', icon: BookOpen, description: 'Browse exercises', color: 'text-orange-600 bg-orange-50' },
    { name: 'Workout Builder', path: '/workout-builder', icon: Plus, description: 'Create routines', color: 'text-green-600 bg-green-50' },
    { name: 'Progress Tracker', path: '/progress-tracker', icon: TrendingUp, description: 'Track progress', color: 'text-red-600 bg-red-50' },
    { name: 'Nutrition', path: '/nutrition', icon: Apple, description: 'Meal planning', color: 'text-teal-600 bg-teal-50' },
    { name: 'AI Coach', path: '/ai-chat', icon: Brain, description: 'AI Assistant', color: 'text-pink-600 bg-pink-50' },
    { name: 'Community', path: '/community', icon: Users, description: 'Share workouts', color: 'text-indigo-600 bg-indigo-50' },
    { name: 'Analyze', path: '/analyze', icon: ChartBar, description: 'Analytics', color: 'text-cyan-600 bg-cyan-50' },
  ];

  // Equipment types with icons
  const equipmentTypes = exerciseService.equipmentTypes || [
    { id: 'all', name: 'All', description: 'All equipment types', color: 'bg-gray-100' },
    { id: 'barbell', name: 'Barbell', description: 'Barbell exercises', color: 'bg-red-100' },
    { id: 'dumbbell', name: 'Dumbbell', description: 'Dumbbell exercises', color: 'bg-blue-100' },
    { id: 'bodyweight', name: 'Bodyweight', description: 'No equipment needed', color: 'bg-green-100' },
    { id: 'kettlebell', name: 'Kettlebell', description: 'Kettlebell exercises', color: 'bg-purple-100' },
    { id: 'resistance_band', name: 'Resistance Band', description: 'Band exercises', color: 'bg-yellow-100' },
    { id: 'machine', name: 'Machine', description: 'Gym machines', color: 'bg-teal-100' },
    { id: 'cable', name: 'Cable', description: 'Cable machine', color: 'bg-indigo-100' }
  ];
  
  // Exercise categories for filtering
  const exerciseCategories = [
    { id: 'all', name: 'All Exercises', icon: Dumbbell, color: 'bg-blue-500' },
    { id: 'beginner', name: 'Beginner Friendly', icon: Users, color: 'bg-green-500' },
    { id: 'chest', name: 'Chest', icon: Target, color: 'bg-red-500' },
    { id: 'back', name: 'Back', icon: RefreshCw, color: 'bg-purple-500' },
    { id: 'legs', name: 'Legs', icon: TrendingUp, color: 'bg-orange-500' },
    { id: 'shoulders', name: 'Shoulders', icon: Award, color: 'bg-teal-500' },
    { id: 'arms', name: 'Arms', icon: Zap, color: 'bg-yellow-500' },
    { id: 'core', name: 'Core', icon: Flame, color: 'bg-pink-500' }
  ];

  // Get initials for avatar
  const getInitials = () => {
    if (!user || !user.firstname || !user.lastname) return "GU";
    return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();
  };

  // Get greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening");
  }, []);

  // Mock weather data
  useEffect(() => {
    const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
    const weatherIcons = {
      'Sunny': <Sun className="w-6 h-6 text-yellow-500" />,
      'Cloudy': <Cloud className="w-6 h-6 text-gray-500" />,
      'Rainy': <CloudRain className="w-6 h-6 text-blue-500" />,
      'Partly Cloudy': <Cloud className="w-6 h-6 text-blue-300" />
    };
    
    setWeatherData({
      condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
      temperature: Math.floor(Math.random() * (35 - 15 + 1)) + 15,
      humidity: Math.floor(Math.random() * (90 - 40 + 1)) + 40,
      icon: weatherIcons[weatherConditions[Math.floor(Math.random() * weatherConditions.length)]]
    });
  }, []);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('fitpro_user') || localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        // Create a mock user for demo
        setUser({
          firstname: "Demo",
          lastname: "User",
          plan: "Premium",
          email: "demo@example.com"
        });
      }
    } else {
      // Create a mock user for demo
      setUser({
        firstname: "Demo",
        lastname: "User",
        plan: "Premium",
        email: "demo@example.com"
      });
    }
  }, []);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch exercises
  useEffect(() => {
    const loadExercises = async () => {
      setLoading(true);
      try {
        const data = await exerciseService.getExercises(filters);
        setExercises(data?.data || []);
        
        // Load most effective exercises for each equipment type
        const effective = {};
        for (const eq of equipmentTypes) {
          if (eq.id !== 'all') {
            const effectiveEx = await exerciseService.getMostEffectiveForEquipment(eq.id);
            effective[eq.id] = effectiveEx;
          }
        }
        setEffectiveExercises(effective);
      } catch (err) {
        console.error("Failed to load exercises:", err);
      } finally {
        setLoading(false);
      }
    };
    loadExercises();
  }, [filters]);

  // Load variations when exercise is selected
  useEffect(() => {
    const loadVariations = async () => {
      if (selectedExercise) {
        try {
          const vars = await exerciseService.getVariations(selectedExercise._id);
          setVariations(vars || []);
        } catch (error) {
          console.error("Failed to load variations:", error);
        }
      }
    };
    loadVariations();
  }, [selectedExercise]);

  // Timer functions
  const startWorkoutTimer = useCallback(() => {
    if (!workoutTimer) {
      const timer = setInterval(() => {
        setWorkoutTime(prev => prev + 1);
        setWorkoutProgress(prev => Math.min(prev + 0.1, 100));
      }, 1000);
      setWorkoutTimer(timer);
      setActiveWorkout(true);
    }
  }, [workoutTimer]);

  const stopWorkoutTimer = useCallback(() => {
    if (workoutTimer) {
      clearInterval(workoutTimer);
      setWorkoutTimer(null);
      setActiveWorkout(false);
    }
  }, [workoutTimer]);

  const resetWorkoutTimer = useCallback(() => {
    if (workoutTimer) clearInterval(workoutTimer);
    setWorkoutTimer(null);
    setWorkoutTime(0);
    setActiveWorkout(false);
    setWorkoutProgress(0);
  }, [workoutTimer]);

  const startRestTimer = useCallback((seconds) => {
    setRestTimer(seconds);
    setRestTimerActive(true);
    
    const timer = setInterval(() => {
      setRestTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setRestTimerActive(false);
          return seconds;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const toggleExerciseSelection = useCallback((id) => {
    setSelectedExercises(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavoriteExercises(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  }, []);

  const selectExercise = useCallback((exercise) => {
    setSelectedExercise(exercise);
    setViewMode('detail');
    setShowAnimation(false);
    setAnimationPlaying(false);
    setCurrentAnimationStep(0);
    setShowVariations(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectEquipmentType = useCallback((equipmentId) => {
    setActiveEquipment(equipmentId);
    setFilters(prev => ({ ...prev, equipmentType: equipmentId }));
    setActiveTab('all');
  }, []);

  const startAnimation = useCallback(() => {
    if (animationTimer) {
      clearInterval(animationTimer);
    }
    setAnimationPlaying(true);
    
    const steps = selectedExercise?.tutorial?.steps || [];
    const timer = setInterval(() => {
      setCurrentAnimationStep(prev => {
        if (prev >= steps.length - 1) {
          return 0; // Loop back to start
        }
        return prev + 1;
      });
    }, 3000 / animationSpeed);
    
    setAnimationTimer(timer);
  }, [selectedExercise, animationSpeed, animationTimer]);

  const stopAnimation = useCallback(() => {
    if (animationTimer) {
      clearInterval(animationTimer);
      setAnimationTimer(null);
    }
    setAnimationPlaying(false);
  }, [animationTimer]);

  const resetAnimation = useCallback(() => {
    if (animationTimer) {
      clearInterval(animationTimer);
      setAnimationTimer(null);
    }
    setCurrentAnimationStep(0);
    setAnimationPlaying(false);
  }, [animationTimer]);

  const nextAnimationStep = useCallback(() => {
    const steps = selectedExercise?.tutorial?.steps || [];
    setCurrentAnimationStep(prev => Math.min(prev + 1, steps.length - 1));
  }, [selectedExercise]);

  const prevAnimationStep = useCallback(() => {
    setCurrentAnimationStep(prev => Math.max(prev - 1, 0));
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
  };

  // Render animation - using YouTube player
  const renderAnimation = () => {
    if (!selectedExercise) return null;
    
    return (
      <YouTubeExercisePlayer 
        exerciseName={selectedExercise.name}
        equipmentType={selectedExercise.equipmentType}
        step={currentAnimationStep}
        showVariations={showVariations}
      />
    );
  };

  // Equipment type cards
  const renderEquipmentTypes = () => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          Equipment Types
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {equipmentTypes.map((eq) => (
            <button
              key={eq.id}
              onClick={() => selectEquipmentType(eq.id)}
              className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                activeEquipment === eq.id
                  ? `${eq.color} text-white transform scale-105 shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                {eq.id === 'barbell' && <BarChart className="w-8 h-8" />}
                {eq.id === 'dumbbell' && <Dumbbell className="w-8 h-8" />}
                {eq.id === 'bodyweight' && <Users className="w-8 h-8" />}
                {eq.id === 'kettlebell' && <Target className="w-8 h-8" />}
                {eq.id === 'resistance_band' && <RefreshCw className="w-8 h-8" />}
                {eq.id === 'machine' && <Settings className="w-8 h-8" />}
                {eq.id === 'cable' && <Zap className="w-8 h-8" />}
                {eq.id === 'all' && <Layers className="w-8 h-8" />}
              </div>
              <span className="font-medium text-sm text-center">{eq.name}</span>
              <span className="text-xs opacity-75 mt-1 text-center">{eq.description}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Most effective exercises panel
  const renderMostEffective = () => {
    if (!effectiveExercises[activeEquipment] || activeEquipment === 'all') return null;
    
    return (
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-600" />
          Most Effective {equipmentTypes.find(e => e.id === activeEquipment)?.name} Exercises
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {effectiveExercises[activeEquipment]?.slice(0, 8).map((exercise, index) => (
            <div 
              key={index}
              className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-700' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {index === 0 && <Crown className="w-4 h-4" />}
                  {index === 1 && <Medal className="w-4 h-4" />}
                  {index === 2 && <Award className="w-4 h-4" />}
                  {index > 2 && <TrendingUp className="w-4 h-4" />}
                </div>
                <span className="font-medium">{exercise}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Variations panel
  const renderVariationsPanel = () => {
    if (!selectedExercise || !showVariations) return null;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-600" />
            Exercise Variations & Progressions
          </h3>
          <button
            onClick={() => setShowVariations(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-3 text-lg text-gray-700 flex items-center gap-2">
              <GitPullRequest className="w-4 h-4" />
              Variations for {selectedExercise.equipment}
            </h4>
            <ul className="space-y-2">
              {variations.map((variation, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{variation}</p>
                    <p className="text-sm text-gray-600">
                      {index === 0 && 'Most common variation'}
                      {index === 1 && 'Focus on different angles'}
                      {index === 2 && 'Advanced progression'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-lg text-gray-700 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4" />
              Equipment Alternatives
            </h4>
            <div className="space-y-3">
              {(selectedExercise.effectiveVariations || []).map((alt, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg shadow">
                      {alt.equipment === 'Barbell' && <BarChart className="w-5 h-5 text-red-600" />}
                      {alt.equipment === 'Dumbbell' && <Dumbbell className="w-5 h-5 text-blue-600" />}
                      {alt.equipment === 'Bodyweight' && <Users className="w-5 h-5 text-green-600" />}
                    </div>
                    <div>
                      <p className="font-bold">{alt.name || `Alternative ${index + 1}`}</p>
                      <p className="text-sm text-gray-600">Focus: {alt.focus || 'General'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Equipment: {alt.equipment || 'Various'}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h5 className="font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600" />
                Pro Tip
              </h5>
              <p className="text-sm text-gray-700">
                Rotate between variations every 4-6 weeks to prevent plateaus and target muscles from different angles.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('fitpro_user');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Loading state
  if (loading && viewMode === 'grid') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl shadow p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Detail view
  if (viewMode === 'detail' && selectedExercise) {
    const exercise = selectedExercise;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Top Navigation */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 lg:px-6 py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            <div 
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate('/dashboard')}
            >
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="font-bold text-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                FitPro
              </h1>
              <p className="text-xs text-gray-500 font-medium">Professional Fitness Platform</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navigation.slice(0, 4).map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg ${item.path === '/workout-planner' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.name}</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 shadow-lg flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
              {weatherData?.icon}
              <div>
                <div className="font-semibold text-sm">{weatherData?.temperature}°C</div>
                <div className="text-xs text-gray-500">{weatherData?.condition}</div>
              </div>
            </div>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="relative">
              <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-full px-3 py-2">
                <div className="h-9 w-9 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-orange-600 font-bold border-2 border-orange-500/20">
                  {getInitials()}
                </div>
                <div className="hidden md:block">
                  <p className="font-semibold text-gray-900 text-sm">{user?.firstname || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.plan || "Basic"}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Dumbbell className="w-8 h-8 text-orange-500" />
                    <div>
                      <h2 className="font-bold text-lg">FitPro Menu</h2>
                      <p className="text-xs text-gray-500">Navigation</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    {getInitials()}
                  </div>
                  <div>
                    <p className="font-semibold">{user?.firstname || ""} {user?.lastname || ""}</p>
                    <p className="text-xs text-gray-500">{user?.plan || "Basic"} Plan</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full py-2 px-4 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 font-medium"
                >
                  <LogOut className="w-4 h-4 inline mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Workout Planner Content */}
        <div className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={() => setViewMode('grid')}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Exercises
            </button>

            {/* Exercise Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      exercise.equipmentType === 'barbell' ? 'bg-red-100 text-red-700' :
                      exercise.equipmentType === 'dumbbell' ? 'bg-blue-100 text-blue-700' :
                      exercise.equipmentType === 'bodyweight' ? 'bg-green-100 text-green-700' :
                      exercise.equipmentType === 'kettlebell' ? 'bg-purple-100 text-purple-700' :
                      exercise.equipmentType === 'resistance_band' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {exercise.equipmentType === 'barbell' && <BarChart className="w-5 h-5" />}
                      {exercise.equipmentType === 'dumbbell' && <Dumbbell className="w-5 h-5" />}
                      {exercise.equipmentType === 'bodyweight' && <Users className="w-5 h-5" />}
                      {exercise.equipmentType === 'kettlebell' && <Target className="w-5 h-5" />}
                      {exercise.equipmentType === 'resistance_band' && <RefreshCw className="w-5 h-5" />}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">{exercise.name}</h1>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {exercise.equipment || 'Bodyweight'}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {exercise.muscleGroup || exercise.muscle || 'General'}
                    </span>
                    <span className={`px-3 py-1 ${
                      exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                      exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    } rounded-full text-sm font-medium`}>
                      {exercise.difficulty || 'Beginner'}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => toggleFavorite(exercise._id)}
                    className={`p-3 rounded-xl ${
                      favoriteExercises.has(exercise._id)
                        ? 'bg-yellow-50 text-yellow-600 border-2 border-yellow-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {favoriteExercises.has(exercise._id) ? (
                      <BookmarkCheck className="w-6 h-6" />
                    ) : (
                      <Bookmark className="w-6 h-6" />
                    )}
                  </button>
                  <button
                    onClick={() => setShowVariations(!showVariations)}
                    className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 rounded-xl hover:from-purple-100 hover:to-pink-100"
                  >
                    <GitBranch className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="col-span-2">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Description
                    </h3>
                    <p className="text-gray-700">
                      {exercise.description || 'A great exercise for building strength and muscle.'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      Primary Muscles
                    </h4>
                    <p className="text-gray-700">
                      {exercise.muscle || exercise.muscleGroup || 'Full Body'}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      Secondary Muscles
                    </h4>
                    <p className="text-gray-700">
                      {exercise.secondaryMuscles?.join(', ') || 'Core, Stabilizers'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {renderVariationsPanel()}
            
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/5">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Video className="w-6 h-6 text-red-600" />
                    Exercise Animation
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">Animation Controls</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          animationPlaying ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {animationPlaying ? 'Playing' : 'Paused'}
                        </span>
                      </div>
                      
                      <div className="flex gap-3 mb-4">
                        <button
                          onClick={prevAnimationStep}
                          disabled={!selectedExercise?.tutorial?.steps}
                          className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50"
                        >
                          <SkipBack className="w-5 h-5" />
                        </button>
                        <button
                          onClick={animationPlaying ? stopAnimation : startAnimation}
                          disabled={!selectedExercise?.tutorial?.steps}
                          className={`flex-1 p-3 rounded-xl font-medium ${
                            animationPlaying 
                              ? 'bg-red-500 hover:bg-red-600 text-white' 
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          } disabled:opacity-50`}
                        >
                          {animationPlaying ? (
                            <><Pause className="w-5 h-5 inline mr-2" /> Pause</>
                          ) : (
                            <><Play className="w-5 h-5 inline mr-2" /> Play Animation</>
                          )}
                        </button>
                        <button
                          onClick={nextAnimationStep}
                          disabled={!selectedExercise?.tutorial?.steps}
                          className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50"
                        >
                          <SkipForward className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <button
                        onClick={resetAnimation}
                        className="w-full p-3 bg-gray-100 rounded-xl hover:bg-gray-200 font-medium"
                      >
                        <RotateCcw className="w-5 h-5 inline mr-2" />
                        Reset Animation
                      </button>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-600" />
                        Settings
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Animation Speed
                          </label>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Slow</span>
                            <input
                              type="range"
                              min="0.5"
                              max="2"
                              step="0.1"
                              value={animationSpeed}
                              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-sm text-gray-600">Fast</span>
                            <span className="font-bold">{animationSpeed}x</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-3/5">
                  <div className="bg-black rounded-2xl overflow-hidden shadow-lg mb-4">
                    {renderAnimation()}
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        Current Step
                      </h3>
                      <span className="text-sm text-gray-500">
                        Step {currentAnimationStep + 1} of {selectedExercise?.tutorial?.steps?.length || 1}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {selectedExercise?.tutorial?.steps?.[currentAnimationStep] ? (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="font-medium text-gray-800">
                            {selectedExercise.tutorial.steps[currentAnimationStep]}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-600">
                            Follow along with the animation. Focus on proper form and technique.
                          </p>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {selectedExercise?.tutorial?.steps?.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentAnimationStep(index)}
                            className={`flex-1 h-2 rounded-full ${
                              index === currentAnimationStep ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                            aria-label={`Go to step ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-green-600" />
                  Step-by-Step Instructions
                </h3>
                <ol className="space-y-3">
                  {(selectedExercise?.instructions || [
                    'Start in the proper position',
                    'Execute the movement with control',
                    'Focus on proper breathing',
                    'Complete the full range of motion',
                    'Return to starting position'
                  ]).map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  Pro Tips & Safety
                </h3>
                <div className="space-y-4">
                  {[
                    'Keep your core tight throughout the movement',
                    'Maintain a neutral spine position',
                    'Don\'t use momentum - focus on muscle contraction',
                    'Start with light weight to perfect form',
                    'Rest 60-90 seconds between sets'
                  ].map((tip, index) => (
                    <div key={index} className="flex gap-3">
                      <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Timer className="w-5 h-5 text-blue-600" />
                    Workout Timer
                  </h3>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {formatTime(workoutTime)}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${workoutProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={activeWorkout ? stopWorkoutTimer : startWorkoutTimer}
                    className={`px-6 py-3 rounded-xl font-medium ${
                      activeWorkout 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {activeWorkout ? (
                      <><Pause className="w-5 h-5 inline mr-2" /> Pause Workout</>
                    ) : (
                      <><Play className="w-5 h-5 inline mr-2" /> Start Workout</>
                    )}
                  </button>
                  <button
                    onClick={resetWorkoutTimer}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium"
                  >
                    <RotateCcw className="w-5 h-5 inline mr-2" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Grid View
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 lg:px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div 
            className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/dashboard')}
          >
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div className="hidden md:block">
            <h1 className="font-bold text-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              FitPro
            </h1>
            <p className="text-xs text-gray-500 font-medium">Professional Fitness Platform</p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {navigation.slice(0, 4).map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg ${item.path === '/workout-planner' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{item.name}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 shadow-lg flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            {weatherData?.icon}
            <div>
              <div className="font-semibold text-sm">{weatherData?.temperature}°C</div>
                <div className="text-xs text-gray-500">{weatherData?.condition}</div>
              </div>
            </div>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="relative">
              <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-full px-3 py-2">
                <div className="h-9 w-9 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-orange-600 font-bold border-2 border-orange-500/20">
                  {getInitials()}
                </div>
                <div className="hidden md:block">
                  <p className="font-semibold text-gray-900 text-sm">{user?.firstname || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.plan || "Basic"}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Dumbbell className="w-8 h-8 text-orange-500" />
                    <div>
                      <h2 className="font-bold text-lg">FitPro Menu</h2>
                      <p className="text-xs text-gray-500">Navigation</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    {getInitials()}
                  </div>
                  <div>
                    <p className="font-semibold">{user?.firstname || ""} {user?.lastname || ""}</p>
                    <p className="text-xs text-gray-500">{user?.plan || "Basic"} Plan</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full py-2 px-4 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 font-medium"
                >
                  <LogOut className="w-4 h-4 inline mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Workout Planner
                  </h1>
                  <p className="text-gray-600">
                    {timeOfDay ? `Good ${timeOfDay}, ` : ''}{user?.firstname || 'User'}! Browse exercises and build your workout
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Timer className="w-6 h-6" />
                    <div>
                      <p className="text-sm">Workout Time</p>
                      <p className="text-2xl font-bold">{formatTime(workoutTime)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {renderEquipmentTypes()}
            {renderMostEffective()}

            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search exercises by name, muscle group, or equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveWorkout(!activeWorkout)}
                    className={`px-6 py-3 rounded-xl font-medium ${
                      activeWorkout 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {activeWorkout ? (
                      <><Pause className="w-5 h-5 inline mr-2" /> Pause Workout</>
                    ) : (
                      <><Play className="w-5 h-5 inline mr-2" /> Start Workout</>
                    )}
                  </button>
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl font-medium"
                  >
                    {viewMode === 'grid' ? (
                      <><List className="w-5 h-5 inline mr-2" /> List View</>
                    ) : (
                      <><Grid className="w-5 h-5 inline mr-2" /> Grid View</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Dumbbell className="w-6 h-6 text-blue-600" />
                Available Exercises
                <span className="text-gray-500 text-lg font-normal">
                  ({exercises.length} found)
                </span>
              </h2>
              
              {exercises.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No exercises found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {exercises.map((exercise) => (
                    <div 
                      key={exercise._id}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 border-2 ${
                        selectedExercises.has(exercise._id) 
                          ? 'border-blue-500' 
                          : 'border-transparent'
                      }`}
                      onClick={() => selectExercise(exercise)}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800 mb-1">
                              {exercise.name}
                            </h3>
                            <div className="flex flex-wrap gap-1 mb-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {exercise.difficulty || 'Beginner'}
                              </span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {exercise.muscle || exercise.muscleGroup || 'Full Body'}
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(exercise._id);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            {favoriteExercises.has(exercise._id) ? (
                              <BookmarkCheck className="w-5 h-5 text-yellow-500" />
                            ) : (
                              <Bookmark className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {exercise.description || 'Click to view exercise details and animation.'}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${
                              exercise.equipmentType === 'barbell' ? 'bg-red-100 text-red-700' :
                              exercise.equipmentType === 'dumbbell' ? 'bg-blue-100 text-blue-700' :
                              exercise.equipmentType === 'bodyweight' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {exercise.equipmentType === 'barbell' && <BarChart className="w-4 h-4" />}
                              {exercise.equipmentType === 'dumbbell' && <Dumbbell className="w-4 h-4" />}
                              {exercise.equipmentType === 'bodyweight' && <Users className="w-4 h-4" />}
                              {exercise.equipmentType === 'kettlebell' && <Target className="w-4 h-4" />}
                              {exercise.equipmentType === 'resistance_band' && <RefreshCw className="w-4 h-4" />}
                            </div>
                            <span className="text-sm text-gray-600">
                              {exercise.equipment || 'Bodyweight'}
                            </span>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExerciseSelection(exercise._id);
                            }}
                            className={`p-2 rounded-lg ${
                              selectedExercises.has(exercise._id)
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {selectedExercises.has(exercise._id) ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Plus className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {exercise.muscleGroup || 'Multiple'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="w-4 h-4" />
                            Variations
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedExercises.size > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Selected Exercises ({selectedExercises.size})
                  </h3>
                  <button
                    onClick={() => setSelectedExercises(new Set())}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  {exercises
                    .filter(ex => selectedExercises.has(ex._id))
                    .map(exercise => (
                      <div key={exercise._id} className="bg-white p-3 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{exercise.name}</span>
                          <button
                            onClick={() => toggleExerciseSelection(exercise._id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {exercise.muscle || exercise.muscleGroup}
                        </div>
                      </div>
                    ))}
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-700">
                    Create Workout
                  </button>
                  <button className="py-3 px-6 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl font-medium">
                    Save as Template
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-600 text-sm">
                  © 2024 FitPro. All rights reserved.
                </div>
                <div className="flex gap-4">
                  <button className="text-gray-600 hover:text-gray-900 text-sm">
                    Privacy Policy
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 text-sm">
                    Terms of Service
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 text-sm">
                    Help Center
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}