const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./database');

app.use(express.static('public')); 
app.use(express.json());

// Serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const Entry = mongoose.model('Entry', new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now }
}));

// Match this to the fetch() call in your index.html
app.post('/add', async (req, res) => {
  try {
    const entry = new Entry({ text: req.body.text });
    await entry.save();
    res.json({ message: 'Saved to MongoDB!' });
  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).send("Database Error");
  }
});

connectDB()
.then(() => {
  app.listen(3000, "0.0.0.0", () => {
    console.log('🚀 Server is running on port 3000');
  });
}).catch(err => {
  console.error('❌ Failed to connect to MongoDB', err);
});

