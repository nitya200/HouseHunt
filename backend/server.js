const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON bodies
// Routes
// app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected successfully!'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('HouseHunt API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));