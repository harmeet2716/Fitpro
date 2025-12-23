import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLanding from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import FitnessScore from "./pages/FitnessScore";
import UserDashboard from "./pages/UserDashboard";
import AnalyzePage from "./pages/Analyze";
import WorkoutPlanner from "./pages/WorkoutPlanner";
import FitnessAIChat from "./pages/FitnessAIChat";
import ExerciseLibrary from "./pages/ExerciseLibrary"; // New: Detailed exercise library
import WorkoutBuilder from "./pages/WorkoutBuilder"; // New: Interactive workout builder
import ProgressTracker from "./pages/ProgressTracker"; // New: Track workout progress
import NutritionPlanner from "./pages/NutritionPlanner"; // New: Nutrition planning
import ExerciseTutorial from "./pages/ExerciseTutorial"; // New: Single exercise tutorial page
import CommunityWorkouts from "./pages/CommunityWorkouts"; // New: Community shared workouts

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<DashboardLanding user={user} />} />

      {/* Auth Pages */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" /> : <Signup setUser={setUser} />}
      />

      {/* Main Dashboard */}
      <Route
        path="/dashboard"
        element={user ? <UserDashboard user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />

      {/* Analyze Page */}
      <Route
        path="/analyze"
        element={user ? <AnalyzePage user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />

      {/* Workout Planning Pages */}
      <Route
        path="/workout-planner"
        element={user ? <WorkoutPlanner user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />
      <Route
        path="/workout-builder"
        element={user ? <WorkoutBuilder user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />
      <Route
        path="/exercise-library"
        element={user ? <ExerciseLibrary user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />
      <Route
        path="/exercises/:exerciseId"
        element={user ? <ExerciseTutorial user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />

      {/* Progress Tracking */}
      <Route
        path="/progress-tracker"
        element={user ? <ProgressTracker user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />

      {/* Nutrition Planning */}
      <Route
        path="/nutrition"
        element={user ? <NutritionPlanner user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />

      {/* AI Features */}
      <Route
        path="/ai-chat"
        element={user ? <FitnessAIChat user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />

      {/* Community */}
      <Route
        path="/community"
        element={user ? <CommunityWorkouts user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />

      {/* Fitness Score */}
      <Route
        path="/fitness-score"
        element={user ? <FitnessScore user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />

      {/* Protected Pages - Old routes for compatibility */}
      <Route
        path="/home"
        element={user ? <Home user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />
      <Route
        path="/user-profile"
        element={user ? <UserDashboard user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />
      <Route
        path="/components/fitness-score"
        element={user ? <FitnessScore user={user} setUser={setUser} /> : <Navigate to="/login" />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
