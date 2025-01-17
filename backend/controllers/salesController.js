// controllers/salesController.js

const {
    getAllSales,
    getSaleById,
    insertSale,
    updateSale,
    deleteSale,
    getAllSalesWithDetails,
  } = require('../models/salesModel');
  
  // Get all sales
  const fetchAllSales = async (req, res) => {
    try {
      const sales = await getAllSales();
      res.status(200).json(sales);
    } catch (error) {
      console.error('Error fetching sales:', error.message);
      res.status(500).json({ error: 'Failed to fetch sales' });
    }
  };

  // Get all sales with goods details
const fetchAllSalesWithDetails = async (req, res) => {
    try {
      const sales = await getAllSalesWithDetails();
      res.status(200).json(sales);
    } catch (error) {
      console.error('Error fetching sales with details:', error.message);
      res.status(500).json({ error: 'Failed to fetch sales with details' });
    }
  };
  
  // Get a single sale by ID
  const fetchSaleById = async (req, res) => {
    const { id } = req.params;
    try {
      const sale = await getSaleById(id);
      if (!sale) {
        return res.status(404).json({ error: 'Sale not found' });
      }
      res.status(200).json(sale);
    } catch (error) {
      console.error('Error fetching sale by ID:', error.message);
      res.status(500).json({ error: 'Failed to fetch sale' });
    }
  };
  
  // Add a new sale
  const addSale = async (req, res) => {
    const { userId, goodsId, sp, date, remarks } = req.body;
    try {
      const newSale = await insertSale(userId, goodsId, sp, date, remarks);
      res.status(201).json({ message: 'Sale added successfully', sale: newSale });
    } catch (error) {
      console.error('Error adding sale:', error.message);
      res.status(500).json({ error: 'Failed to add sale' });
    }
  };
  
  // Update an existing sale
  const editSale = async (req, res) => {
    const { id } = req.params;
    const { sp, date, remarks } = req.body;
    try {
      const updatedSale = await updateSale(id, sp, date, remarks);
      if (!updatedSale) {
        return res.status(404).json({ error: 'Sale not found' });
      }
      res.status(200).json({ message: 'Sale updated successfully', sale: updatedSale });
    } catch (error) {
      console.error('Error updating sale:', error.message);
      res.status(500).json({ error: 'Failed to update sale' });
    }
  };
  
  // Delete a sale
  const removeSale = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedSale = await deleteSale(id);
      if (!deletedSale) {
        return res.status(404).json({ error: 'Sale not found' });
      }
      res.status(200).json({ message: 'Sale deleted successfully', sale: deletedSale });
    } catch (error) {
      console.error('Error deleting sale:', error.message);
      res.status(500).json({ error: 'Failed to delete sale' });
    }
  };
  
  module.exports = {
    fetchAllSales,
    fetchSaleById,
    addSale,
    editSale,
    removeSale,
    fetchAllSalesWithDetails,
  };
  