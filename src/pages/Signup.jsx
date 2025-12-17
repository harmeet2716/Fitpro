import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dumbbell, Mail, Lock, Eye, EyeOff, Zap, User, Phone, ShieldCheck, Target, Activity, Users, Award, TrendingUp, Calendar, CheckCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function ProfessionalSignup({ setUser }) {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{7,}$/;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!strongPasswordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 7 characters, include 1 uppercase letter, 1 number & 1 symbol"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    if (!firstname) return alert("First name is required");
    if (!lastname) return alert("Last name is required");
    if (!email) return alert("Email is required");
    if (!password) return alert("Password is required");
    if (!confirmPassword) return alert("Confirm Password is required");
    if (!number) return alert("Contact Number is required");
    if (password !== confirmPassword) return alert("Passwords do not match");
    if (passwordError) return alert("Please enter a strong password");
    if (!agreedToTerms) return alert("You must agree to the terms and conditions");

    setIsLoading(true);
    try {
     // Signup      
      const res = await api.post("/users/signup", { firstname, lastname, email, password, number, gender });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Signup failed");
      }

      // Auto login after signup
      const loginRes = await api.post("/api/users/login", { email, password });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        return alert(loginData.message || "Login failed after signup");
      }

      // Set user and navigate
      if (setUser) {
        setUser(loginData.user);
      }
      
      alert("Signup successful! Welcome to FitPro!");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Brand Showcase */}
      <div className="md:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          
          {/* Fitness Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4">
              <Activity className="w-24 h-24" />
            </div>
            <div className="absolute top-2/3 right-1/3">
              <Target className="w-20 h-20" />
            </div>
            <div className="absolute bottom-1/4 left-1/3">
              <Users className="w-16 h-16" />
            </div>
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">FitPro</h1>
              <p className="text-orange-300 font-medium">Join the Fitness Revolution</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="max-w-md">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
                  Transformation
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-10">
                Join thousands of fitness enthusiasts tracking their journey with professional tools.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center mb-3">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Progress Tracking</h3>
                  <p className="text-sm text-gray-400">Advanced analytics</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-3">
                    <Calendar className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Workout Plans</h3>
                  <p className="text-sm text-gray-400">Personalized routines</p>
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

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20">
                <p className="text-white italic mb-4">
                  "Joining FitPro was the best decision for my fitness journey. The tools and community kept me motivated to achieve my goals."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"></div>
                  <div className="ml-3">
                    <div className="font-semibold text-white">Sarah Miller</div>
                    <div className="text-sm text-orange-300">Marathon Runner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div>Active Users</div>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div>Average Rating</div>
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

      {/* Right Side - Signup Form */}
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 relative">
        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 opacity-10">
          <Target className="w-32 h-32 text-gray-400" />
        </div>
        <div className="absolute bottom-8 left-8 opacity-10">
          <Activity className="w-24 h-24 text-gray-400" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join FitPro and start your fitness journey</p>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
            
            <CardContent className="pt-8 pb-6 px-8">
              <form onSubmit={handleSignup} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      First Name
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input 
                        type="text" 
                        placeholder="John" 
                        value={firstname} 
                        onChange={(e) => setFirstname(e.target.value)} 
                        className="pl-10 pr-4 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl" 
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Last Name
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input 
                        type="text" 
                        placeholder="Doe" 
                        value={lastname} 
                        onChange={(e) => setLastname(e.target.value)} 
                        className="pl-10 pr-4 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl" 
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Mail className="w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <Input 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="pl-10 pr-4 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl" 
                      required
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </Label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Phone className="w-4 h-4 text-gray-400" />
                    </div>
                    <Input 
                      type="tel" 
                      placeholder="Your phone number" 
                      value={number} 
                      onChange={(e) => setNumber(e.target.value)} 
                      className="pl-10 pr-4 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl" 
                      required
                    />
                  </div>
                </div>

                {/* Gender Field */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Gender (Optional)
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={gender === "male" ? "default" : "outline"}
                      className={`h-12 ${gender === "male" ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white" : ""}`}
                      onClick={() => setGender(gender === "male" ? "" : "male")}
                    >
                      Male
                    </Button>
                    <Button
                      type="button"
                      variant={gender === "female" ? "default" : "outline"}
                      className={`h-12 ${gender === "female" ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white" : ""}`}
                      onClick={() => setGender(gender === "female" ? "" : "female")}
                    >
                      Female
                    </Button>
                    <Button
                      type="button"
                      variant={gender === "other" ? "default" : "outline"}
                      className={`h-12 ${gender === "other" ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white" : ""}`}
                      onClick={() => setGender(gender === "other" ? "" : "other")}
                    >
                      Other
                    </Button>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Lock className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Create a strong password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        className="pl-10 pr-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl" 
                        required
                      />
                      <button 
                        type="button" 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors p-1.5"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {passwordError && (
                      <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                        <ShieldCheck className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-600">{passwordError}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Lock className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirm your password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="pl-10 pr-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl" 
                        required
                      />
                      <button 
                        type="button" 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors p-1.5"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                        <ShieldCheck className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-600">Passwords do not match</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link to="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Signup Button */}
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-12 text-white font-semibold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Start Free Journey</span>
                      <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors w-full"
                >
                  <span>Sign In to Existing Account</span>
                  <CheckCircle className="w-5 h-5" />
                </Link>
              </div>
            </CardContent>

            <CardFooter className="pb-8 pt-6 px-8 border-t border-gray-100">
              <div className="w-full text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our terms and confirm you're at least 18 years old.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}