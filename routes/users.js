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


//**? put it there for possible future use - user routes gate filter (delete if unused) */
  router.use((req, res, next) => {
    if(true) {
      console.log("passing through filter gate");
      next();
    }
    // res.send("Unauthorized Access");
  })

  // GET EXAMPLE
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
    userQueries.getUserByEmail(req.params.email)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).json({error_occurred: err.message});
    })
  });

  // /register
  router.get("/resiter", (req, res) => {
    userQueries.getUserByEmail(req.params.email)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).json({error_occurred: err.message});
    })
  });

  // /myprofile
  router.get("/myprofile", (req, res) => {
    const userId = req.session.userId;
    if(!userId) {
      res.send({message: "not logged in"});
      return;
    }
    db.getUserByEmail(userId)
    .then(user => {
      if(!user) {
        res.send({error: "no user with that id"});
        return;
      }
      res.json(user)
    })
    .catch((err) => {
      console.log("error displaying profile page: ", err);
      res.send(err);
    })
  });

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

  //Logout
  router.post('./logout', (req, res) => {
    req.session.userId = null;
    //*! Please replace the following code w action after successful logout - redirection to non-logged in resource wall?
    res.send({});
  })

module.exports = router;
