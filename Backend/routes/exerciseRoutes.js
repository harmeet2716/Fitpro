// backend/routes/exerciseRoutes.js
import express from "express";
import {
  getExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
  rateExercise,
  getExerciseStats,
  getSimilarExercises
} from "../controllers/exerciseController.js";

const router = express.Router();

// Public routes
router.get("/", getExercises);
router.get("/stats", getExerciseStats);
router.get("/:id", getExercise);
router.get("/:id/similar", getSimilarExercises);

// Protected routes (require authentication)
router.post("/:id/rate", rateExercise);
router.post("/", createExercise); // Admin only
router.put("/:id", updateExercise); // Admin only
router.delete("/:id", deleteExercise); // Admin only

export default router;