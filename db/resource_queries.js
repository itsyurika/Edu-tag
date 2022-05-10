const db = require('./db_connect');

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

const getResourceById = (resourceId) => {
  const queryString = `SELECT * FROM resources WHERE id = $1;`;
  const queryValue = [creator_id];

  return db
  .query(queryString, queryValue)
  .then((resources) => {
    return resources.rows;
  })
  .catch((err) => {
    console.log("error while executing getMyResources fxn: ", err);
  })
};

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

const addReview = (reviewData) => {
  const queryString = `INSERT INTO resources_reviews (resource_id, reviewer_id, rating, message, liked) VALUES ($1,) RETURNING *;`;
  const queryValue = Object.values(reviewData);

  return db
  .query(queryString, queryValue)
  .then((review) => {
    return review.rows;
  })
  .catch((err) => {
    console.log("error while adding a Review :", err);
  })
}

module.exports = {
  //list all the functions here
  getMyResources,
  getLikedResources,
  getResourceByTag,
  getResourceById,
  addResource,
  addReview
}
