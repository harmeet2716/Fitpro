// pages/FitnessAIChat.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
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
  TrendingUp
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
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample fitness AI knowledge base
  const aiKnowledgeBase = {
    workouts: [
      "Push-pull-legs split is great for beginners",
      "HIIT workouts should be 20-30 minutes for optimal fat burn",
      "Rest 48 hours between training the same muscle group",
      "Progressive overload is key for muscle growth",
      "Compound exercises are more effective than isolation exercises"
    ],
    nutrition: [
      "Aim for 1.6-2.2g of protein per kg of body weight",
      "Complex carbs before workout, simple carbs after",
      "Stay hydrated with at least 3L of water daily",
      "Healthy fats are essential for hormone production",
      "Meal timing matters less than total daily intake"
    ],
    recovery: [
      "Aim for 7-9 hours of quality sleep per night",
      "Active recovery days improve circulation",
      "Foam rolling helps reduce muscle soreness",
      "Stress management is crucial for recovery",
      "Deload every 4-6 weeks for optimal progress"
    ],
    supplements: [
      "Creatine is the most researched and effective supplement",
      "Protein powder is convenient but not necessary",
      "Pre-workouts can help with energy but monitor caffeine",
      "BCAAs may not be necessary if eating enough protein",
      "Omega-3 supplements support joint health"
    ],
    goals: [
      "Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)",
      "Track progress with photos and measurements, not just weight",
      "Focus on consistency over perfection",
      "Adjust goals every 3 months based on progress",
      "Celebrate small victories along the way"
    ]
  };

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('fitpro_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate]);

  // Initialize with welcome message
  useEffect(() => {
    if (user && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: `Hi ${user.firstname}! I'm your FitPro AI Assistant. I can help you with workouts, nutrition, recovery, and any fitness questions you have. What would you like to know today?`,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: [
            "Create a workout plan",
            "Nutrition advice for muscle gain",
            "How to improve recovery",
            "Supplement recommendations",
            "Goal setting strategies"
          ]
        }
      ]);
    }
  }, [user]);

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

  const generateAIResponse = (userMessage) => {
    // Simple AI logic - in a real app, this would call an API
    const lowerMessage = userMessage.toLowerCase();
    let response = "";
    let suggestions = [];

    // Check which topic the user is asking about
    if (lowerMessage.includes("workout") || lowerMessage.includes("exercise") || lowerMessage.includes("train")) {
      response = `Based on your current fitness level, I recommend focusing on compound movements. ${aiKnowledgeBase.workouts[Math.floor(Math.random() * aiKnowledgeBase.workouts.length)]}`;
      suggestions = ["Sample workout routine", "How many sets and reps?", "When to increase weight?"];
    } else if (lowerMessage.includes("nutrition") || lowerMessage.includes("diet") || lowerMessage.includes("food")) {
      response = `Nutrition is crucial for your goals. ${aiKnowledgeBase.nutrition[Math.floor(Math.random() * aiKnowledgeBase.nutrition.length)]} For personalized advice, I'd need to know your specific goals.`;
      suggestions = ["Meal timing advice", "Macro breakdown", "Healthy snack ideas"];
    } else if (lowerMessage.includes("recovery") || lowerMessage.includes("rest") || lowerMessage.includes("sleep")) {
      response = `Recovery is when your body adapts and grows. ${aiKnowledgeBase.recovery[Math.floor(Math.random() * aiKnowledgeBase.recovery.length)]}`;
      suggestions = ["Active recovery ideas", "Sleep optimization", "Stress management"];
    } else if (lowerMessage.includes("supplement") || lowerMessage.includes("vitamin")) {
      response = `${aiKnowledgeBase.supplements[Math.floor(Math.random() * aiKnowledgeBase.supplements.length)]} Remember, supplements complement a good diet, they don't replace it.`;
      suggestions = ["Dosage recommendations", "Timing of supplements", "Natural alternatives"];
    } else if (lowerMessage.includes("goal") || lowerMessage.includes("progress")) {
      response = `${aiKnowledgeBase.goals[Math.floor(Math.random() * aiKnowledgeBase.goals.length)]} Would you like help creating a specific goal plan?`;
      suggestions = ["Weight loss plan", "Muscle gain roadmap", "Consistency strategies"];
    } else {
      response = "I understand you're asking about fitness. Could you be more specific about what you'd like help with? I can assist with workouts, nutrition, recovery, supplements, or goal setting.";
      suggestions = ["Workout planning", "Nutrition guidance", "Recovery tips", "Supplement advice"];
    }

    return { response, suggestions };
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse.response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: aiResponse.suggestions
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickSuggestion = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleFeedback = (messageId, type) => {
    // In a real app, this would send feedback to your backend
    console.log(`Feedback ${type} for message ${messageId}`);
    // You could add visual feedback here
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        text: `Hi ${user.firstname}! I'm your FitPro AI Assistant. What would you like to know today?`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          "Create a workout plan",
          "Nutrition advice for muscle gain",
          "How to improve recovery",
          "Supplement recommendations",
          "Goal setting strategies"
        ]
      }
    ]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading AI Assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              FitPro AI Assistant
            </h1>
            <p className="text-xs text-gray-500 font-medium">Real-time Fitness Guidance</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Button>
          
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100 rounded-full px-3 py-2">
                <Avatar className="h-10 w-10 border-2 border-purple-500/20">
                  <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.firstname} {user.lastname}</p>
                  <p className="text-xs leading-none text-gray-500">{user.email}</p>
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

      <div className="max-w-6xl mx-auto px-4 py-6 h-[calc(100vh-140px)] flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                AI Fitness Assistant
              </h1>
              <p className="text-gray-600">
                Get personalized fitness advice in real-time. Ask me anything about workouts, nutrition, or recovery.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleNewChat}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Chat
            </Button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages Area */}
          <Card className="flex-1 border-0 shadow-sm mb-4 overflow-hidden">
            <CardContent className="p-6 h-full overflow-y-auto">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-4">
                    {/* Message Bubble */}
                    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Avatar className={`h-8 w-8 ${message.sender === 'ai' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'}`}>
                            <AvatarFallback className="bg-transparent text-white">
                              {message.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className={`px-4 py-3 rounded-2xl ${message.sender === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                              : 'bg-gray-100 text-gray-800'
                            }`}>
                              <p className="text-sm">{message.text}</p>
                            </div>
                            <div className={`flex items-center justify-between mt-2 text-xs ${message.sender === 'user' ? 'text-right' : ''}`}>
                              <span className="text-gray-500">{message.timestamp}</span>
                              <div className="flex items-center space-x-2">
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    {message.sender === 'ai' && message.suggestions && (
                      <div className="flex flex-wrap gap-2 ml-12">
                        {message.suggestions.map((suggestion, idx) => (
                          <Badge 
                            key={idx}
                            variant="outline"
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => handleQuickSuggestion(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%]">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500">
                          <AvatarFallback className="bg-transparent text-white">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="px-4 py-3 rounded-2xl bg-gray-100">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse animation-delay-200"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse animation-delay-400"></div>
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
          <div className="mb-4">
            <p className="text-sm text-gray-500 font-medium mb-2">Quick Topics:</p>
            <div className="flex flex-wrap gap-2">
              {["Workout Plan", "Nutrition Tips", "Recovery Advice", "Supplement Guide", "Goal Setting"].map((topic) => (
                <Badge 
                  key={topic}
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
                  onClick={() => handleQuickSuggestion(`Tell me about ${topic.toLowerCase()}`)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask me anything about fitness, nutrition, or workouts..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    disabled={isTyping}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
              <Dumbbell className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Workout Plans</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <Heart className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Nutrition</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <Target className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Goal Setting</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100">
              <Zap className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Recovery</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <Clock className="w-5 h-5 text-gray-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">24/7 Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default FitnessAIChat;