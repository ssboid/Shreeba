// controllers/userController.js
const { getUsers } = require('../models/userModel');

const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

module.exports = { fetchUsers };
