// routes/userRoutes.js
const express = require('express');
const { fetchUsers } = require('../controllers/userController');

const router = express.Router();

// Route to get all users (GET request)
router.get('/', fetchUsers);

module.exports = router;
