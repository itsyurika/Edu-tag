/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into /resources,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/user_queries');
const resourceQueries = require('../db/resource_queries');


router.get("/", (req, res) => {
  const id = req.session.userId;
  let user = {};
  if (!id) {
    user.tags = [];
    resourceQueries.getAllResources()
    .then(resources => {
      user.resources = resources;
      console.log("rendering user obj after adding resource:", user);
    res.render("index", { user });
    });
  }
  userQueries.getUserAndTags(id)
  .then((userObj) => {
    console.log("rendering index from getUserAndTags: ", userObj);
    user = userObj;
  })
  .then(() => {
    if(!user.resources){
      resourceQueries.getAllResources()
      .then(resources => {
        user.resources = resources;
        console.log("rendering user obj to a user who exists after adding resource:", user);
        res.render("index", { user });
      })
    }
  })
  });

module.exports = router;
