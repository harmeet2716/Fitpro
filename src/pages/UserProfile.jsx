import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { 
  User, Mail, Phone, Calendar, Dumbbell, Flame, Trophy, Clock, Heart, Users, ChevronRight, Edit, Save, X, LogOut, Camera, Settings, Bell, Shield, Target, Star, Activity
} from "lucide-react";

export default function ProfessionalUserProfile({ user, setUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Load user
  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
      setIsInitialized(true);
      return;
    }
    const savedUser = localStorage.getItem("fitpro_user");
    if (savedUser) {
      try {
        setEditedUser(JSON.parse(savedUser));
        setIsInitialized(true);
      } catch {
        localStorage.removeItem("fitpro_user");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  // Mock stats
  useEffect(() => {
    if (editedUser && Object.keys(editedUser).length > 0) {
      setStats({
        totalWorkouts: Math.floor(Math.random() * 100) + 20,
        streak: Math.floor(Math.random() * 30) + 5,
        level: editedUser.gender === "female" ? "Advanced" : "Intermediate",
        points: Math.floor(Math.random() * 5000) + 1000,
        achievements: Math.floor(Math.random() * 15) + 3,
        consistency: Math.floor(Math.random() * 30) + 70
      });
    }
  }, [editedUser]);

  const handleLogout = () => {
    localStorage.removeItem("fitpro_user");
    if (setUser) setUser(null);
    navigate("/");
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/users/${editedUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedUser),
      });
      if (!res.ok) throw new Error("Update failed");
      const updatedUser = await res.json();
      localStorage.setItem("fitpro_user", JSON.stringify(updatedUser));
      if (setUser) setUser(updatedUser);
      setEditedUser(updatedUser);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) return <div>Loading...</div>;
  if (!editedUser || Object.keys(editedUser).length === 0) return (
    <div>
      <h3>Please login</h3>
      <Button onClick={() => navigate("/login")}>Go to Login</Button>
    </div>
  );

  const getInitials = () => `${editedUser.firstname?.[0] || ''}${editedUser.lastname?.[0] || ''}`.toUpperCase();
  const getLevelColor = level => {
    switch(level?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'advanced': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                {getInitials()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                <Camera className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{editedUser.firstname} {editedUser.lastname}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={`${getLevelColor(stats.level)} font-semibold`}>{stats.level}</Badge>
                <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                  <Flame className="w-3 h-3 mr-1" />{stats.streak} Day Streak
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleEdit}><Edit className="w-4 h-4 mr-2"/>Edit Profile</Button>
            <Button variant="destructive" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2"/>Logout</Button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2"><User className="w-5 h-5 text-gray-600"/>Profile Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>First Name</Label><Input value={editedUser.firstname || ""} onChange={e => handleInputChange("firstname", e.target.value)}/></div>
                  <div className="space-y-2"><Label>Last Name</Label><Input value={editedUser.lastname || ""} onChange={e => handleInputChange("lastname", e.target.value)}/></div>
                </div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" value={editedUser.email || ""} onChange={e => handleInputChange("email", e.target.value)}/></div>
                <div className="space-y-2"><Label>Phone</Label><Input type="tel" value={editedUser.number || ""} onChange={e => handleInputChange("number", e.target.value)}/></div>
                <div className="space-y-2"><Label>Gender</Label>
                  <select value={editedUser.gender || ""} onChange={e => handleInputChange("gender", e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <p><strong>Full Name:</strong> {editedUser.firstname} {editedUser.lastname}</p>
                <p><strong>Email:</strong> {editedUser.email}</p>
                <p><strong>Phone:</strong> {editedUser.number || "Not provided"}</p>
                <p><strong>Gender:</strong> {editedUser.gender || "Not specified"}</p>
              </div>
            )}
          </CardContent>
          {isEditing && (
            <CardFooter className="flex gap-3 justify-end">
              <Button variant="outline" onClick={handleCancel} disabled={isLoading}><X className="w-4 h-4 mr-2"/>Cancel</Button>
              <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                {isLoading ? "Saving..." : <><Save className="w-4 h-4 mr-2"/>Save Changes</>}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
