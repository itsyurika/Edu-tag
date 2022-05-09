const db = require('./db_connect');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then((response) => {
      return response.rows;
    })
}

const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE users.email = $1;', [email])
  .then((user) => {
    return user.rows;
  })
}


module.exports = {
  //name all the functions here
  getUsers,
  getUserByEmail
}
