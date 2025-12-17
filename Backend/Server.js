import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'; // Loads environment variables from .env
import userRoutes from "./routes/userRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Optional listener for runtime connection errors
mongoose.connection.on("error", err => console.log("Mongoose connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);

// 404 route
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
