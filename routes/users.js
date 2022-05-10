/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/user_queries');
const bcrypt = require('bcrypt');
const db = require('../db/db_connect');
const { user } = require('pg/lib/defaults');


//**? put it there for possible future use - user routes gate filter (delete if unused) */
  router.use((req, res, next) => {
    if(true) {
      console.log("passing through filter gate");
      next();
    }
    // res.send("Unauthorized Access");
  });

  // get all users
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

//Get Routes - if we're doing html-ejs way - placeholder fxn and therefore not actually working

  // /login
  router.get("/login", (req, res) => {
  });

  // /register
  router.get("/regiter", (req, res) => {
  });

  // accessing my profile page to update my info
  router.get("/myprofile", (req, res) => {
    const userId = req.session.userId;
    if(!userId) {
      res.send({message: "not logged in"});
      return;
    }
    userQueries.getUserById(userId)
    .then(user => {
      if(!user) {
        res.send({error: "no user with that id"});
        return;
      }
      //! Please replace the following code to reflect logged in user's profile page
      res.json(user)
    })
    .catch((err) => {
      console.log("error displaying profile page: ", err);
      res.send(err);
    })
  });

  // other user's wall
  router.get("/:otherUserName", (req, res) => {
    const otherUserName = req.params.otherUserName;
    const userId = req.session.userId;
    let myName;
    userQueries.getUserById(userId)
    .then(user => {
      myName = user.name;
    })
    //If the logged in user visits their own username page redirect to my wall page?
    if(otherUserName === myName) {
      res.redirect("/myprofile"); //**? UPDATE this with my wall page */
    }
    userQueries.getUserByName(otherUserName)
    .then(user => {
      //? Implement Other user's wall page //
    })
  })

  //POST routes

  //Logging in with an existing account
  router.post("/login", (req, res) => {
    console.log("req.body:", req.body);
    const {password, email} = req.body;
    userQueries.login(email, password)
    .then((user) => {
      console.log("after successful login fxn, at .then ", user);
      if(!user) {
        res.send({error: "authentication error"});
        return;
      }
      req.session.userId = user.id;
      //*! Please replace the following code with action after successful login
      res.json(user);
    })
    .catch((err) => {
      console.log("login_error : ", err);
      res.status(500).json({error_occurred: err.message});
    })
  });

  //Create a new user
  router.post("/register", (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    userQueries.addUser(user)
    .then((user) => {
      req.session.userId = user.id;
      //*! Please replace the following code with action after successful registration
      res.json(user);
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).json({error_occurred: err.message});
    })
  });

  //Edit profile
  router.post("/myprofile", (req, res) => {
  const userId = req.session.userId;
  const newName = req.body.newName;
  if(!userId) {
    res.send({message: "not logged in"});
    return;
  }
  console.log("from the post route - userid and name: ", userId, newName);
  userQueries.editProfile(userId, newName)
  .then((user) => {
    res.json(user);
  })
  });

  //Logout
  router.post("/logout", (req, res) => {
    req.session.userId = null;
    //*! Please replace the following code w action after successful logout - redirection to non-logged in resource wall?
    res.send({});
  });

module.exports = router;
