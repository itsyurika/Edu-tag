const db = require('./db_connect');

const getMyResources = (creator_id, limit = 15) => {
  const queryString = `SELECT * FROM resources WHERE creator_id = $1 ORDER BY create_date DESC LIMIT $2;`;
  const value = [creator_id, limit];

  return db
  .query(queryString, value)
  .then((resources) => {
    return resources.rows;
  })
  .catch((err) => {
    console.log("error while executing getMyResources fxn");
  })
};

const getAllResources = () => {
  return db.query('SELECT * FROM resources ORDER BY AVG(resource_reviews) DESC')
}

const addResource = () => {

}

module.exports = {
  //list all the functions here
  getMyResources,
  getAllResources,
  addResource
}
