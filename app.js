require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/api/users');
const bcrypt = require('bcryptjs');
const connectDB = require('./src/core/db');

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// Middleware
app.use(express.json());


// Routes
app.use('/', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


