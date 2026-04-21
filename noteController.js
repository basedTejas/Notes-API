const Note = require('../models/Note');

// ── GET ALL NOTES ──
// GET /api/notes
// Optional query params: ?status=todo  or  ?status=in-progress  or  ?status=completed
const getAllNotes = async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ count: notes.length, notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ── GET SINGLE NOTE ──
// GET /api/notes/:id
const getAllNotes = async (req, res) => {
  try {
    const { status, priority, search, sort } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // sorting logic
    let sortOption = { createdAt: -1 }; // default = latest

    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    const notes = await Note.find(filter).sort(sortOption);

    res.status(200).json({ count: notes.length, notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ── CREATE NOTE ──
// POST /api/notes
// Body: { title, content, status (optional), tags (optional) }
const createNote = async (req, res) => {
  try {
    const { title, content, status, tags, priority } = req.body;


    const note = await Note.create({ title, content, status, tags, priority });
    res.status(201).json(note);
  } catch (err) {
    // Mongoose validation errors (e.g. missing title) come through here
    res.status(400).json({ error: err.message });
  }
};

// ── UPDATE NOTE ──
// PUT /api/notes/:id
// Body: any fields you want to update
const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,           // return the updated document
        runValidators: true, // run schema validators on update too
      }
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ── DELETE NOTE ──
// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
