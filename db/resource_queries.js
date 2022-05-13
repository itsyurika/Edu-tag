const db = require('./db_connect');

/**
 *
 * @returns array of all resource objects
 */
const getAllResources = () => {
  const queryString = `SELECT * FROM resources ORDER BY create_date DESC;`;
  return db
  .query(queryString)
  .then((resources) => {
    console.log("getting all resources");
    return resources.rows;
  })
  .catch((err) => {
    console.log("error while executing getMyResources fxn: ", err);
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
 * Fetches all resources that is created by the current user
 * @param {INTEGER} creator_id
 * @param {INTEGER} limit
 * @returns a promise with an array of resource objects that matches creator_id = userID and tag
 */
 const getMyResourcesByTag = (userId, tag, limit = 15) => {
  const queryString = `SELECT resources.* FROM resources WHERE creator_id = $1 AND resources.tag = $2 ORDER BY create_date DESC LIMIT $3;`;

  const queryValue = [userId, tag, limit];

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
  const queryString = `SELECT DISTINCT(resources.*), resources_reviews.rating AS rating FROM resources JOIN resources_reviews ON resources_reviews.resource_id = resources.id JOIN users ON resources_reviews.reviewer_id = users.id WHERE resources_reviews.reviewer_id = $1 GROUP BY resources.id, resources_reviews.rating ORDER BY create_date DESC LIMIT $2;`;
  const queryValue = [userId, limit]
  return db
  .query(queryString, queryValue)
  .then((resources) => {
    console.log("returning liked resources: ", resources.rows);
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
  const queryString = `SELECT resources.* FROM resources WHERE resources.tag = $1 ORDER BY resources.create_date DESC LIMIT $2`;
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
  const queryString = `INSERT INTO resources (title, description, tag, url, creator_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
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
 * Fetches all reviews of a specific resource
 * @param {INTEGER} resourceId
 * @returns a promise with an ARRAY of review objects for that specific resource with resource id.
 */
 const getReviews = (resourceId) => {
  const queryString = `SELECT resources_reviews.*, users.name AS reviewer_name FROM resources_reviews JOIN users ON users.id = resources_reviews.reviewer_id WHERE resource_id = $1;`;
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

/**
 * Adds a review to a single resource object
 * @param {{}} reviewData an object containing all of the review details
 * @returns {promise<{}>} a promise with resources_reviews object (NOT AN ARRAY!)
 */

const reviewExists = (reviewData) => {
    const checkString = `SELECT resources_reviews.* FROM resources_reviews JOIN users ON users.id = resources_reviews.reviewer_id WHERE resource_id = $4 AND reviewer_id = $5;`;
  const queryValue = Object.values(reviewData);
  return db
  .query(checkString, queryValue)
  .then((review) => {
    console.log("return value from check review exists fxn: ", review);
    return review;
  })
  .catch((err) => {
    console.log("error while executing review Exists fxn :", err);
  })
}
const addReview = (reviewData) => {
  const queryValue = Object.values(reviewData);
  let queryString = ``;
  reviewExists(reviewData)
  .then((review) => {
    console.log("vlaue of review at addReview after receiving result from review Exsits: ", review);
    if(review) {
      console.log("review exists - updating");
      queryString = `UPDATE resources_reviews SET liked = $1, rating = $2, message = $3 WHERE resouce_id = $4 AND reviewer_id = $5;`
      return db
    .query(queryString, queryValue)
    .then((review) => {
    console.log("review received:", review.rows)
    return review.rows[0];
    })
    .catch((err) => {
    console.log("error while adding a Review :", err);
    })
    } else {
      console.log("review is new");
      queryString = `INSERT INTO resources_reviews (liked, rating, message, resource_id, reviewer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
      return db
    .query(queryString, queryValue)
    .then((review) => {
    console.log("review received:", review.rows)
    return review.rows[0];
    })
    .catch((err) => {
    console.log("error while adding a Review :", err);
    })
    }
  })

  return db
  .query(queryString, queryValue)
  .then((review) => {
    console.log("review received:", review.rows)
    return review.rows[0];
  })
  .catch((err) => {
    console.log("error while adding a Review :", err);
  })
}

/**
 *
 * @param {INTEGER} userId
 * @returns a promise of array of object in the format [{tag: "tagName"}, {tag: "tagName2"}]
 */
const getMyTags = (userId) => {
  const queryString = `SELECT DISTINCT(resources.tag) FROM resources WHERE resources.creator_id = $1`;
  const queryValue = [userId];

  return db
  .query(queryString, queryValue)
  .then((tags) => {
    console.log("these are the tags that are being loaded from getMyTags fxn: ", tags.rows);
    return tags.rows;
  })
  .catch((err) => {
    console.log("error while fetching all the tags I created");
  })
}

module.exports = {
  //list all the functions here
  getAllResources,
  getMyResources,
  getMyResourcesByTag,
  getLikedResources,
  getResourceByTag,
  getResourceById,
  addResource,
  addReview,
  getReviews,
  getMyTags
}
