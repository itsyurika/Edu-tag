/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into /resources,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
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
      res.redirect('/');
      return;
      }
    resourceQueries.getLikedResources(userId, 15)
    .then((resources) => {
      resourceQueries.getMyTags(userId)
      .then((tags) => {
        const user = {id: userId, tags: tags};
        user.resources = resources;
        res.render("mylikes",{user});
      })
    })
    .catch((err) => {
      console.log("error during loding my liked resources ", err);
      res.send(err);
    })
  })

//  Tag Search
  router.get("/search", (req, res) => {
    const tag = req.query.q;
    console.log("tag : ", tag);
    const id = req.session.userId

    if(!id) {
      const user = {};
      user.tags = [];
      return res.render("index", {user});
    }
    const taggedResourcePromise = resourceQueries.getResourceByTag(tag, 15);
    const userAndTagsPromise = userQueries.getUserAndTags(id);
    Promise.all([taggedResourcePromise, userAndTagsPromise])
    .then((result) => {
      const resources = result[0];
      const user = result[1];
      user.resources = resources;
      console.log("results from promiseall ", result);
      res.render("index", {user});
    })
    // let user = {};
    // if(userId) {
    //   userQueries.getUserById(userId)
    //   .then((userObj) => user = userObj)
    // }

    // .then((resources) => {
    //   user.resources = resources;
    //   res.render("index", );
    // })
    // .catch((err) => {
    //   console.log("error after search and loading resources related to the search tag: ", err);
    //   res.send(err);
    // })
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

  //Getting to the tag specific resource wall page made by user
  router.get("/tags/:tag", (req, res) => {
    const userId = req.session.userId;
    const tag = req.params.tag
    resourceQueries.getResourceByTag(tag)
    .then((resources) => {
      console.log("all the resouces searched by tag: ", resources);
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

  const resourceByIdPromise = resourceQueries.getResourceById(resourceId);
  const userAndTagsPromise = userQueries.getUserAndTags(userId);
  const resourceReviewPromise = resourceQueries.getReviews(resourceId);
  Promise.all([resourceByIdPromise, userAndTagsPromise, resourceReviewPromise])
  .then((result) => {
    const resource = result[0];
    const user = result[1];
    const review = result[2];
    user.resources = resource;
    console.log("rendering review: ", review);
    user.resources.review = review;
    console.log("rendring user object : ", user);
    res.render('singleresourcepage', {user})})
  .catch((err) => {
    console.log("error loading individual resource page: ", err);
    res.send(err);
  })
  })



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
