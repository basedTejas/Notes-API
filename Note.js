const mongoose = require('mongoose');

// This defines the shape of a note document in MongoDB
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },

    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },

    priority: {
      type: String,
      default: "low"
    },

    // Kanban-style status
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'completed'],
      default: 'todo',
    },

    // Optional tags — stored as an array of strings e.g. ["backend", "urgent"]
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
  
);

module.exports = mongoose.model('Note', noteSchema);
