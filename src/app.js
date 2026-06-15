const express = require('express');
const app = express();
const appRoutes = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cookieParser());

app.use('/auth', appRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app;