const express = require('express');
const csurf = require('csurf');
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const moment=require('moment')
const app = express();
const costumerRoute = require('./routes/costumer.js');

// Database connection
require('./config/connect');

// Set the view engine
app.set('view engine', 'ejs');

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true })); // To handle form data
app.use(express.json()); // To handle JSON data

// Serve static files
app.use(express.static('public'));

// Setup livereload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(connectLivereload());

// Refresh the page on livereload connection
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Use the customer route
app.use('/costumer', costumerRoute);

// Start the server
app.listen(3000, () => {
  console.log('The server is running on http://localhost:3000');
});
