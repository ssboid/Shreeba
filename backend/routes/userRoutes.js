const express = require('express');
const { fetchUsers, loginUser } = require('../controllers/userController');

const router = express.Router();

// Route to get all users (GET request)
router.get('/', fetchUsers);

// Route to handle login (POST request)
router.post('/login', loginUser);

module.exports = router;
