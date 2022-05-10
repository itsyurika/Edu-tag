/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into /resources,
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
    //! update with action for redirecting to log in
    return;
    }
    console.log(`user is logged in as ${userId}, continuing w the next task`);
    resourceQueries.getMyResources(userId, 15)
    .then((resources) => {
      //! implement multiple resources wall page w the given data
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
    if(!userId) {
      res.send({message: "not logged in "});
      //! update with action for redirecting to log in
      return;
      }
    resourceQueries.getLikedResources(userId, 15)
    .then((resources) => {
      //! implement multiple resources wall page w the returned data
      res.send({resources})
    })
    .catch((err) => {
      console.log("error during loding my liked resources ", err);
      res.send(err);
    })
  })

//  Tag Search
  router.get("/", (req, res) => {
    // whether a user is logged in or not, /resources page will show the popular / highest rating resources
    const searchTag = req.query;
    resourceQueries.getResourceByTag(searchTag, 15)
    .then((resources) => {
      //! render the main body with all the resources returned
      res.send({resources})
    })
    .catch((err) => {
      console.log("error after search and loading resources related to the search tag: ", err);
      res.send(err);
    })
  });

// Individual Resource Card
  router.get("/:resourceId", (req, res) => {
    const resourceId = req.params;
    resourceQueries.getResourceById(resourceId)
    .then((resources) => {
      //! render single resource page w the returned resource data
      res.send({resources})
    })
    .catch((err) => {
      console.log("error loading an individual resource data: ", err);
      res.send(err);
    })
  });

// Adding a new Resource Card
  router.post("/", (req, res) => {
    const userId = req.session.userId;
    if(!userId) {
    res.send({message: "not logged in "});
    //! update with action for redirecting to log in
    return;
    }
    console.log(`user is logged in as ${userId}, continuing w the next task`);

    resourceQueries.addResource({...req.body, creator_id: userId})
    .then((resource) => {
      //redirecting it to the single resource page the newly created card
      const resourceId = resource.id;
      res.redirect(`/${resourceId}`);
    })
    .catch((err) => {
      console.log("error while posting a new resource card")
      res.send(err);
    })
  });

// Adding a review to a resource Card
  router.post("/:resourceId", (req, res) => {
    const userId = req.session.userId;
    if(!userId) {
    res.send({message: "not logged in "});
    //! update with action for redirecting to log in
    return;
    }
    console.log(`user is logged in as ${userId}, continuing w the next task`);
    resourceQueries.addReview({...req.body, reviewer_id: userId})
    .then((resource) => {

    })
    .catch((err) => {

    })
  });

//? how to implement like and rating? same post route?

module.exports = router;
