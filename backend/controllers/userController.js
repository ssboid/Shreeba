const bcrypt = require('bcrypt');
const { getUsers, getUserByUsername } = require('../models/userModel');

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
      console.log('No user found with username:', username);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('Comparing passwords:');
    console.log('Plaintext Password:', password);
    console.log('Hashed Password:', user.password);
    console.log('Password Match:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Password mismatch for user:', username);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If the password is valid, respond with the user's role
    if (user.role === 'admin') {
      return res.status(200).json({ message: 'Login successful', role: 'admin' });
    } else if (user.role === 'user') {
      return res.status(200).json({ message: 'Login successful', role: 'user' });
    } else {
      return res.status(403).json({ error: 'Unauthorized role' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};



module.exports = { fetchUsers, loginUser };
