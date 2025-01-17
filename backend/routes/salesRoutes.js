// routes/salesRoutes.js

const express = require('express');
const {
  fetchAllSales,
  fetchSaleById,
  addSale,
  editSale,
  removeSale,
  fetchAllSalesWithDetails,
} = require('../controllers/salesController');

const router = express.Router();

// Route to get all sales
// router.get('/', fetchAllSales);
router.get('/', fetchAllSalesWithDetails);

// Route to get a sale by ID
router.get('/:id', fetchSaleById);

// Route to add a new sale
router.post('/', addSale);

// Route to update a sale
router.put('/:id', editSale);

// Route to delete a sale
router.delete('/:id', removeSale);

module.exports = router;
