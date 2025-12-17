// pages/Analyze.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import {
  TrendingUp, Activity, Target, BarChart3,
  Award, PieChart as PieChartIcon, Brain,
  Calendar, Users, Settings, Home, ArrowLeft,
  Dumbbell, Heart, ChevronRight, Zap, Bell, LogOut,
  Flame, Droplets, Footprints, BatteryCharging,User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const AnalyzePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('performance');

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

  // Sample data - In a real app, this would come from an API
  const workoutData = {
    weekly: [
      { day: 'Mon', strength: 65, cardio: 45, duration: 60, calories: 420 },
      { day: 'Tue', strength: 70, cardio: 40, duration: 65, calories: 450 },
      { day: 'Wed', strength: 75, cardio: 50, duration: 70, calories: 480 },
      { day: 'Thu', strength: 80, cardio: 55, duration: 75, calories: 510 },
      { day: 'Fri', strength: 85, cardio: 60, duration: 80, calories: 540 },
      { day: 'Sat', strength: 90, cardio: 65, duration: 85, calories: 570 },
      { day: 'Sun', strength: 95, cardio: 70, duration: 90, calories: 600 }
    ],
    monthly: [
      { week: 'Week 1', strength: 420, cardio: 280, duration: 500 },
      { week: 'Week 2', strength: 450, cardio: 320, duration: 550 },
      { week: 'Week 3', strength: 480, cardio: 350, duration: 600 },
      { week: 'Week 4', strength: 520, cardio: 380, duration: 650 }
    ]
  };

  const bodyComposition = [
    { name: 'Muscle', value: 42.5, color: '#3B82F6', ideal: 40, trend: '+2.5' },
    { name: 'Fat', value: 18.2, color: '#EF4444', ideal: 15, trend: '-1.8' },
    { name: 'Bone', value: 14.8, color: '#10B981', ideal: 15, trend: '-0.2' },
    { name: 'Water', value: 24.5, color: '#8B5CF6', ideal: 25, trend: '-0.5' }
  ];

  const performanceMetrics = [
    { metric: 'Strength', score: 85, trend: '+5', color: '#3B82F6' },
    { metric: 'Endurance', score: 78, trend: '+8', color: '#10B981' },
    { metric: 'Flexibility', score: 65, trend: '+12', color: '#8B5CF6' },
    { metric: 'Speed', score: 72, trend: '+3', color: '#F59E0B' },
    { metric: 'Recovery', score: 90, trend: '+2', color: '#EC4899' }
  ];

  const progressInsights = {
    consistency: 88,
    intensity: 75,
    improvement: 4.2,
    streak: 14
  };

  const recommendations = [
    {
      title: "Increase Protein Intake",
      description: "Add 15g of protein daily to support muscle growth",
      priority: "High",
      icon: Flame,
      category: "Nutrition"
    },
    {
      title: "Add Cardio Sessions",
      description: "Include 20 minutes of HIIT after strength training",
      priority: "Medium",
      icon: Activity,
      category: "Workout"
    },
    {
      title: "Improve Sleep Quality",
      description: "Aim for 7-9 hours with consistent sleep schedule",
      priority: "High",
      icon: BatteryCharging,
      category: "Recovery"
    },
    {
      title: "Hydration Boost",
      description: "Increase water intake by 500ml daily",
      priority: "Medium",
      icon: Droplets,
      category: "Health"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('fitpro_user');
    navigate('/login');
  };

  const getInitials = () => user ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase() : "GU";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const currentData = timeRange === '7d' ? workoutData.weekly : workoutData.monthly;
  const dataKey = timeRange === '7d' ? 'day' : 'week';

  // Stat Card Component
  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className={trend > 0 ? "text-green-500" : "text-red-500"} />
              <span className={`ml-1 text-sm font-medium ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            </div>
          )}
        </div>
        <div className={`bg-gradient-to-br ${color} p-3 rounded-xl shadow`}>
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                FitPro Analytics
              </h1>
              <p className="text-xs text-gray-500 font-medium">Advanced Fitness Insights</p>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link to="/dashboard">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
          
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100 rounded-full px-3 py-2">
                <Avatar className="h-10 w-10 border-2 border-blue-500/20">
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 font-bold">
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
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                <User className="w-4 h-4 mr-2" />
                Profile
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

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Advanced Analytics <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Dashboard</span>
            </h1>
            <p className="text-gray-600">
              Deep insights and AI-powered analysis of your fitness journey, {user.firstname}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent border-none outline-none text-gray-700 text-sm font-medium"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Live Data
            </Badge>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="performance" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Activity className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="body" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Heart className="w-4 h-4 mr-2" />
              Body Stats
            </TabsTrigger>
            <TabsTrigger value="trends" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="insights" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Brain className="w-4 h-4 mr-2" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Activity} 
                title="Workout Consistency" 
                value={`${progressInsights.consistency}%`} 
                subtitle="On track" 
                color="from-blue-500 to-cyan-500"
                trend={5} 
              />
              <StatCard 
                icon={Flame} 
                title="Average Intensity" 
                value={`${progressInsights.intensity}%`} 
                subtitle="Excellent" 
                color="from-orange-500 to-amber-500"
                trend={8} 
              />
              <StatCard 
                icon={TrendingUp} 
                title="Monthly Improvement" 
                value={`${progressInsights.improvement}%`} 
                subtitle="Progress rate" 
                color="from-emerald-500 to-green-500"
                trend={12} 
              />
              <StatCard 
                icon={Target} 
                title="Current Streak" 
                value={`${progressInsights.streak} days`} 
                subtitle="Keep going!" 
                color="from-violet-500 to-purple-500"
                trend={2} 
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Workout Performance Chart */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">Workout Performance</CardTitle>
                      <CardDescription>Strength vs Cardio comparison</CardDescription>
                    </div>
                    <BarChart3 className="w-6 h-6 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={currentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey={dataKey} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="strength" fill="#3B82F6" name="Strength" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="cardio" fill="#10B981" name="Cardio" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Radar Chart */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">Skill Assessment</CardTitle>
                      <CardDescription>Multi-dimensional fitness profile</CardDescription>
                    </div>
                    <Target className="w-6 h-6 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={performanceMetrics}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Current"
                        dataKey="score"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.2}
                      />
                      <Tooltip />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Body Stats Tab */}
          <TabsContent value="body" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Body Composition */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">Body Composition</CardTitle>
                      <CardDescription>Detailed breakdown</CardDescription>
                    </div>
                    <PieChartIcon className="w-6 h-6 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={bodyComposition}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {bodyComposition.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-4">
                      {bodyComposition.map((item) => (
                        <div key={item.name} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                              <span className="font-medium text-gray-700">{item.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900">{item.value}%</div>
                              <div className={`text-xs ${parseFloat(item.trend) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {item.trend}% vs ideal
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Trend */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">Calories & Duration Trend</CardTitle>
                      <CardDescription>Weekly progression</CardDescription>
                    </div>
                    <TrendingUp className="w-6 h-6 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={workoutData.weekly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="calories" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} name="Calories" />
                      <Area type="monotone" dataKey="duration" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} name="Duration (min)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            {/* Recommendations */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">AI-Powered Recommendations</CardTitle>
                    <CardDescription>Personalized suggestions based on your data</CardDescription>
                  </div>
                  <Brain className="w-6 h-6 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((rec, index) => {
                    const Icon = rec.icon;
                    return (
                      <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            rec.priority === 'High' 
                              ? 'bg-gradient-to-br from-red-500 to-pink-500' 
                              : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                          }`}>
                            <Icon size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-gray-900">{rec.title}</h4>
                              <Badge className={
                                rec.priority === 'High' 
                                  ? 'bg-red-100 text-red-700 border-red-200' 
                                  : 'bg-blue-100 text-blue-700 border-blue-200'
                              }>
                                {rec.priority}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{rec.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {rec.category}
                              </Badge>
                              <Button size="sm" variant="outline" className="text-xs">
                                Apply Suggestion
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Performance Metrics Analysis</CardTitle>
                <CardDescription>Detailed breakdown of key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric) => (
                    <div key={metric.metric} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">{metric.metric}</span>
                        <div className="flex items-center">
                          <span className="font-bold text-gray-900 mr-3">{metric.score}%</span>
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {metric.trend}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={metric.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">Total Calories</p>
            <p className="text-2xl font-bold text-gray-900">42.5K</p>
            <p className="text-xs text-green-600 font-medium mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +18% vs last month
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">Avg Workout Score</p>
            <p className="text-2xl font-bold text-gray-900">8.7</p>
            <p className="text-xs text-blue-600 font-medium mt-1">/10 rating</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">Recovery Index</p>
            <p className="text-2xl font-bold text-gray-900">92%</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">Optimal range</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">VO2 Max</p>
            <p className="text-2xl font-bold text-gray-900">48.2</p>
            <p className="text-xs text-purple-600 font-medium mt-1">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;