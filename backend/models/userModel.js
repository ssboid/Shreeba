// models/userModel.js
const pool = require('../db');

const getUsers = async () => {
  const query = 'SELECT "userName", "userPassword" FROM users';
  const result = await pool.query(query);
  return result.rows;
};

module.exports = { getUsers };
