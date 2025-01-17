const express = require('express');
const { fetchUsers, loginUser, addUser, removeUser,  editUser} = require('../controllers/userController');

const router = express.Router();

// Route to get all users (GET request)
router.get('/', fetchUsers);

// Route to handle login (POST request)
router.post('/login', loginUser);

// Route to add a new user (POST request)
router.post('/add', addUser);

router.delete('/:id', removeUser);
router.put('/:id', editUser);


module.exports = router;
