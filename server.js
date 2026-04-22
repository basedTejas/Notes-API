const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const noteRoutes = require('./routes/notes');

const app = express();

// MIDDLEWARE 
app.use(cors());           //fronted req
app.use(express.json());   

app.use('/api/notes', noteRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Notes API is running.' });
});
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
// conect mongo
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
