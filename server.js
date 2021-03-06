// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const path = require('path');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));


//connection set up
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// app.use(express.static("public"));


// import the db

// sass set up
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static(path.join(__dirname, '/public')));

//cookie session set up
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const resourceRoutes = require("./routes/resources");
const indexRoute = require("./routes/index")

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes);
app.use("/resources", resourceRoutes);
app.use("/", indexRoute);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
res.error(404).send("better luck next time!")
});

app.listen(PORT, () => {
  console.log(`Resource wall listening on port ${PORT} 😎`);
});
