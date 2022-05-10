/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const resourceQueries = require('../db/resource_queries');

//**? will need to change to not filter when not logged in && visiting other user's wall
  router.use((req, res, next) => {
  const userId = req.session.userId;
  if(!userId) {
    res.send({message: "not logged in "});
    return;
  }
  console.log("user is logged in")
  next();
})

//GET EXAMPLE
  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

// My Resources Wall Route

  router.get("/mywall", (req, res) => {
    const userId = req.session.userId;
    if(!userId) {
    res.send({message: "not logged in "});
    return;
    }
    console.log(`user is logged in as ${userId}, continuing w the next task`);
    resourceQueries.getMyResources(userId, 15)
    .then((resources) => {
      res.send({resources})
    })
    .catch((err) => {
      console.log("error during loading my wall resources", err);
      res.send(err);
    })
  });

// My Liked Resources
  router.get("/mylikes", (req, res) => {
    const userId = req.session.userId;
    req.query = {}
  })

//  Tag Search
  router.get("/", (req, res) => {
    // whether a user is logged in or not, /resources page will show the popular / highest rating resources
    resourceQueries.getAllResources(req.query, 15)
    .then()
    .catch((err) => {
      console.log("error after search and loading resources related to the search tag: ", err);
      res.send(err);
    })
  });

// Individual Resource Card
  router.get("/:resourceId", (req, res) => {

  });

// Adding a new Resource Card
  router.post("/", (req, res) => {
    const userId = req.session.userId;
    if(!userId) {
      res.send({message: "not logged in "});
      return;
    }
    console.log("user is logged in")
    next();
    resourceQueries.addResource({...req.body, creator_id: userId})
    .then()
    .catch((err) => {
      console.log("error while posting a new resource card")
      res.send(err);
    })
  });

// Adding a comment to a resource Card
  router.post("/:resourceId", (req, res) => {

  });

//? how to implement like and rating? same post route?

module.exports = router;
