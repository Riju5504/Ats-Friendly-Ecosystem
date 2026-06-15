require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const resumeRoutes = require('./routes/resume');

const app = express();
const PORT = process.env.PORT || 5000;

// FIXED CORS - allows both localhost and Vercel
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://ats-friendly-ecosystem-pb1f.vercel.app'
  ]
}));

app.use(express.json());

// API Routes
app.use('/api/analyze-resume', resumeRoutes);

app.get('/', (req, res) => res.send('ATS Backend Running ✅'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));