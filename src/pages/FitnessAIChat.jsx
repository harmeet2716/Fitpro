// pages/FitnessAIChat.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Progress } from "../components/ui/progress";
import {
  Bot,
  User,
  Send,
  Sparkles,
  Brain,
  Dumbbell,
  Heart,
  Target,
  Zap,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Home,
  LogOut,
  Bell,
  ChevronRight,
  Settings,
  TrendingUp,
  Star,
  MessageSquare,
  Coffee,
  Moon,
  Sun,
  Activity,
  Flame,
  Droplets,
  BookOpen,
  AlertCircle,
  Smile,
  Award,
  Trophy,
  Lightbulb,
  CheckCircle,
  ChevronLeft,
  Search,
  Menu,
  X,
  Video,
  Music,
  Download,
  Share2,
  Filter,
  Grid,
  List
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const FitnessAIChat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userMood, setUserMood] = useState(null);
  const [aiPersonality, setAiPersonality] = useState("friendly-coach");
  const [conversationContext, setConversationContext] = useState({
    goal: null,
    experienceLevel: null,
    preferredWorkoutType: null,
    lastWorkout: null,
    energyLevel: null
  });
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Enhanced AI knowledge base with friendly responses
  const aiKnowledgeBase = {
    greetings: [
      "Hey there! 👋 Ready to crush your fitness goals today?",
      "Hello! How's your fitness journey going? Excited to help!",
      "Hi friend! 🏋️‍♂️ What fitness challenge can we tackle together today?",
      "Welcome back! 🌟 Ready for some awesome fitness advice?",
      "Hey! How are you feeling today? Let's make it a great fitness day!",
      "Hi! Hope you're having an amazing day! What fitness topic shall we explore?"
    ],
    workouts: [
      { 
        tip: "Push-pull-legs split is fantastic for beginners! It gives each muscle group proper recovery while keeping you consistent. 💪",
        friendly: "Start with the basics and build up - your body will thank you for it!",
        emoji: "🏋️‍♂️"
      },
      { 
        tip: "HIIT workouts are like a party for your metabolism! 20-30 minutes can torch calories for hours. 🔥",
        friendly: "Short but intense - perfect for busy schedules! You've got this!",
        emoji: "⚡"
      },
      { 
        tip: "Remember to rest those muscles! 48 hours between training the same group gives them time to repair and grow stronger. 💤",
        friendly: "Rest is where the magic happens - your muscles grow while you sleep!",
        emoji: "😴"
      },
      { 
        tip: "Progressive overload is your growth secret! Gradually increase weight or reps to keep challenging your muscles. 📈",
        friendly: "Small steps lead to big changes! Celebrate every little increase!",
        emoji: "🎯"
      },
      { 
        tip: "Compound exercises are superhero moves! They work multiple muscles at once for maximum efficiency. 🦸‍♂️",
        friendly: "More bang for your buck! Efficiency at its finest!",
        emoji: "✨"
      }
    ],
    nutrition: [
      { 
        tip: "Protein is your muscle's best friend! Aim for 1.6-2.2g per kg of body weight for optimal recovery. 🍗",
        friendly: "Think of protein as building blocks for your stronger self!",
        emoji: "🧱"
      },
      { 
        tip: "Carbs are your workout fuel! Complex carbs before, simple carbs after - like premium gasoline for your body! ⛽",
        friendly: "Fuel smart, perform better! Your energy levels will thank you!",
        emoji: "⚡"
      },
      { 
        tip: "Hydration is key! At least 3L of water daily keeps everything running smoothly. 💧",
        friendly: "Water is life! Stay hydrated and watch your energy soar!",
        emoji: "🚰"
      },
      { 
        tip: "Healthy fats are hormone heroes! They keep everything balanced and happy. 🧠",
        friendly: "Good fats = good mood! Your body loves them!",
        emoji: "😊"
      },
      { 
        tip: "Meal timing is flexible! Total daily intake matters more than when you eat. ⏰",
        friendly: "Listen to your body - it knows when it needs fuel!",
        emoji: "👂"
      }
    ],
    motivation: [
      "You're stronger than you think! Every rep counts towards a better you. 💫",
      "Progress isn't always linear - celebrate the small wins along the way! 🎉",
      "Consistency beats perfection every time. Just keep showing up! 🔄",
      "Your future self will thank you for the effort you put in today. 🙏",
      "Every workout is a step towards the best version of you! 🚶‍♂️",
      "You've got this! I believe in you! 🌟",
      "Remember why you started. That fire inside you is your superpower! 🔥",
      "Small daily improvements lead to stunning long-term results! 📊",
      "Your body is capable of amazing things - trust the process! 🤸‍♀️",
      "You're not just building muscles, you're building discipline and resilience! 💪"
    ],
    recovery: [
      { 
        tip: "Sleep is your secret weapon! 7-9 hours of quality sleep = better recovery and results. 😴",
        friendly: "Dream big, sleep well, recover better! Your body repairs while you rest!",
        emoji: "🌙"
      },
      { 
        tip: "Active recovery keeps the blood flowing! Light walks or yoga work wonders. 🧘‍♂️",
        friendly: "Movement is medicine, even on rest days!",
        emoji: "🚶‍♀️"
      },
      { 
        tip: "Foam rolling is like a massage for your muscles! Reduces soreness and improves mobility. 🎾",
        friendly: "Self-care for your muscles - they deserve some TLC!",
        emoji: "❤️"
      },
      { 
        tip: "Stress management is recovery too! Your mental state affects your physical progress. 🧠",
        friendly: "A calm mind builds a strong body! Take time to breathe!",
        emoji: "🌬️"
      },
      { 
        tip: "Deload weeks prevent burnout! Every 4-6 weeks, lighten the load to come back stronger. 📉",
        friendly: "Sometimes taking a step back helps you leap forward!",
        emoji: "🔄"
      }
    ],
    funFacts: [
      "Did you know? Smiling during workouts can actually reduce perceived effort! 😊",
      "Fun fact: Your muscles don't actually grow during workouts - they grow during recovery! 🌱",
      "Interesting: Listening to music during workouts can increase endurance by up to 15%! 🎵",
      "Cool fact: Every pound of muscle burns about 6 calories per day at rest! 🔥",
      "Fun fact: Exercise releases endorphins - nature's feel-good chemicals! 🌈",
      "Did you know? Stretching after workouts can improve flexibility by up to 20%! 🤸‍♂️"
    ]
  };

  // AI Personality types
  const aiPersonalities = {
    "friendly-coach": {
      name: "Coach Alex",
      greeting: "Hey friend! Ready to crush some goals together?",
      tone: "encouraging and supportive",
      emoji: "💪",
      color: "from-blue-500 to-teal-500"
    },
    "nutrition-expert": {
      name: "Nutritionist Maya",
      greeting: "Hello! Let's fuel your body for success!",
      tone: "knowledgeable and caring",
      emoji: "🍎",
      color: "from-green-500 to-emerald-500"
    },
    "motivation-master": {
      name: "Motivator Max",
      greeting: "Hey champ! Ready to unleash your potential?",
      tone: "energetic and inspiring",
      emoji: "⚡",
      color: "from-orange-500 to-yellow-500"
    },
    "recovery-guru": {
      name: "Recovery Specialist Sam",
      greeting: "Hi there! Let's help your body heal and grow!",
      tone: "calm and soothing",
      emoji: "😌",
      color: "from-purple-500 to-pink-500"
    }
  };

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('fitpro_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Set conversation context based on user data
      setConversationContext(prev => ({
        ...prev,
        goal: userData.goal || "general_fitness",
        experienceLevel: userData.experience || "beginner"
      }));
    } else {
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate]);

  // Initialize with friendly welcome message
  useEffect(() => {
    if (user && messages.length === 0) {
      const personality = aiPersonalities[aiPersonality];
      const randomGreeting = aiKnowledgeBase.greetings[
        Math.floor(Math.random() * aiKnowledgeBase.greetings.length)
      ];
      
      setMessages([
        {
          id: 1,
          text: `${randomGreeting} I'm ${personality.name}, your friendly AI fitness assistant! ${personality.emoji}`,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: [
            "Plan today's workout 🏋️‍♂️",
            "Nutrition tips for my goals 🍎",
            "Help me stay motivated 💫",
            "Recovery advice 😴",
            "Fun fitness facts! 🤓"
          ],
          personality: aiPersonality,
          mood: "excited"
        }
      ]);
    }
  }, [user, aiPersonality]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getInitials = () => user ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase() : "GU";

  const handleLogout = () => {
    localStorage.removeItem('fitpro_user');
    navigate('/login');
  };

  const detectUserMood = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("tired") || lowerMessage.includes("exhausted") || lowerMessage.includes("can't")) {
      return { mood: "tired", response: "encouraging" };
    } else if (lowerMessage.includes("happy") || lowerMessage.includes("great") || lowerMessage.includes("awesome")) {
      return { mood: "happy", response: "celebratory" };
    } else if (lowerMessage.includes("sad") || lowerMessage.includes("stuck") || lowerMessage.includes("plateau")) {
      return { mood: "discouraged", response: "supportive" };
    } else if (lowerMessage.includes("motivated") || lowerMessage.includes("pumped") || lowerMessage.includes("ready")) {
      return { mood: "energetic", response: "energetic" };
    }
    
    return { mood: "neutral", response: "friendly" };
  };

  const getPersonalityResponse = (personality, topic, userMood) => {
    const personalityInfo = aiPersonalities[personality];
    let response = "";
    let suggestions = [];
    let mood = "friendly";

    // Select response based on personality and topic
    switch(personality) {
      case "friendly-coach":
        response = `${personalityInfo.emoji} Great question! As your coach, I'd recommend `;
        mood = "encouraging";
        suggestions = ["Show me a sample routine", "How many sets?", "When to progress?"];
        break;
      case "nutrition-expert":
        response = `${personalityInfo.emoji} Nutrition is my specialty! For optimal results, `;
        mood = "knowledgeable";
        suggestions = ["Meal timing tips", "Healthy snacks", "Macro breakdown"];
        break;
      case "motivation-master":
        response = `${personalityInfo.emoji} Love the energy! To maximize your efforts, `;
        mood = "energetic";
        suggestions = ["Motivation tips", "Goal setting", "Progress tracking"];
        break;
      case "recovery-guru":
        response = `${personalityInfo.emoji} Recovery is key! For better results, `;
        mood = "calm";
        suggestions = ["Sleep optimization", "Active recovery", "Stress management"];
        break;
    }

    // Add mood-based response
    if (userMood === "tired") {
      response = `😌 I understand you're feeling tired. Remember, it's okay to listen to your body. ` + response;
    } else if (userMood === "happy") {
      response = `🎉 That's amazing to hear! Your positive energy is contagious! ` + response;
    } else if (userMood === "discouraged") {
      response = `🤗 Hey, we all hit rough patches. What matters is that you're here, trying. ` + response;
    }

    return { response, suggestions, mood };
  };

  const generateAIResponse = (userMessage, context) => {
    const lowerMessage = userMessage.toLowerCase();
    const mood = detectUserMood(userMessage);
    const personalityResponse = getPersonalityResponse(aiPersonality, "general", mood.mood);
    
    let response = personalityResponse.response;
    let suggestions = personalityResponse.suggestions;
    let aiMood = personalityResponse.mood;
    
    // Add relevant knowledge based on topic
    if (lowerMessage.includes("workout") || lowerMessage.includes("exercise") || lowerMessage.includes("train")) {
      const workoutTip = aiKnowledgeBase.workouts[Math.floor(Math.random() * aiKnowledgeBase.workouts.length)];
      response += `${workoutTip.tip} ${workoutTip.friendly} ${workoutTip.emoji}`;
      
      // Add motivational quote 30% of the time
      if (Math.random() > 0.7) {
        const motivation = aiKnowledgeBase.motivation[Math.floor(Math.random() * aiKnowledgeBase.motivation.length)];
        response += `\n\n${motivation}`;
      }
      
    } else if (lowerMessage.includes("nutrition") || lowerMessage.includes("diet") || lowerMessage.includes("food")) {
      const nutritionTip = aiKnowledgeBase.nutrition[Math.floor(Math.random() * aiKnowledgeBase.nutrition.length)];
      response += `${nutritionTip.tip} ${nutritionTip.friendly} ${nutritionTip.emoji}`;
      
    } else if (lowerMessage.includes("recovery") || lowerMessage.includes("rest") || lowerMessage.includes("sleep")) {
      const recoveryTip = aiKnowledgeBase.recovery[Math.floor(Math.random() * aiKnowledgeBase.recovery.length)];
      response += `${recoveryTip.tip} ${recoveryTip.friendly} ${recoveryTip.emoji}`;
      
    } else if (lowerMessage.includes("motivat") || lowerMessage.includes("stuck") || lowerMessage.includes("plateau")) {
      const motivation = aiKnowledgeBase.motivation[Math.floor(Math.random() * aiKnowledgeBase.motivation.length)];
      response = `${aiPersonalities[aiPersonality].emoji} ${motivation}`;
      suggestions = ["Share your progress", "Set a new goal", "Try something different"];
      aiMood = "inspiring";
      
    } else if (lowerMessage.includes("fun") || lowerMessage.includes("fact") || lowerMessage.includes("interesting")) {
      const funFact = aiKnowledgeBase.funFacts[Math.floor(Math.random() * aiKnowledgeBase.funFacts.length)];
      response = `🤓 ${funFact} Want to hear another?`;
      suggestions = ["Another fun fact!", "Science behind this", "More cool facts"];
      aiMood = "playful";
      
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      const greeting = aiKnowledgeBase.greetings[Math.floor(Math.random() * aiKnowledgeBase.greetings.length)];
      response = `${greeting} How can I help you today? ${aiPersonalities[aiPersonality].emoji}`;
      suggestions = ["How are you?", "What can you help with?", "Tell me about yourself"];
      aiMood = "welcoming";
      
    } else if (lowerMessage.includes("how are you") || lowerMessage.includes("how do you feel")) {
      response = `${aiPersonalities[aiPersonality].emoji} I'm feeling ${aiMood} and ready to help you with your fitness journey! How about you?`;
      suggestions = ["I'm feeling great!", "A bit tired today", "Need motivation"];
      aiMood = "curious";
      
    } else {
      response += "I'd love to help you with that! Could you tell me a bit more about what you're looking for?";
      suggestions = ["Workout advice", "Nutrition tips", "Recovery help", "Motivation"];
    }

    // Add personal touch based on user context
    if (context.goal) {
      const goalMap = {
        "weight_loss": "weight loss",
        "muscle_gain": "building muscle",
        "endurance": "improving endurance",
        "strength": "getting stronger"
      };
      response += `\n\nSince you're focusing on ${goalMap[context.goal] || "your fitness goals"}, this advice is especially relevant!`;
    }

    // Occasionally add emoji for friendliness
    const emojis = ["💪", "✨", "🌟", "🔥", "🚀", "🌈", "🎯", "🏆"];
    if (Math.random() > 0.5) {
      response += ` ${emojis[Math.floor(Math.random() * emojis.length)]}`;
    }

    return { response, suggestions, mood: aiMood };
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: detectUserMood(inputMessage).mood
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, conversationContext);
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse.response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: aiResponse.suggestions,
        personality: aiPersonality,
        mood: aiResponse.mood
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Occasionally add a fun fact after response (20% chance)
      if (Math.random() > 0.8 && aiResponse.mood !== "playful") {
        setTimeout(() => {
          const funFact = aiKnowledgeBase.funFacts[Math.floor(Math.random() * aiKnowledgeBase.funFacts.length)];
          const bonusMessage = {
            id: messages.length + 3,
            text: `💡 Quick fun fact: ${funFact}`,
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            mood: "playful"
          };
          setMessages(prev => [...prev, bonusMessage]);
        }, 1000);
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickSuggestion = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    // Show temporary feedback
    const event = new CustomEvent('showToast', { 
      detail: { 
        message: 'Copied to clipboard! 📋',
        type: 'success' 
      } 
    });
    window.dispatchEvent(event);
  };

  const handleFeedback = (messageId, type) => {
    const event = new CustomEvent('showToast', { 
      detail: { 
        message: type === 'like' ? 'Thanks for the feedback! 👍' : 'Thanks, I\'ll improve! 👌',
        type: 'info' 
      } 
    });
    window.dispatchEvent(event);
  };

  const handleNewChat = () => {
    const personality = aiPersonalities[aiPersonality];
    const randomGreeting = aiKnowledgeBase.greetings[
      Math.floor(Math.random() * aiKnowledgeBase.greetings.length)
    ];
    
    setMessages([
      {
        id: 1,
        text: `${randomGreeting} I'm ${personality.name}, your friendly AI fitness assistant! ${personality.emoji}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          "Plan today's workout 🏋️‍♂️",
          "Nutrition tips for my goals 🍎",
          "Help me stay motivated 💫",
          "Recovery advice 😴",
          "Fun fitness facts! 🤓"
        ],
        personality: aiPersonality,
        mood: "excited"
      }
    ]);
  };

  const changePersonality = (personality) => {
    setAiPersonality(personality);
    const personalityInfo = aiPersonalities[personality];
    
    // Add personality change message
    const changeMessage = {
      id: messages.length + 1,
      text: `🌟 Switched to ${personalityInfo.name} mode! ${personalityInfo.greeting} ${personalityInfo.emoji}`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: "excited"
    };
    
    setMessages(prev => [...prev, changeMessage]);
  };

  const getMoodColor = (mood) => {
    switch(mood) {
      case "excited": return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "encouraging": return "bg-gradient-to-r from-blue-400 to-teal-500";
      case "calm": return "bg-gradient-to-r from-purple-400 to-pink-500";
      case "energetic": return "bg-gradient-to-r from-red-400 to-orange-500";
      case "playful": return "bg-gradient-to-r from-green-400 to-emerald-500";
      case "inspiring": return "bg-gradient-to-r from-indigo-400 to-purple-500";
      default: return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Getting your AI assistant ready...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing personalized fitness guidance 🏋️‍♂️</p>
        </div>
      </div>
    );
  }

  const currentPersonality = aiPersonalities[aiPersonality];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${currentPersonality.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              FitPro AI Assistant
            </h1>
            <p className="text-xs text-gray-500 font-medium">Your {currentPersonality.tone} fitness companion</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Personality Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {currentPersonality.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(aiPersonalities).map(([key, personality]) => (
                <DropdownMenuItem 
                  key={key}
                  onClick={() => changePersonality(key)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${personality.color}`} />
                  {personality.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-xs sm:text-sm"
            size="sm"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
          
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 hover:bg-gray-50 rounded-xl px-2 py-1.5 transition-colors">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-purple-500/20">
                  <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 font-bold text-sm sm:text-base">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.firstname} {user.lastname}</p>
                  <p className="text-xs leading-none text-gray-500">{user.email}</p>
                  <Badge className="mt-1 w-fit bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                    AI Assistant
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard')}>
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/analyze')}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 h-[calc(100vh-140px)] flex flex-col">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                Chat with {currentPersonality.name} {currentPersonality.emoji}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Your friendly AI fitness companion. Ask anything about workouts, nutrition, or motivation!
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleNewChat}
                className="flex items-center gap-2 text-xs sm:text-sm"
                size="sm"
              >
                <RefreshCw className="w-4 h-4" />
                New Chat
              </Button>
              
              {/* Mobile Personality Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="sm:hidden">
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {Object.entries(aiPersonalities).map(([key, personality]) => (
                    <DropdownMenuItem 
                      key={key}
                      onClick={() => changePersonality(key)}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${personality.color}`} />
                      {personality.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Personality Cards */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(aiPersonalities).map(([key, personality]) => (
              <button
                key={key}
                onClick={() => changePersonality(key)}
                className={`p-3 rounded-lg border transition-all ${
                  aiPersonality === key 
                    ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 shadow-sm' 
                    : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${personality.color}`} />
                  <span className="text-xs font-medium text-gray-700">{personality.name}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{personality.tone}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages Area */}
          <Card className="flex-1 border-0 shadow-sm mb-3 sm:mb-4 overflow-hidden">
            <CardContent className="p-4 sm:p-6 h-full overflow-y-auto">
              <div className="space-y-4 sm:space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3 sm:space-y-4">
                    {/* Message Bubble */}
                    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] sm:max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-start space-x-2 sm:space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Avatar className={`h-8 w-8 ${message.sender === 'ai' ? `bg-gradient-to-br ${currentPersonality.color}` : 'bg-gradient-to-br from-blue-500 to-cyan-500'}`}>
                            <AvatarFallback className="bg-transparent text-white">
                              {message.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
                              message.sender === 'user' 
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                                : 'bg-gradient-to-br from-gray-50 to-white text-gray-800 border border-gray-100'
                            }`}>
                              <p className="text-sm sm:text-base whitespace-pre-wrap">{message.text}</p>
                            </div>
                            <div className={`flex items-center justify-between mt-1 sm:mt-2 text-xs ${message.sender === 'user' ? 'text-right' : ''}`}>
                              <span className="text-gray-500">{message.timestamp}</span>
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                {message.sender === 'ai' && (
                                  <>
                                    <button 
                                      onClick={() => handleCopyMessage(message.text)}
                                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                      title="Copy message"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </button>
                                    <button 
                                      onClick={() => handleFeedback(message.id, 'like')}
                                      className="text-gray-400 hover:text-green-500 transition-colors p-1"
                                      title="Helpful"
                                    >
                                      <ThumbsUp className="w-3 h-3" />
                                    </button>
                                    <button 
                                      onClick={() => handleFeedback(message.id, 'dislike')}
                                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                      title="Not helpful"
                                    >
                                      <ThumbsDown className="w-3 h-3" />
                                    </button>
                                  </>
                                )}
                                {message.mood && message.sender === 'ai' && (
                                  <div className={`w-2 h-2 rounded-full ${getMoodColor(message.mood)}`} title={message.mood} />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    {message.sender === 'ai' && message.suggestions && (
                      <div className="flex flex-wrap gap-1 sm:gap-2 ml-10 sm:ml-12">
                        {message.suggestions.map((suggestion, idx) => (
                          <Badge 
                            key={idx}
                            variant="outline"
                            className="cursor-pointer hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors text-xs"
                            onClick={() => handleQuickSuggestion(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator with Personality */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%]">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500">
                          <AvatarFallback className="bg-transparent text-white">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{currentPersonality.name} is thinking</span>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-200"></div>
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-400"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>
          </Card>

          {/* Quick Topics */}
          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1 sm:mb-2">Quick questions to ask:</p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {[
                "How do I start working out? 🏋️‍♂️",
                "Best foods for energy? 🍎",
                "Need motivation today! 💫",
                "Help me recover better 😴",
                "Tell me a fun fact! 🤓",
                "Create a quick workout ⏱️"
              ].map((topic) => (
                <Badge 
                  key={topic}
                  variant="outline"
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 hover:border-purple-200 transition-colors text-xs"
                  onClick={() => handleQuickSuggestion(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-3 sm:p-4">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder={`Ask ${currentPersonality.name} anything about fitness... (e.g., "I'm feeling tired today, what should I do?")`}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 pr-10 text-sm sm:text-base"
                    disabled={isTyping}
                  />
                  {inputMessage && (
                    <button
                      type="button"
                      onClick={() => setInputMessage("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Button 
                  type="submit" 
                  disabled={!inputMessage.trim() || isTyping}
                  className={`bg-gradient-to-r ${currentPersonality.color} hover:opacity-90 shadow-lg`}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>Tip: Share how you're feeling for personalized advice! 😊</span>
                <span>{messages.length} messages</span>
              </div>
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <div className="mt-3 sm:mt-4 grid grid-cols-3 sm:grid-cols-5 gap-1 sm:gap-2">
            {[
              { icon: Dumbbell, label: "Workout Plans", color: "from-blue-500 to-cyan-500" },
              { icon: Heart, label: "Nutrition", color: "from-green-500 to-emerald-500" },
              { icon: Zap, label: "Motivation", color: "from-orange-500 to-amber-500" },
              { icon: Moon, label: "Recovery", color: "from-purple-500 to-pink-500" },
              { icon: Star, label: "24/7 Support", color: "from-yellow-500 to-orange-500" }
            ].map((capability, index) => (
              <div key={index} className="text-center p-2 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${capability.color} rounded-lg flex items-center justify-center mx-auto mb-1`}>
                  <capability.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <p className="text-xs font-medium text-gray-700">{capability.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Notification Component */}
      <div id="toast-container" className="fixed bottom-4 right-4 z-50"></div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        /* Smooth scroll behavior */
        .chat-messages {
          scroll-behavior: smooth;
        }
        
        /* Gradient text */
        .gradient-text {
          background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      
      {/* Toast Notification Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('showToast', function(e) {
            const { message, type } = e.detail;
            const container = document.getElementById('toast-container');
            
            const toast = document.createElement('div');
            toast.className = \`bg-white border border-gray-200 rounded-lg shadow-lg p-3 mb-2 flex items-center gap-2 animate-in slide-in-from-right-2\`;
            toast.innerHTML = \`
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span class="text-white text-sm">🤖</span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">\${message}</p>
                <p class="text-xs text-gray-500">AI Assistant</p>
              </div>
            \`;
            
            container.appendChild(toast);
            
            setTimeout(() => {
              toast.classList.add('animate-out', 'slide-out-to-right-2');
              setTimeout(() => toast.remove(), 300);
            }, 3000);
          });
        `
      }} />
    </div>
  );
};

export default FitnessAIChat;