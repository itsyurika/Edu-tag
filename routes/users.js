/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/user_queries');

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

  // GET /login
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

  // GET /register
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

//POST /login

  router.post("/login", (req, res) => {
    userQueries.getUserByEmail(req.params.email)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).json({error_occurred: err.message});
    })
  });

//POST /regiter

  router.post("/login", (req, res) => {
    userQueries.getUserByEmail(req.params.email)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).json({error_occurred: err.message});
    })
  });


  router.post("/register", (req, res) => {
    userQueries.getUserByEmail(req.params.email)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).json({error_occurred: err.message});
    })
  });

module.exports = router;
