const express = require('express');
const app = express();
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const session = require('express-session'); // Import express-session
const methodOverride = require('method-override');

// Middleware to handle HTTP method override
app.use(methodOverride('_method'));

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false,
}));

// Database connection
require('./config/connect');

// Set view engine
app.set('view engine', 'ejs');

// Serve static files from "public" directory
app.use(express.static('public'));

// Setup livereload for development
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(connectLivereload());

// Refresh the page on livereload connection
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Import and use routes
const costumerRoute = require('./routes/costumer.js');
const userRoute = require('./routes/user.js');

app.use('/costumer', costumerRoute);
app.use('/user', userRoute);

// Start the server
app.listen(3000, () => {
  console.log('The server is running on http://localhost:3000');
});
