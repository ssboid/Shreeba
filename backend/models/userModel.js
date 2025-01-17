const pool = require('../db');

// Existing functions
const getUsers = async () => {
  const query = 'SELECT id, username, role, password FROM users';
  const result = await pool.query(query);
  return result.rows;
};

const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const result = await pool.query(query, values);
  return result.rows[0]; // Return a single user
};

// Insert new user
const insertUser = async (username, password, role) => {
  const query = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *';
  const values = [username, password, role];
  const result = await pool.query(query, values);
  return result.rows[0]; // Return the inserted user
};

const deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0]; // Return the deleted user
};

// Update a user's data by ID
const updateUser = async (id, username, role, password = null) => {
  const query = password
    ? 'UPDATE users SET username = $1, role = $2, password = $3 WHERE id = $4 RETURNING *'
    : 'UPDATE users SET username = $1, role = $2 WHERE id = $3 RETURNING *';

  const values = password ? [username, role, password, id] : [username, role, id];
  const result = await pool.query(query, values);
  return result.rows[0]; // Return the updated user
};

module.exports = { getUsers, getUserByUsername, insertUser, deleteUser, updateUser  };
