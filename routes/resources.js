/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const resourceQueries = require('../db/resource_queries');

//**? put it there for possible future use - resource routes gate filter (delete if unused)*/
router.use((req, res, next) => {
  if(true) {
    next();
  }
  res.send("Unauthorized Access");
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

//GET mywall
//get resource
//.... what else ....

module.exports = router;
