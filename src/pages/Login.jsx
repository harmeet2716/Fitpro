import { useState } from "react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Mail, Lock, Eye, EyeOff, Dumbbell, Zap, Target, Activity, TrendingUp, Users, Award } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function ProfessionalLogin({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Email and password are required");

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message || "Login failed");

      localStorage.setItem("fitpro_user", JSON.stringify(data.user));

      if (setUser) {
        setUser(data.user);
      }

      navigate("/user-profile", {
        state: { user: data.user },
        replace: true,
      });
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4">
              <Dumbbell className="w-24 h-24" />
            </div>
            <div className="absolute top-2/3 right-1/3">
              <Target className="w-20 h-20" />
            </div>
            <div className="absolute bottom-1/4 left-1/3">
              <Activity className="w-16 h-16" />
            </div>
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">FitPro</h1>
              <p className="text-orange-300 font-medium">Professional Fitness Platform</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="max-w-md">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Elevate Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
                  Fitness Journey
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-10">
                Track, analyze, and optimize every aspect of your fitness with professional-grade tools.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center mb-3">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Progress Tracking</h3>
                  <p className="text-sm text-gray-400">Monitor every metric</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-3">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Smart Goals</h3>
                  <p className="text-sm text-gray-400">AI-powered planning</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Community</h3>
                  <p className="text-sm text-gray-400">Connect & compete</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-3">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Achievements</h3>
                  <p className="text-sm text-gray-400">Earn rewards</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20">
                <p className="text-white italic mb-4">
                  "FitPro transformed how I approach fitness. The analytics are unmatched and the community keeps me motivated."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full"></div>
                  <div className="ml-3">
                    <div className="font-semibold text-white">Alex Johnson</div>
                    <div className="text-sm text-orange-300">Professional Trainer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div>Active Users</div>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.8%</div>
                <div>Satisfaction</div>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div>Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 relative">
        <div className="absolute top-8 right-8 opacity-10">
          <Dumbbell className="w-32 h-32 text-gray-400" />
        </div>
        <div className="absolute bottom-8 left-8 opacity-10">
          <Activity className="w-24 h-24 text-gray-400" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your fitness dashboard</p>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-8 pb-6 px-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Email Address</Label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 pr-4 h-12 border-2 border-gray-200 rounded-xl focus:border-orange-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Password</Label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 border-2 border-gray-200 rounded-xl focus:border-orange-500"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 p-1.5 rounded-lg"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600 font-medium">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm font-medium text-orange-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-white font-semibold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 justify-center">
                      <span>Sign In</span>
                      <Zap className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12 border-2 border-gray-200 rounded-xl" type="button">
                  Google
                </Button>
                <Button variant="outline" className="h-12 border-2 border-gray-200 rounded-xl" type="button">
                  Facebook
                </Button>
              </div>
            </CardContent>

            <CardFooter className="pb-8 pt-6 px-8 border-t border-gray-100">
              <div className="w-full text-center">
                <p className="text-gray-600 font-medium">
                  New to FitPro?{" "}
                  <Link to="/signup" className="font-semibold text-orange-600 hover:underline">
                    Create an account
                  </Link>
                </p>
                <p className="text-xs text-gray-500 mt-3">By signing in, you agree to our Terms of Service and Privacy Policy</p>
              </div>
            </CardFooter>
          </Card>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Need help? <Link to="/support" className="text-orange-600 font-medium">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
