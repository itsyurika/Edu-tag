/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const userQueries = require('../db/user_queries');
const resourceQueries = require('../db/resource_queries');

//Get Routes - if we're doing html-ejs way - placeholder fxn and therefore not actually working

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
      resourceQueries.getMyTags(userId)
      .then((tags) => {
        user.tags = tags;
        res.render("userprofile", {user});
      })
    })
    .catch((err) => {
      console.log("error displaying profile page: ", err);
      res.send(err);
    })
  });

  // //POST routes
  // router.get("/login/:id", (req,res) => {
  //   req.session.userId = req.params.id;
  //   res.redirect("/")
  // });

  //Logout
  router.get("/logout", (req, res) => {
    console.log("logout");
    req.session.userId = null;
    // res.send("you've logged out");
    res.redirect("/");
  });

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
      res.redirect("/");
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
      // const templateVars = {user: req.session.userId};
      // res.json(user);
      res.redirect("/");
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).json({error_occurred: err.message});
    })
  });

  //Edit profile
  router.post("/myprofile", (req, res) => {
  const userId = req.session.userId;
  const newEmail = req.body.emailUpdate;
  if(!userId) {
    res.send({message: "not logged in"});
    return;
  }
  console.log("from the post route - userid and name: ", userId, newEmail);
  userQueries.editProfile(userId, newEmail)
  .then((user) => {
    resourceQueries.getMyTags(userId)
    .then((tags) => {
      user.tags = tags;
      res.render("userprofile", {user});
    })
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


module.exports = router;
