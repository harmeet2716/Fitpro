"use client"
import React, { useState } from "react";
import Navbar from "./NavBar";
import { Button } from "../components/ui/button";

export default function FitnessScore({ user, setUser }) {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("sedentary");
  const [score, setScore] = useState(null);

  const calculateScore = () => {
    if (!age || !weight || !height) {
      alert("Please fill all fields!");
      return;
    }
    // Simple fitness score calculation
    let bmi = weight / ((height / 100) ** 2);
    let activityFactor = activity === "active" ? 1.2 : activity === "moderate" ? 1.0 : 0.8;
    let fitnessScore = (100 - Math.abs(22 - bmi) * 2) * activityFactor;
    setScore(fitnessScore.toFixed(1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} setUser={setUser} />
      <div className="max-w-md mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Fitness Score Calculator</h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="sedentary">Sedentary</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
            </select>
          </div>

          <Button
            onClick={calculateScore}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
          >
            Calculate Fitness Score
          </Button>

          {score && (
            <div className="mt-4 text-center text-xl font-semibold">
              Your Fitness Score: {score}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
