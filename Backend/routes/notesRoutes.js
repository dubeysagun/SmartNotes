import express from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected - user must be logged in
router.use(protect);

// Get all notes and create new note
router.get("/", getNotes);
router.post("/", createNote);

// Get, update, delete specific note
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
