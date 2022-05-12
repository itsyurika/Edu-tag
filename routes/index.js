/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into /resources,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/user_queries');
const resourceQueries = require('../db/resource_queries');


router.get("/", (req, res) => {
  const id = req.session.userId
  if(!id) {
    const user = {};
    user.tags = [];
    res.render("index", {user});
  }
  userQueries.getUserAndTags(id)
  .then((user) => {
    console.log("rendering index from getUserAndTags: ", user);
    res.render("index", {user});
  })
  // userQueries.getUserById(id)
  // .then((user) => {
  //   resourceQueries.getMyTags(id)
  //   .then((tags) => {
  //     console.log("index route tags: ", tags);
  //     user.tags = tags;
  //     console.log("index route user after update: ", user);
  //     res.render("index", {user});
  //   })
  //   .catch((err) => {
  //     console.log("error while sending the tag to index")
  //   })
  // })
  // .catch((err) => {
  //   console.log(err);
  // })
});

module.exports = router;
