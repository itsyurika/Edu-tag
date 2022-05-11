/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into /resources,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/user_queries');

router.get("/", (req, res) => {
  const id = req.session.userId
  userQueries.getUserById(id)
  .then((user) => {
    res.render("index", {user});
  })
});

module.exports = router;
