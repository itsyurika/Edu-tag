const db = require('./db_connect');


/**
 *
 * @param {INT} limit
 * @returns a promise with array of resource card objects
 */
const getAllResources = (limit = 15) =>{
  const queryString = `SELECT resources.* FROM resources JOIN resources_reviews ON resources_reviews.resource_id = resources.id GROUP BY resources.id ORDER BY AVG(resources_reviews.rating) LIMIT $1;`
  const queryValue = [limit];

  return db
  .query(queryString, queryValue)
  .then((resources) => {
    console.log("after getAllResources fxn :" , resources);
    return resources.rows;
  })
  .catch((err) => {
    console.log("error while getting all resources : ", err);
  })
}

/**
 * Fetches all resources that is created by the current user
 * @param {INTEGER} creator_id
 * @param {INTEGER} limit
 * @returns a promise with an array of resource objects that matches creator_id = userID
 */

const getMyResources = (creator_id, limit = 15) => {
  const queryString = `SELECT * FROM resources WHERE creator_id = $1 ORDER BY create_date DESC LIMIT $2;`;
  const queryValue = [creator_id, limit];

  return db
  .query(queryString, queryValue)
  .then((resources) => {
    return resources.rows;
  })
  .catch((err) => {
    console.log("error while executing getMyResources fxn: ", err);
  })
};

/**
 * Fetches all resources that is liked by the current user
 * @param {INTEGER} userId
 * @param {INTEGER} limit
 * @returns a promise with an array of resource objects that matches liked_resources.user_id = userId
 */
const getLikedResources = (userId, limit = 15) => {
  const queryString = `SELECT resources.* FROM resources JOIN liked_resources ON liked_resources.resource_id = resources.id JOIN users ON liked_resources.user_id = users.id WHERE liked_resources.user_id = $1 ORDER BY create_date DESC LIMIT $2;`;
  const queryValue = [userId, limit]
  return db
  .query(queryString, queryValue)
  .then((resources) => {
    return resources.rows;
  })
  .catch((err) => {
    console.log("error while executing getLikedResources fxn: ", err);
  })
};

/**
 * Fetches all resources in the DB that has the tag name same as the query param.
 * @param {VARCHAR} tag
 * @param {INTEGER} limit
 * @returns a promise with an array of resource objects that matches tags.name = query tag
 */
const getResourceByTag = (tag, limit = 15) => {
  const queryString = `SELECT resources.* FROM resources JOIN resources_tags ON resources_tags.resource_id = resources.id JOIN tags ON resources_tags.tag_id = tags.id WHERE tags.name = $1 LIMIT $2`;
  const queryValue = [tag, limit];

  return db
  .query(queryString, queryValue)
  .then(resources => {
    return resources.rows;
  })
  .catch((err) => {
    console.log("error while getting the search results: ", err);
  })
};

/**
 * Fetches a single resource object that has resources.id = query params.
 * @param {INTEGER} resourceId
 * @returns a promise with a resource object (NOT AN ARRAY!) that matches the resource id
 */
const getResourceById = (resourceId) => {
  const queryString = `SELECT * FROM resources WHERE id = $1;`;
  const queryValue = [resourceId];

  return db
  .query(queryString, queryValue)
  .then((resources) => {
    return resources.rows[0];
  })
  .catch((err) => {
    console.log("error while executing getMyResources fxn: ", err);
  })
};

/**
 * Adds a new resource to the DB
 * @param {{}} resourceData An object containing all of the resource details
 * @returns {promise<{}>} a promise with the newly created resource object
 */
const addResource = (resourceData) => {
  //? Check with front end to make sure data input order from req.body is matching
  const queryString = `INSERT INTO resources (title, description, url, creator_id) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const queryValue = Object.values(resourceData);

  return db
  .query(queryString, queryValue)
  .then((resources) => {
    console.log("new resource added: ", resources.rows);
    return resources.rows[0];
  })
  .catch((err) => {
    console.log("error while executing getMyResources fxn: ", err);
  })
};

/**
 * Adds a review to a single resource object
 * @param {{}} reviewData an object containing all of the review details
 * @returns {promise<{}>} a promise with resources_reviews object (NOT AN ARRAY!)
 */
const addReview = (reviewData) => {
  const queryString = `INSERT INTO resources_reviews (rating, message, liked, resource_id, reviewer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  const queryValue = Object.values(reviewData);

  return db
  .query(queryString, queryValue)
  .then((review) => {
    return review.rows[0];
  })
  .catch((err) => {
    console.log("error while adding a Review :", err);
  })
}

/**
 * Fetches all reviews of a specific resource
 * @param {INTEGER} resourceId
 * @returns a promise with an ARRAY of review objects for that specific resource with resource id.
 */
const getReviews = (resourceId) => {
  const queryString = `SELECT resources_reviews.* FROM resources_reviews WHERE resource_id = $1`;
  const queryValue = [resourceId];
  return db
  .query(queryString, queryValue)
  .then((reviews) => {
    return reviews.rows; //returns array of objects which has resource_id, reviewer_id, rating, message, and liked boolean!

  })
  .catch((err) => {
    console.log("error while getting reviews of a specific resource: ", err);
  })
}

module.exports = {
  //list all the functions here
  getAllResources,
  getMyResources,
  getLikedResources,
  getResourceByTag,
  getResourceById,
  addResource,
  addReview,
  getReviews
}
