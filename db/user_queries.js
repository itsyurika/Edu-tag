const db = require('./db_connect');
const bcrypt = require('bcrypt');


const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then((response) => {
      return response.rows;
    })
}

/**
 * Fetches a specific user using email input from db
 * @param {*} email
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
      console.log("new user data:", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log("error while executing addUser fxn: ", err.message);
    });
};

module.exports = {
  //name all the functions here
  getUsers,
  getUserByEmail,
  addUser,
  login
}