const express = require('express');
const { 
  createGood, 
  fetchGoods, 
  fetchGoodById, 
  editGood, 
  removeGood 
} = require('../controllers/goodsController');

const router = express.Router();

// Route to add a new good (POST)
router.post('/', createGood);

// Route to get all goods (GET)
router.get('/', fetchGoods);

// Route to get a single good by ID (GET)
router.get('/:id', fetchGoodById);

// Route to update a good by ID (PUT)
router.put('/:id', editGood);

// Route to delete a good by ID (DELETE)
router.delete('/:id', removeGood);

module.exports = router;
