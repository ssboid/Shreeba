const pool = require('../db');

const getUsers = async () => {
  const query = 'SELECT username, role, password FROM users';
  const result = await pool.query(query);
  return result.rows;
};

const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const result = await pool.query(query, values);
  return result.rows[0]; // Return a single user
};

module.exports = { getUsers, getUserByUsername };
