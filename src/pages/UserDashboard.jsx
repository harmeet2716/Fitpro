import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  User, 
  LogOut, 
  Bell, 
  Dumbbell, 
  Activity, 
  Target, 
  CheckCircle2, 
  Play, 
  ChevronRight, 
  TrendingUp, 
  Settings, 
  BarChart3, 
  Heart,
  Flame,
  Droplets,
  Footprints,
  Moon,
  Sun,
  Zap,
  Award,
  Trophy,
  RefreshCw,
  Sparkles,
  Bot,
  Send,
  Brain,
  X,
  Maximize2,
  Minimize2,
  Edit,
  Save,
  Home,
  Lock,
  Calendar,
  Target as TargetIcon,
  ListChecks,
  Menu,
  Search,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  Apple,
  Target as TargetExercise,
  ChartBar,
  Clock,
  FileText,
  Share2,
  Download,
  MessageCircle,
  HelpCircle,
  Star,
  Filter,
  Grid,
  List,
  Plus,
  Video,
  Music,
  Zap as Lightning,
  Target as Bullseye,
  TrendingDown,
  Cloud,
  Wind,
  Thermometer,
  Droplet,
  Sunrise,
  Sunset,
  CloudRain,
  Umbrella,
  CloudLightning
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function ProfessionalFitnessDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [fitnessData, setFitnessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  
  // Profile Editing State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  
  // AI Assistant State
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const [isAIMinimized, setIsAIMinimized] = useState(false);
  const messagesEndRef = useRef(null);

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
    { name: 'Analyze', path: '/analyze', icon: BarChart3, description: 'Analytics', color: 'text-cyan-600 bg-cyan-50' },
  ];

  // Calculate metrics based on user data
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return 0;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const calculateBodyFat = (gender, age, bmi) => {
    if (!gender || !age || !bmi) return 0;
    let base = gender === 'male' ? 15 : 25;
    const ageFactor = Math.max(0, age - 30) * 0.1;
    const bmiFactor = Math.max(0, bmi - 22) * 0.5;
    return (base + ageFactor + bmiFactor).toFixed(1);
  };

  const calculateMuscleMass = (weight, bodyFat) => {
    if (!weight || !bodyFat) return 0;
    return (weight * (1 - bodyFat / 100)).toFixed(1);
  };

  const getRandomProgress = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Generate dynamic weekly plan
  const generateWeeklyPlan = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const today = new Date();
    const workouts = [
      "Upper Strength", 
      "HIIT Cardio", 
      "Yoga", 
      "Lower Strength", 
      "Active Recovery", 
      "Cardio & Core", 
      "Rest Day"
    ];
    const times = ["6:00 AM", "5:30 PM", "7:00 AM", "6:00 AM", "8:00 AM", "9:00 AM", "Rest"];
    const durations = ["60min", "35min", "45min", "65min", "30min", "50min", "Rest"];

    return days.map((day, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      const dateStr = date.getDate().toString();
      
      return {
        day,
        date: dateStr,
        workout: workouts[index],
        completed: index < 2,
        time: times[index],
        duration: durations[index]
      };
    });
  };

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('fitpro_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setEditedUser(userData);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Greeting based on time
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

  // Initialize AI Assistant messages
  useEffect(() => {
    if (user && aiMessages.length === 0) {
      setAiMessages([
        {
          id: 1,
          text: `Hi ${user.firstname || "there"}! I'm your FitPro AI Assistant. I can help you with workouts, nutrition, recovery, and any fitness questions. What would you like to know today?`,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [user]);

  // Scroll to bottom of AI messages
  useEffect(() => {
    if (isAIAssistantOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiMessages, isAIAssistantOpen]);

  // Generate fitness data based on user
  useEffect(() => {
    if (!user) return;

    const bmi = calculateBMI(user.weight, user.height);
    const bodyFat = calculateBodyFat(user.gender, user.age, parseFloat(bmi));
    const muscleMass = calculateMuscleMass(user.weight, parseFloat(bodyFat));
    
    const baseCalories = user.weight ? user.weight * 30 : 2000;
    const calorieTarget = Math.round(baseCalories);
    const caloriesBurned = Math.round(calorieTarget * 0.75);
    const caloriesRemaining = calorieTarget - caloriesBurned;

    const stepsTarget = 10000;
    const stepsCurrent = Math.round(stepsTarget * 0.82);
    const stepsRemaining = stepsTarget - stepsCurrent;

    const activeMinutesTarget = 60;
    const activeMinutesCurrent = Math.round(activeMinutesTarget * 0.75);
    const activeMinutesRemaining = activeMinutesTarget - activeMinutesCurrent;

    const waterTarget = user.weight ? (user.weight * 0.035).toFixed(1) : 3;
    const waterCurrent = Math.max(0, parseFloat(waterTarget) * 0.73).toFixed(1);
    const waterRemaining = (parseFloat(waterTarget) - parseFloat(waterCurrent)).toFixed(1);

    const proteinTarget = user.weight ? Math.round(user.weight * 1.8) : 140;
    const proteinCurrent = Math.round(proteinTarget * 0.68);
    const proteinRemaining = proteinTarget - proteinCurrent;

    const sleepTarget = 8;
    const sleepActual = (6.5 + Math.random() * 1.5).toFixed(1);
    const sleepQuality = Math.round((parseFloat(sleepActual) / sleepTarget) * 100);

    const data = {
      userMetrics: {
        height: user.height || 0,
        weight: user.weight || 0,
        age: user.age || 0,
        bmi: parseFloat(bmi),
        bodyFat: parseFloat(bodyFat),
        muscleMass: parseFloat(muscleMass),
        restingHR: 62,
        vo2Max: 45,
      },
      dailyStats: {
        calories: { 
          target: calorieTarget, 
          burned: caloriesBurned, 
          remaining: caloriesRemaining 
        },
        steps: { 
          target: stepsTarget, 
          current: stepsCurrent, 
          remaining: stepsRemaining 
        },
        activeMinutes: { 
          target: activeMinutesTarget, 
          current: activeMinutesCurrent, 
          remaining: activeMinutesRemaining 
        },
        water: { 
          target: parseFloat(waterTarget), 
          current: parseFloat(waterCurrent), 
          remaining: parseFloat(waterRemaining) 
        },
        protein: { 
          target: proteinTarget, 
          current: proteinCurrent, 
          remaining: proteinRemaining 
        },
        sleep: { 
          target: sleepTarget, 
          actual: parseFloat(sleepActual), 
          quality: sleepQuality 
        }
      },
      weeklyPerformance: {
        workouts: { 
          completed: getRandomProgress(0, 5), 
          goal: 5, 
          streak: getRandomProgress(0, 30) 
        },
        consistency: getRandomProgress(60, 95),
        intensity: getRandomProgress(60, 90),
        recovery: getRandomProgress(65, 95),
        progress: (Math.random() * 10).toFixed(1)
      },
      currentProgram: {
        name: user.goal === "weight_loss" ? "Weight Loss Program" : 
              user.goal === "muscle_gain" ? "Muscle Building Program" : 
              user.goal === "endurance" ? "Endurance Training" : "Strength & Conditioning",
        week: getRandomProgress(1, 8),
        totalWeeks: 12,
        nextWorkout: "Upper Body Power",
        nextSessionTime: "Tomorrow, 6:00 AM",
        progress: getRandomProgress(10, 90)
      },
      workouts: [
        { 
          id: 1, 
          name: "Strength Training", 
          type: "strength",
          progress: getRandomProgress(60, 90), 
          duration: "60 min",
          calories: 450,
          icon: Dumbbell, 
          nextSession: "Tomorrow 6:00 AM", 
          color: "from-orange-500 via-amber-500 to-yellow-500",
          intensity: "High"
        },
        { 
          id: 2, 
          name: "HIIT Cardio", 
          type: "cardio",
          progress: getRandomProgress(60, 90), 
          duration: "35 min",
          calories: 520,
          icon: Activity, 
          nextSession: "Today 5:30 PM", 
          color: "from-rose-500 via-pink-500 to-purple-500",
          intensity: "Very High"
        },
        { 
          id: 3, 
          name: "Yoga & Mobility", 
          type: "flexibility",
          progress: getRandomProgress(60, 90), 
          duration: "45 min",
          calories: 220,
          icon: Target, 
          nextSession: "Wed 7:00 AM", 
          color: "from-blue-500 via-cyan-500 to-teal-500",
          intensity: "Low"
        },
        { 
          id: 4, 
          name: "Recovery Session", 
          type: "recovery",
          progress: getRandomProgress(30, 60), 
          duration: "30 min",
          calories: 180,
          icon: RefreshCw, 
          nextSession: "Thu 8:00 AM", 
          color: "from-emerald-500 via-green-500 to-lime-500",
          intensity: "Very Low"
        }
      ],
      weeklyPlan: generateWeeklyPlan(),
      recentActivity: [
        { 
          name: "Morning HIIT Blast", 
          type: "HIIT", 
          duration: "28 min", 
          calories: 420, 
          time: "2 hours ago", 
          intensity: "high", 
          performance: 92,
          heartRate: { avg: 158, max: 172 }
        },
        { 
          name: "Upper Body Strength", 
          type: "Strength", 
          duration: "55 min", 
          calories: 380, 
          time: "Yesterday", 
          intensity: "medium", 
          performance: 88,
          heartRate: { avg: 132, max: 148 }
        },
        { 
          name: "Evening Yoga Flow", 
          type: "Yoga", 
          duration: "40 min", 
          calories: 180, 
          time: "2 days ago", 
          intensity: "low", 
          performance: 85,
          heartRate: { avg: 98, max: 112 }
        }
      ],
      challenges: [
        { 
          name: "30-Day Transformation", 
          daysLeft: getRandomProgress(1, 30), 
          participants: getRandomProgress(1000, 5000), 
          progress: getRandomProgress(20, 80),
          reward: "Pro Badge + $100 Credit",
          difficulty: "Advanced"
        },
        { 
          name: "Spring Fitness Challenge", 
          daysLeft: getRandomProgress(1, 30), 
          participants: getRandomProgress(1000, 5000), 
          progress: getRandomProgress(20, 80),
          reward: "Limited Edition Gear",
          difficulty: "Intermediate"
        },
        { 
          name: "100K Steps Weekly", 
          daysLeft: getRandomProgress(1, 7), 
          participants: getRandomProgress(1000, 5000), 
          progress: getRandomProgress(20, 80),
          reward: "Achievement Unlock",
          difficulty: "Beginner"
        }
      ],
      achievements: [
        { 
          name: "Week Warrior", 
          description: "Complete 5 workouts in a week", 
          icon: Trophy, 
          unlocked: Math.random() > 0.5 
        },
        { 
          name: "Early Riser", 
          description: "5 morning workouts before 7 AM", 
          icon: Sun, 
          unlocked: Math.random() > 0.5 
        },
        { 
          name: "Consistency King", 
          description: "15-day workout streak", 
          icon: TrendingUp, 
          unlocked: Math.random() > 0.5 
        },
        { 
          name: "Calorie Crusher", 
          description: "Burn 10,000 calories", 
          icon: Flame, 
          unlocked: Math.random() > 0.5 
        },
        { 
          name: "Hydration Hero", 
          description: "7 days perfect hydration", 
          icon: Droplets, 
          unlocked: Math.random() > 0.5 
        }
      ]
    };

    setFitnessData(data);
    setIsLoading(false);
  }, [user]);

  // Profile Functions
  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setEditedUser({ ...user });
    setIsEditingProfile(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...editedUser };
      localStorage.setItem('fitpro_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditingProfile(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fitpro_user');
    navigate('/login');
  };

  const getInitials = () => {
    if (!user || !user.firstname || !user.lastname) return "GU";
    return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();
  };

  const getGreetingIcon = () => {
    const hour = new Date().getHours();
    return hour < 12 ? <Sun className="w-5 h-5 text-yellow-500" /> : hour < 18 ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-500" />;
  };

  const getIntensityColor = (intensity) => {
    if (!intensity) return 'bg-gray-200 text-gray-700';
    
    switch(intensity.toLowerCase()) {
      case 'very high': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-gray-900';
      case 'low': return 'bg-blue-500 text-white';
      case 'very low': return 'bg-gray-500 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getWorkoutTypeColor = (type) => {
    if (!type) return 'bg-gray-100 text-gray-700 border-gray-200';
    
    switch(type.toLowerCase()) {
      case 'strength': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'cardio': return 'bg-red-100 text-red-700 border-red-200';
      case 'hiit': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'flexibility': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'recovery': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // AI Assistant Functions
  const toggleAIAssistant = () => {
    setIsAIAssistantOpen(!isAIAssistantOpen);
    if (!isAIAssistantOpen) {
      setIsAIMinimized(false);
    }
  };

  const toggleAIMinimize = () => {
    setIsAIMinimized(!isAIMinimized);
  };

  const handleAISend = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage = {
      id: aiMessages.length + 1,
      text: aiInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiMessages(prev => [...prev, userMessage]);
    setAiInput("");
    setIsAITyping(true);

    setTimeout(() => {
      const lowerInput = aiInput.toLowerCase();
      let response = "";

      if (lowerInput.includes("workout") || lowerInput.includes("exercise")) {
        response = `Based on your current program (${fitnessData?.currentProgram?.name || 'your program'}), I recommend focusing on the scheduled workouts. Today's target is ${fitnessData?.currentProgram?.nextWorkout || 'your next workout'}. Need specific exercise advice?`;
      } else if (lowerInput.includes("nutrition") || lowerInput.includes("diet")) {
        const remainingProtein = fitnessData?.dailyStats?.protein?.remaining || 0;
        response = `Your nutrition looks good! You have ${remainingProtein}g of protein left today. Try adding lean chicken or protein shake to hit your goal.`;
      } else if (lowerInput.includes("progress") || lowerInput.includes("stats")) {
        response = `Your current stats: ${fitnessData?.weeklyPerformance?.consistency || 0}% consistency, ${fitnessData?.weeklyPerformance?.progress || 0}% monthly progress. Keep up the great work!`;
      } else if (lowerInput.includes("recovery") || lowerInput.includes("rest")) {
        response = `Your recovery score is ${fitnessData?.weeklyPerformance?.recovery || 0}% - that's excellent! Make sure to get quality sleep tonight.`;
      } else {
        response = "I understand you're asking about fitness. I can help with workout advice, nutrition tips, progress tracking, or recovery strategies. What specifically would you like to know?";
      }

      const aiMessage = {
        id: aiMessages.length + 2,
        text: response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAiMessages(prev => [...prev, aiMessage]);
      setIsAITyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setAiInput(question);
  };

  if (isLoading || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading your fitness dashboard...</p>
        <p className="text-sm text-gray-500 mt-2">Getting everything ready for you</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 lg:px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Logo */}
          <div 
            className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/')}
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
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {navigation.slice(0, 4).map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{item.name}</span>
              </Button>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  More <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {navigation.slice(4).map((item) => (
                  <DropdownMenuItem key={item.name} onClick={() => navigate(item.path)}>
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-2 ml-4">
            <Button
              onClick={() => navigate('/workout-planner')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
            >
              <ListChecks className="w-4 h-4 mr-2" />
              Workout Planner
            </Button>
            
            <Button
              onClick={toggleAIAssistant}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Weather Display */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            {weatherData?.icon}
            <div>
              <div className="font-semibold text-sm">{weatherData?.temperature}°C</div>
              <div className="text-xs text-gray-500">{weatherData?.condition}</div>
            </div>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Search */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100 rounded-full px-3 py-2">
                <Avatar className="h-9 w-9 border-2 border-orange-500/20">
                  <AvatarFallback className="bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="font-semibold text-gray-900 text-sm">{user.firstname || ""}</p>
                  <p className="text-xs text-gray-500">{user.plan || "Basic"}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.firstname || ""} {user.lastname || ""}</p>
                  <p className="text-xs leading-none text-gray-500">{user.email || ""}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {navigation.map((item) => (
                <DropdownMenuItem key={item.name} onClick={() => navigate(item.path)}>
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/')}>
                <Home className="w-4 h-4 mr-2" />
                Landing Page
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.firstname || ""} {user.lastname || ""}</p>
                  <p className="text-xs text-gray-500">{user.plan || "Basic"} Plan</p>
                </div>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Panel */}
      {isAIAssistantOpen && (
        <div className={`fixed right-4 ${isAIMinimized ? 'bottom-4 w-72 lg:w-80' : 'top-20 h-[calc(100vh-120px)] w-full lg:w-96'} z-40 transition-all duration-300`}>
          <Card className={`h-full border-0 shadow-2xl ${isAIMinimized ? 'opacity-90 hover:opacity-100' : ''}`}>
            <CardHeader className="pb-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-white">FitPro AI Assistant</CardTitle>
                    <CardDescription className="text-white/80">
                      {isAIMinimized ? 'Click to expand' : 'Real-time fitness guidance'}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={toggleAIMinimize}
                  >
                    {isAIMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={toggleAIAssistant}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {!isAIMinimized && (
              <>
                <CardContent className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <div className="space-y-4">
                    {aiMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <Avatar className={`h-6 w-6 ${message.sender === 'ai' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'}`}>
                              <AvatarFallback className="bg-transparent text-white text-xs">
                                {message.sender === 'ai' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`px-3 py-2 rounded-lg ${message.sender === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                              : 'bg-white text-gray-800 shadow-sm'
                            }`}>
                              <p className="text-sm">{message.text}</p>
                              <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isAITyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2">
                          <Avatar className="h-6 w-6 bg-gradient-to-br from-purple-500 to-pink-500">
                            <AvatarFallback className="bg-transparent text-white">
                              <Bot className="w-3 h-3" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="px-3 py-2 rounded-lg bg-white shadow-sm">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse animation-delay-200"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse animation-delay-400"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                
                <CardFooter className="border-t p-4 bg-white">
                  <div className="w-full space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {["Today's workout?", "Nutrition tips?", "Progress update", "Recovery advice"].map((q, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="cursor-pointer text-xs hover:bg-purple-50 hover:text-purple-700"
                          onClick={() => handleQuickQuestion(q)}
                        >
                          {q}
                        </Badge>
                      ))}
                    </div>
                    
                    <form onSubmit={handleAISend} className="flex items-center space-x-2">
                      <Input
                        placeholder="Ask about fitness..."
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        className="flex-1"
                        disabled={isAITyping}
                      />
                      <Button type="submit" size="icon" disabled={!aiInput.trim() || isAITyping}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Header with Quick Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {getGreetingIcon()}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Good {timeOfDay}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{user.firstname || ""}</span>!
              </h1>
            </div>
            <p className="text-gray-600">
              You've completed {fitnessData?.weeklyPerformance?.workouts?.completed || 0} workouts this week. 
              Keep pushing! 🚀
            </p>
          </div>
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Day Streak</p>
                  <p className="text-lg font-bold">{fitnessData?.weeklyPerformance?.workouts?.streak || 0}</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="text-lg font-bold">{fitnessData?.dailyStats?.calories?.burned || 0}</p>
                </div>
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Steps</p>
                  <p className="text-lg font-bold">{(fitnessData?.dailyStats?.steps?.current || 0).toLocaleString()}</p>
                </div>
                <Footprints className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Hydration</p>
                  <p className="text-lg font-bold">{fitnessData?.dailyStats?.water?.current || 0}L</p>
                </div>
                <Droplets className="w-5 h-5 text-cyan-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex h-auto p-1 bg-gray-100 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="workouts" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2">
                <Dumbbell className="w-4 h-4 mr-2" />
                Workouts
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2">
                <Apple className="w-4 h-4 mr-2" />
                Nutrition
              </TabsTrigger>
              <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="progress" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2"
                onClick={() => navigate('/analyze')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab Content - Responsive Grid */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Program Card */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-900 to-black text-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex-1">
                        <Badge className="mb-2 bg-white/20 text-white border-0">ACTIVE PROGRAM</Badge>
                        <h3 className="text-2xl font-bold">{fitnessData?.currentProgram?.name || "No Active Program"}</h3>
                        <p className="text-white/70 mt-2">Week {fitnessData?.currentProgram?.week || 1} of {fitnessData?.currentProgram?.totalWeeks || 12} • {fitnessData?.currentProgram?.progress || 0}% Complete</p>
                        <div className="mt-4">
                          <Progress value={fitnessData?.currentProgram?.progress || 0} className="h-2 bg-white/20" />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white/70">Next Workout</p>
                        <p className="text-xl font-bold">{fitnessData?.currentProgram?.nextWorkout || "No workout scheduled"}</p>
                        <p className="text-white/70">{fitnessData?.currentProgram?.nextSessionTime || "Schedule your first workout"}</p>
                      </div>
                    </div>
                    <Button 
                      className="mt-6 w-full bg-white text-gray-900 hover:bg-gray-100"
                      onClick={() => navigate('/workout-planner')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Plan Workout
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start"
                    onClick={() => navigate('/workout-planner')}
                  >
                    <ListChecks className="w-4 h-4 mr-2" />
                    Workout Planner
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/exercise-library')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Exercise Library
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/workout-builder')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Workout Builder
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/progress-tracker')}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Progress Tracker
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Daily Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(fitnessData?.dailyStats || {}).map(([key, stat]) => (
                <Card key={key} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-gray-600 capitalize">{key}</div>
                      {key === 'calories' && <Flame className="w-5 h-5 text-orange-500" />}
                      {key === 'steps' && <Footprints className="w-5 h-5 text-blue-500" />}
                      {key === 'water' && <Droplets className="w-5 h-5 text-cyan-500" />}
                      {key === 'sleep' && <Moon className="w-5 h-5 text-purple-500" />}
                      {key === 'protein' && <Zap className="w-5 h-5 text-green-500" />}
                      {key === 'activeMinutes' && <Activity className="w-5 h-5 text-red-500" />}
                    </div>
                    <div className="text-2xl font-bold mb-2">
                      {key === 'calories' && `${stat.burned || 0}/${stat.target || 0}`}
                      {key === 'steps' && `${(stat.current || 0).toLocaleString()}`}
                      {key === 'activeMinutes' && `${stat.current || 0}`}
                      {key === 'water' && `${stat.current || 0}L`}
                      {key === 'protein' && `${stat.current || 0}g`}
                      {key === 'sleep' && `${stat.actual || 0}h`}
                    </div>
                    <Progress 
                      value={key === 'sleep' ? (stat.quality || 0) : ((stat.current || 0) / (stat.target || 1)) * 100} 
                      className="h-2" 
                    />
                    <div className="text-xs text-gray-500 mt-2">
                      {key === 'sleep' ? `${stat.quality || 0}% quality` : `${stat.remaining || 0} ${key === 'water' ? 'L' : key === 'protein' ? 'g' : ''} remaining`}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Workout Programs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Performance */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Workouts", value: fitnessData?.weeklyPerformance?.workouts?.completed || 0, total: fitnessData?.weeklyPerformance?.workouts?.goal || 5, color: "bg-orange-500" },
                    { label: "Consistency", value: fitnessData?.weeklyPerformance?.consistency || 0, color: "bg-green-500" },
                    { label: "Intensity", value: fitnessData?.weeklyPerformance?.intensity || 0, color: "bg-red-500" },
                    { label: "Recovery", value: fitnessData?.weeklyPerformance?.recovery || 0, color: "bg-blue-500" },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{item.label}</span>
                        <span className="font-bold">{item.value}{item.total ? `/${item.total}` : '%'}</span>
                      </div>
                      <Progress value={item.total ? (item.value / item.total) * 100 : item.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Weekly Plan */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Weekly Plan</CardTitle>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => navigate('/workout-planner')}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {fitnessData?.weeklyPlan?.slice(0, 5).map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="font-semibold">{day.day}</div>
                            <div className="text-sm text-gray-500">{day.date}</div>
                          </div>
                          <div>
                            <div className="font-medium">{day.workout}</div>
                            <div className="text-sm text-gray-500">{day.time} • {day.duration}</div>
                          </div>
                        </div>
                        {day.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => navigate('/workout-planner')}
                  >
                    View Full Schedule
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Workouts Tab Content */}
          <TabsContent value="workouts" className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Workout Management</h2>
                <p className="text-gray-600">Plan and track your workouts</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => navigate('/workout-planner')}>
                  <ListChecks className="w-4 h-4 mr-2" />
                  Open Planner
                </Button>
                <Button variant="outline" onClick={() => navigate('/workout-builder')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workout
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Workout Schedule */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>This Week's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {fitnessData?.weeklyPlan?.map((day, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${day.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-center">
                                <div className="font-bold text-lg">{day.day}</div>
                                <div className="text-sm text-gray-500">{day.date}</div>
                              </div>
                              <div>
                                <div className="font-bold">{day.workout}</div>
                                <div className="text-sm text-gray-600">{day.time} • {day.duration}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {day.completed ? (
                                <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>
                              ) : (
                                <Badge variant="outline">Scheduled</Badge>
                              )}
                              {!day.completed && day.workout !== "Rest Day" && (
                                <Button size="sm" onClick={() => navigate('/workout-planner')}>
                                  Start
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Quick Actions Sidebar */}
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Quick Start</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" onClick={() => navigate('/workout-planner')}>
                      <Activity className="w-4 h-4 mr-2" />
                      Start Cardio Session
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/workout-planner')}>
                      <Dumbbell className="w-4 h-4 mr-2" />
                      Strength Training
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/workout-planner')}>
                      <Target className="w-4 h-4 mr-2" />
                      Yoga & Mobility
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Workout Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Weekly Goal</span>
                          <span className="text-sm font-bold">{fitnessData?.weeklyPerformance?.workouts?.completed || 0}/{fitnessData?.weeklyPerformance?.workouts?.goal || 5}</span>
                        </div>
                        <Progress value={((fitnessData?.weeklyPerformance?.workouts?.completed || 0) / (fitnessData?.weeklyPerformance?.workouts?.goal || 1)) * 100} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold">{fitnessData?.weeklyPerformance?.workouts?.streak || 0}</div>
                          <div className="text-sm text-gray-600">Day Streak</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold">{fitnessData?.weeklyPerformance?.consistency || 0}%</div>
                          <div className="text-sm text-gray-600">Consistency</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Profile Tab Content - Updated to match new structure */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                <p className="text-gray-600">Manage your account and preferences</p>
              </div>
              {!isEditingProfile && (
                <Button onClick={handleEditProfile}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditingProfile ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>First Name</Label>
                            <Input 
                              value={editedUser.firstname || ""} 
                              onChange={e => handleInputChange("firstname", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Last Name</Label>
                            <Input 
                              value={editedUser.lastname || ""} 
                              onChange={e => handleInputChange("lastname", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Height (cm)</Label>
                            <Input 
                              type="number" 
                              value={editedUser.height || ""} 
                              onChange={e => handleInputChange("height", parseInt(e.target.value))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Weight (kg)</Label>
                            <Input 
                              type="number" 
                              value={editedUser.weight || ""} 
                              onChange={e => handleInputChange("weight", parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button variant="outline" onClick={handleCancelEdit}>
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleSaveProfile}
                            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-gray-500">Full Name</Label>
                            <p className="font-semibold">{user.firstname || ""} {user.lastname || ""}</p>
                          </div>
                          <div>
                            <Label className="text-gray-500">Email</Label>
                            <p className="font-semibold">{user.email || ""}</p>
                          </div>
                          <div>
                            <Label className="text-gray-500">Phone</Label>
                            <p className="font-semibold">{user.number || "Not provided"}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-gray-500">Height</Label>
                            <p className="font-semibold">{user.height || 0} cm</p>
                          </div>
                          <div>
                            <Label className="text-gray-500">Weight</Label>
                            <p className="font-semibold">{user.weight || 0} kg</p>
                          </div>
                          <div>
                            <Label className="text-gray-500">BMI</Label>
                            <p className="font-semibold">{fitnessData?.userMetrics?.bmi || 0}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Profile Stats */}
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-20 w-20 border-4 border-white shadow-lg mb-4">
                        <AvatarFallback className="bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 text-xl font-bold">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-bold">{user.firstname || ""} {user.lastname || ""}</h3>
                      <p className="text-gray-600 text-sm">{user.email || ""}</p>
                      <Badge className="mt-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border-orange-200">
                        <Trophy className="w-3 h-3 mr-1" />
                        {user.plan || "Basic"} Member
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{fitnessData?.weeklyPerformance?.workouts?.streak || 0}</div>
                        <div className="text-sm text-gray-600">Day Streak</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{fitnessData?.weeklyPerformance?.consistency || 0}%</div>
                        <div className="text-sm text-gray-600">Consistency</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Nutrition Tab Content */}
          <TabsContent value="nutrition" className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Nutrition Tracking</h2>
                <p className="text-gray-600">Monitor your daily nutrition intake</p>
              </div>
              <Button onClick={() => navigate('/nutrition')}>
                <Apple className="w-4 h-4 mr-2" />
                Open Nutrition Planner
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Daily Nutrition Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(fitnessData?.dailyStats || {}).filter(([key]) => 
                      ['calories', 'protein', 'water'].includes(key)
                    ).map(([key, stat]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="font-medium capitalize">{key}</div>
                          <div className="font-bold">{stat.current || 0}{key === 'water' ? 'L' : key === 'protein' ? 'g' : ''} / {stat.target || 0}{key === 'water' ? 'L' : key === 'protein' ? 'g' : ''}</div>
                        </div>
                        <Progress value={((stat.current || 0) / (stat.target || 1)) * 100} />
                        <div className="text-sm text-gray-500">
                          {stat.remaining || 0} {key === 'water' ? 'L' : key === 'protein' ? 'g' : ''} remaining
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Quick Log</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-2" />
                      Log Meal
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Droplets className="w-4 h-4 mr-2" />
                      Log Water
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Zap className="w-4 h-4 mr-2" />
                      Log Snack
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Nutrition Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium">Protein Intake</p>
                      <p className="text-xs text-gray-600">You need {fitnessData?.dailyStats?.protein?.remaining || 0}g more protein today</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium">Hydration</p>
                      <p className="text-xs text-gray-600">{fitnessData?.dailyStats?.water?.remaining || 0}L water remaining</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium">Calories</p>
                      <p className="text-xs text-gray-600">{fitnessData?.dailyStats?.calories?.remaining || 0} calories remaining for the day</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Navigation for Mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30">
          <div className="grid grid-cols-5 gap-1 p-2">
            {navigation.slice(0, 5).map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center p-2 text-xs hover:bg-gray-50 rounded-lg"
              >
                <div className={`p-2 rounded-lg ${item.color} mb-1`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}