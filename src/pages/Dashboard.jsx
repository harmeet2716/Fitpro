import React from "react";
import { 
  Dumbbell, 
  ArrowRight, 
  Activity, 
  Target, 
  TrendingUp, 
  Zap,
  Award,
  Users,
  Calendar,
  Heart,
  BarChart3,
  CheckCircle,
  Target as TargetIcon,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock Navbar - replace with your actual Navbar import
const Navbar = ({ user }) => (
  <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
          <Dumbbell className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          FitPro
        </span>
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">Welcome back,</span>
          <span className="px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 font-semibold rounded-lg border border-orange-100">
            {user.firstname}
          </span>
        </div>
      )}
    </div>
  </nav>
);

export default function DashboardLanding({ user }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Professional Header with subtle pattern */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px'
          }}></div>
        </div>

        <Navbar user={user} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Professional badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-semibold text-white tracking-wide">TRUSTED BY FITNESS PROFESSIONALS</span>
              <Zap className="w-5 h-5 text-orange-400" />
            </div>

            {/* Main heading - clean and professional */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              <span className="block">Elevate Your</span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                  Fitness Journey
                </span>
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
              Advanced analytics, personalized workouts, and professional-grade tracking tools 
              to help you achieve your fitness goals with precision.
            </p>

            {/* Professional CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link 
                to="/login"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 transition-all duration-300">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <BarChart3 className="w-6 h-6" />, value: "98%", label: "Accuracy Rate", color: "from-blue-500 to-cyan-500" },
            { icon: <CheckCircle className="w-6 h-6" />, value: "10K+", label: "Goals Achieved", color: "from-green-500 to-emerald-500" },
            { icon: <TargetIcon className="w-6 h-6" />, value: "500K+", label: "Workouts Tracked", color: "from-orange-500 to-red-500" },
            { icon: <Clock className="w-6 h-6" />, value: "24/7", label: "Real-time Support", color: "from-purple-500 to-pink-500" }
          ].map((metric, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center mb-4`}>
                <div className="text-white">{metric.icon}</div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm font-medium text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid - Professional Layout */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Features
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to track, analyze, and optimize your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Activity className="w-8 h-8" />,
              title: "Advanced Analytics",
              description: "Deep insights into your performance with customizable metrics and trends",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: "Goal Tracking",
              description: "Set SMART goals and track progress with precision metrics",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Progress Visualization",
              description: "Interactive charts and graphs to visualize your transformation",
              color: "from-orange-500 to-amber-500"
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: "Achievement System",
              description: "Earn badges and milestones to stay motivated",
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Community Integration",
              description: "Connect with trainers and fellow fitness enthusiasts",
              color: "from-red-500 to-orange-500"
            },
            {
              icon: <Calendar className="w-8 h-8" />,
              title: "Workout Planning",
              description: "Professional workout plans with automatic scheduling",
              color: "from-indigo-500 to-blue-500"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial/Stats Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Trusted by <span className="text-orange-400">Fitness Professionals</span> Worldwide
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Join thousands of trainers and athletes who rely on FitPro for their fitness tracking needs. 
                Our platform delivers enterprise-grade features with consumer-friendly simplicity.
              </p>
              
              <div className="space-y-4">
                {[
                  { label: "User Satisfaction", value: "99%", color: "bg-green-500" },
                  { label: "Goal Completion Rate", value: "87%", color: "bg-blue-500" },
                  { label: "Average Progress Increase", value: "42%", color: "bg-orange-500" }
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>{stat.label}</span>
                      <span className="font-semibold">{stat.value}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${stat.color} rounded-full transition-all duration-1000`}
                        style={{ width: stat.value }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Users className="w-8 h-8" />, value: "50K+", label: "Active Users" },
                { icon: <Dumbbell className="w-8 h-8" />, value: "2M+", label: "Workouts" },
                { icon: <Award className="w-8 h-8" />, value: "150+", label: "Awards" },
                { icon: <Heart className="w-8 h-8" />, value: "4.9", label: "Rating" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <div className="text-orange-400 mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-3xl p-12 text-center border border-orange-100">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto">
            Start your free trial today and experience professional-grade fitness tracking 
            with no commitment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="px-10 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-900 hover:bg-gray-50 transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mt-8">
            No credit card required • Cancel anytime • Full access to all features
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FitPro</span>
            </div>
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} FitPro. Professional Fitness Platform.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}