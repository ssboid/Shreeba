const express = require('express');
const { createWholesaler, fetchWholesalers, editWholesaler, removeWholesaler } = require('../controllers/wholesalerController');

const router = express.Router();

// Route to add a new wholesaler (POST)
router.post('/', createWholesaler);

// Route to get all wholesalers (GET)
router.get('/', fetchWholesalers);

// Route to update a wholesaler by ID (PUT)
router.put('/:id', editWholesaler);

// Route to delete a wholesaler by ID (DELETE)
router.delete('/:id', removeWholesaler);

module.exports = router;
