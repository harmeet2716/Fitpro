import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Dumbbell, 
  Home, 
  Calendar, 
  BarChart3, 
  Target,
  Users,
  Search,
  Bell,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
  Trophy,
  TrendingUp,
  Heart,
  MessageSquare,
  Shield,
  Award,
  Moon,
  Sun
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

export default function ProfessionalNavbar({ user, setUser, theme, setTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Mock notifications
  const [notifications] = useState([
    { id: 1, title: "Workout Complete", message: "You've crushed your daily workout!", time: "5 min ago", read: false, type: "workout" },
    { id: 2, title: "New Achievement", message: "Unlocked 7-Day Streak Badge", time: "1 hour ago", read: false, type: "achievement" },
    { id: 3, title: "Progress Update", message: "You're 85% to your monthly goal", time: "2 hours ago", read: true, type: "progress" },
    { id: 4, title: "Community Challenge", message: "New challenge starting tomorrow", time: "1 day ago", read: true, type: "challenge" },
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation links
  const navLinks = [
    { path: "/home", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { path: "/workouts", label: "Workouts", icon: <Dumbbell className="w-5 h-5" /> },
    { path: "/plans", label: "Plans", icon: <Calendar className="w-5 h-5" /> },
    { path: "/progress", label: "Progress", icon: <TrendingUp className="w-5 h-5" /> },
    { path: "/community", label: "Community", icon: <Users className="w-5 h-5" /> },
  ];

  const dropdownItems = [
    { label: "My Profile", icon: <User className="w-4 h-4" />, path: "/profile" },
    { label: "Settings", icon: <Settings className="w-4 h-4" />, path: "/settings" },
    { label: "Achievements", icon: <Award className="w-4 h-4" />, path: "/achievements" },
    { label: "Help & Support", icon: <MessageSquare className="w-4 h-4" />, path: "/support" },
    { label: "Privacy", icon: <Shield className="w-4 h-4" />, path: "/privacy" },
  ];

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Dumbbell className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  FitNest
                </span>
                <span className="text-xs font-medium text-gray-500 tracking-wider">ELEVATE YOUR FITNESS</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center ml-10 space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 font-semibold border border-orange-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <span className={isActive ? "text-orange-600" : "text-gray-400"}>
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.label}</span>
                    {isActive && (
                      <div className="ml-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            {/* Search (Desktop) */}
            <div className="hidden lg:block relative">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search workouts, plans..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </form>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 hidden lg:flex"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-600" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Notifications */}
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-5 duration-200">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                        <span className="text-sm font-medium text-orange-600">
                          {unreadNotifications} new
                        </span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                            !notification.read ? "bg-orange-50/50" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${
                              notification.type === "workout" ? "bg-green-100 text-green-600" :
                              notification.type === "achievement" ? "bg-yellow-100 text-yellow-600" :
                              notification.type === "progress" ? "bg-blue-100 text-blue-600" :
                              "bg-purple-100 text-purple-600"
                            }`}>
                              {notification.type === "workout" ? <Dumbbell className="w-4 h-4" /> :
                               notification.type === "achievement" ? <Trophy className="w-4 h-4" /> :
                               notification.type === "progress" ? <TrendingUp className="w-4 h-4" /> :
                               <Users className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                      <Link
                        to="/notifications"
                        className="text-center block text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile/Auth */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                >
                  <div className="relative">
                    <Avatar className="w-9 h-9 ring-2 ring-white shadow-sm group-hover:ring-orange-200 transition-all duration-200">
                      <AvatarImage
                        src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.firstname}
                        alt={user.firstname}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold">
                        {user.firstname?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="font-semibold text-gray-900 text-sm">
                      {user.firstname} {user.lastname?.[0] && user.lastname[0] + "."}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {user.role === "premium" ? "🔥 Premium Member" : "🎯 Fitness Explorer"}
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`} />
                </button>

                {/* Profile Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-5 duration-200">
                    {/* User Info */}
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12 ring-2 ring-white">
                          <AvatarImage
                            src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.firstname}
                            alt={user.firstname}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                            {user.firstname?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-gray-900">{user.firstname} {user.lastname}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-center">
                          <div className="font-bold text-gray-900">42</div>
                          <div className="text-xs text-gray-600">Workouts</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900">87%</div>
                          <div className="text-xs text-gray-600">Progress</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900">15</div>
                          <div className="text-xs text-gray-600">Badges</div>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Items */}
                    <div className="py-2">
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span className="text-gray-400">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Auth Buttons
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 hidden sm:block"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Start Free Trial
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 mt-2 pt-4 pb-6 animate-in slide-in-from-top-5 duration-200">
            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workouts, plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </form>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-1 px-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={isActive ? "text-orange-600" : "text-gray-400"}>
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth */}
            {!user && (
              <div className="px-4 mt-6 space-y-3">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}