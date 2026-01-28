import Note from "../models/Note.js";

// Get all notes for current user
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single note
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // Check if note exists
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Check if note belongs to current user
    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this note",
      });
    }

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new note
export const createNote = async (req, res) => {
  try {
    const { topic, title, link, statement, approach, summary, complexity, codeBlocks } = req.body;

    // Validate required fields
    if (!topic || !title) {
      return res.status(400).json({
        success: false,
        message: "Please provide topic and title",
      });
    }

    // Create note
    const note = await Note.create({
      userId: req.userId,
      topic,
      title,
      link,
      statement,
      approach,
      summary,
      complexity,
      codeBlocks,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update note
export const updateNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    // Check if note exists
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Check if note belongs to current user
    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this note",
      });
    }

    // Update note
    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // Check if note exists
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Check if note belongs to current user
    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this note",
      });
    }

    // Delete note
    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
