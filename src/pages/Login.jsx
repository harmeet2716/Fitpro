import { useState } from "react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Dumbbell,
  Zap,
  Target,
  Activity,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api"; // axios instance

export default function ProfessionalLogin({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      // ✅ AXIOS CALL (correct)
      const res = await api.post("/api/users/login", {
        email,
        password,
      });

      // ✅ AXIOS RESPONSE DATA
      const data = res.data;

      // Save user
      localStorage.setItem("fitpro_user", JSON.stringify(data.user));

      if (rememberMe) {
        localStorage.setItem("fitpro_remember", "true");
      }

      if (setUser) {
        setUser(data.user);
      }

      navigate("/user-profile", {
        state: { user: data.user },
        replace: true,
      });
    } catch (err) {
      console.error(err);

      // ✅ Proper axios error handling
      if (err.response && err.response.data) {
        alert(err.response.data.message || "Login failed");
      } else {
        alert("Server error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SECTION */}
      <div className="md:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 relative overflow-hidden">
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
            <h2 className="text-4xl font-bold text-white mb-6">
              Elevate Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
                Fitness Journey
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-10">
              Track, analyze, and optimize every aspect of your fitness.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <Feature icon={TrendingUp} title="Progress Tracking" />
              <Feature icon={Target} title="Smart Goals" />
              <Feature icon={Users} title="Community" />
              <Feature icon={Award} title="Achievements" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

          <Card className="shadow-xl">
            <CardContent className="pt-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="justify-center">
              <p>
                New here? <Link to="/signup" className="text-orange-600">Create account</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, title }) {
  return (
    <div className="bg-white/5 p-4 rounded-xl">
      <Icon className="text-orange-400 mb-2" />
      <h3 className="text-white font-semibold">{title}</h3>
    </div>
  );
}
