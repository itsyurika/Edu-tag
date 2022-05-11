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
app.set("view engine", "html");

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '/public')));

// import the db
const db = require('./db/db_connect');

// sass set up
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes);
app.use("/resources", resourceRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

//*delete
// const randomUser = require('./db/faker');

app.get("/", (req, res) => {
  // const output = [];
  // for (let i = 0; i < 10; i++) {
  //   output.push(randomUser());
  // }
  // res.render("index");
  console.log("first")
  res.send("abc");

});

app.listen(PORT, () => {
  console.log(`Resource wall listening on port ${PORT} 😎`);
});
