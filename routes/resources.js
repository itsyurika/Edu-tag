/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into /resources,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { user } = require('pg/lib/defaults');
const router  = express.Router();
const resourceQueries = require('../db/resource_queries');
const userQueries = require('../db/user_queries');

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
      userQueries.getUserById(userId)
      .then((user) => {
        user.resources = resources;
        resourceQueries.getMyTags(userId)
        .then((tags) => {
          user.tags = tags;
          res.render("mywall", {user});
        })
      })
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
    const {searchTag} = req.body; //? or use req.query?
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

  //Getting to the new resource creation page
  router.get("/new", (req, res) => {
    console.log("accessing get /new path");
    const userId = req.session.userId;
    if(!userId) {
      res.send({message: "not logged in "});
      //! update with action for redirecting to log in
      return;
      }
    console.log(`user is logged in as ${userId}, continuing w the next task on get/new!`);
    userQueries.getUserById(userId)
    .then((user) => {
      resourceQueries.getMyTags(userId)
        .then((tags) => {
          user.tags = tags;
      res.render("createresource", {user});
    })
    })
  })

  //Getting to the tag specific resource wall page
  router.get("/tags/:tag", (req, res) => {
    const userId = req.session.userId;
    const tag = req.params.tag
    resourceQueries.getResourceByTag(tag)
    .then((resources) => {
      userQueries.getUserById(userId)
      .then((user) => {
        user.resources = resources;
        resourceQueries.getMyTags(userId)
        .then((tags) => {
          user.tags = tags;
          res.render(`mywall-${tag}`, {user});
        })
      })
    })
    .catch((err) => {
      console.log("error while getting tag wall", err);
    })
  })


// Adding a new Resource Card
  router.post("/new", (req, res) => {
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
      const resourceId = Number(resource.id);
      console.log("this is the resourceID : ", resourceId);
      res.redirect(`/resources/mywall`);
    })
    .catch((err) => {
      console.log("error while posting a new resource card")
      res.send(err);
    })
  });
// Individual Resource Card
router.get("/:resourceId", (req, res) => {
  const userId = req.session.userId;
  const resourceId = req.params.resourceId;
  resourceQueries.getResourceById(resourceId)
  .then((resources) => {
    //! render single resource page w the returned resource data
    userQueries.getUserById(userId)
    .then((user) => {
      user.resources = resources;
      res.render("singleresourcepage", {user});
    })
  })
  .catch((err) => {
    console.log("error loading an individual resource data: ", err);
    res.send(err);
  })
});

// Adding a review to a resource Card
  router.post("/:resourceId", (req, res) => {
    const userId = req.session.userId;
    const resourceId = req.params.resourceId;
    if(!userId) {
    res.send({message: "not logged in "});
    //! update with action for redirecting to log in
    return;
    }
    console.log(`user is logged in as ${userId}, continuing w the next task`);
    resourceQueries.addReview({...req.body, resource_id: resourceId, reviewer_id: userId})
    .then((resource) => {
      //receives the resources_reviews object!
      // const reviewedResourcesId = resource.id;
      res.redirect(`/resources/${resourceId}`);
    })
    .catch((err) => {

    })
  });


module.exports = router;
