const db = require('./db_connect');
const bcrypt = require('bcrypt');


const getAllUsers = () => {
  return db.query('SELECT * FROM users;')
    .then((response) => {
      return response.rows;
    })
}

/**
 * Fetches a specific user using email input from db for login check
 * @param {VARCHAR} email
 * @returns {Promise<{}>} //*? check and update if needed
 */

const getUserByEmail = (email) => {
  const queryString = 'SELECT * FROM users WHERE users.email = $1;';
  return db
  .query(queryString, [email])
  .then((user) => {
    return user.rows[0];
  })
  .catch((err) => {
    console.log("error during getUserByEmail fxn", err);
  })
}

/**
 * Fetches specific user using session id from db for my profile page
 * @param {INTEGER} id
 * @returns
 */
const getUserById = function(id) {
  const queryString = `SELECT * FROM users WHERE users.id = $1`;
  return db
    .query(queryString, [`${id}`])
    .then(user => {
      return user.rows[0];
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

/**
 * Fetches a specific user using the user name handle. Uses req.params and should be used to redirect to the requested user's wall page.
 * ? need to check if it's used/implemented
 * @param {string} name
 * @returns
 */
const getUserByName = function(name) {
  const queryString = `SELECT * FROM users WHERE users.id = $1`;
  return db
     .query(queryString, [`${name}`])
    .then(user => {
      return user.rows[0];
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}

/**
 * Check if a user exists with a given username and password
 * @param {String} email
 * @param {String} password encrypted
 * @returns {Promise<{matching user object}>}
 */
const login = (email, password) => {
  return getUserByEmail(email)
    .then((user) => {
      console.log("at login fxn: ", user);
      if(bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    })
    .catch((err) => {
      console.log("error from login :", err.message);
    })
}


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
 const addUser = function(user) {
  const queryString = `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *;`;
  const value = [`${user.name}`, `${user.email}`, `${user.password}`];

  return db
    .query(queryString,value)
    .then((result) => {
      console.log("new user data:", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log("error while executing addUser fxn: ", err.message);
    });
};


/**
 * Edit name of user profile
 * @param {integer} id
 * @param {string} newName
 * @returns
 */
const editProfile = function(id, newEmail) {
  const queryString = `UPDATE users SET email = $2 WHERE id = $1 RETURNING *;`;
  const value = [`${id}`, `${newEmail}`];
  console.log("input values (id , newName): ", value);
  return db
    .query(queryString, value)
    .then((result) => {
      console.log("updated profile : ", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log("error while editing profile: ", err.message);
    })
}

module.exports = {
  //name all the functions here
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByName,
  addUser,
  login,
  editProfile
}
