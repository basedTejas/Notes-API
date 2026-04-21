const express = require('express');
const router = express.Router();

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

// GET    /api/notes          → get all notes (filter by ?status=todo etc.)
// POST   /api/notes          → create a new note
router.route('/').get(getAllNotes).post(createNote);

// GET    /api/notes/:id      → get one note
// PUT    /api/notes/:id      → update a note
// DELETE /api/notes/:id      → delete a note
router.route('/:id').get(getNoteById).put(updateNote).delete(deleteNote);

module.exports = router;
