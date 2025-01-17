const bcrypt = require('bcrypt');
const { getUsers, getUserByUsername , insertUser, deleteUser, updateUser} = require('../models/userModel');

const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch the user by username
    const user = await getUserByUsername(username);

    // If no user is found
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Respond with the user's role and id
    return res.status(200).json({
      message: 'Login successful',
      role: user.role,
      id: user.id, // Include the user's id
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};


// Add a new user
const addUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user
    const newUser = await insertUser(username, hashedPassword, role);

    res.status(201).json({
      message: 'User created successfully',
      user: { username: newUser.username, role: newUser.role },
    });
  } catch (error) {
    console.error('Error adding user:', error.message);
    res.status(500).json({ error: 'An error occurred while adding the user' });
  }
};

// Delete a user
const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUser(id);

    // If no user is found, return a 404 error
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};

// Update a user's data
const editUser = async (req, res) => {
  const { id } = req.params;
  const { username, role, password } = req.body;

  if (!username || !role) {
    return res.status(400).json({ error: 'Username and role are required' });
  }

  try {
    let hashedPassword = null;

    // Hash the password if provided
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await updateUser(id, username, role, hashedPassword);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};

module.exports = { fetchUsers, loginUser, addUser, removeUser, editUser };
