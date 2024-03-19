const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const path = require('path');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:3000' // Update this to your frontend URL
}));

// Dynamically mount routes
const routesPath = path.join(__dirname, 'routes');
readdirSync(routesPath).forEach(file => {
  const route = require(path.join(routesPath, file));
  app.use('/api/v1', route);
});

// Start server
const startServer = async () => {
  try {
    await db(); // Assuming db() returns a promise
    app.listen(PORT, () => {
      console.log('Server is running on port:', PORT);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
