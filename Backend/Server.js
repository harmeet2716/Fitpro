import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import userRoutes from "./routes/userRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";

const app = express();

// ✅ Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

// ✅ MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);

// ✅ Health check (Render)
app.get("/", (req, res) => {
  res.send("FitPro Backend is running 🚀");
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
