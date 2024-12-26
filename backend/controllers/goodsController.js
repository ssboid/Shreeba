const { 
    addGood, 
    getGoods, 
    getGoodById, 
    updateGood, 
    deleteGood 
  } = require('../models/goodsModel');
  
  // Create a new good
  const createGood = async (req, res) => {
    const {
      name,
      description,
      costPrice,
      markedPrice,
      size,
      wholesalerName,
      numItems,
      productCode,
      colors,
      sizes,
      purchaseDate,
    } = req.body;
  
    // Validate required fields
    if (!name || !costPrice || !markedPrice || !wholesalerName || !productCode) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }
  
    try {
      const newGood = await addGood({
        name,
        description,
        costPrice,
        markedPrice,
        size,
        wholesalerName,
        numItems,
        productCode,
        colors,
        sizes,
        purchaseDate,
      });
      res.status(201).json(newGood);
    } catch (error) {
      console.error("Error creating good:", error.message);
      res.status(500).json({ error: "An error occurred while creating the good" });
    }
  };
  

  
  // Fetch all goods
  const fetchGoods = async (req, res) => {
    try {
      const goods = await getGoods();
      res.status(200).json(goods);
    } catch (error) {
      console.error('Error fetching goods:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching goods' });
    }
  };
  
  // Fetch a single good by ID
  const fetchGoodById = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
  
    try {
      const good = await getGoodById(id);
      if (!good) {
        return res.status(404).json({ error: 'Good not found' });
      }
      res.status(200).json(good);
    } catch (error) {
      console.error('Error fetching good by ID:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching good' });
    }
  };
  
  // Update a good by ID
  const editGood = async (req, res) => {
    const { id } = req.params;
    const { name, description, costPrice, markedPrice, sizes, numItems, wholesalerName, colors, purchaseDate, productCode } = req.body;
  
    if (!id || !name || !description || !costPrice || !markedPrice || !sizes || !numItems || !wholesalerName || !colors || !purchaseDate || !productCode) {
      return res.status(400).json({ error: 'ID and all fields are required' });
    }
  
    try {
      const updatedGood = await updateGood(id, name, description, costPrice, markedPrice, sizes, numItems, wholesalerName, colors, purchaseDate, productCode);
      if (!updatedGood) {
        return res.status(404).json({ error: 'Good not found' });
      }
      res.status(200).json(updatedGood);
    } catch (error) {
      console.error('Error updating good:', error.message);
      res.status(500).json({ error: 'An error occurred while updating good' });
    }
  };
  
  // Delete a good by ID
  const removeGood = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
  
    try {
      const deletedGood = await deleteGood(id);
      if (!deletedGood) {
        return res.status(404).json({ error: 'Good not found' });
      }
      res.status(200).json({ message: 'Good deleted successfully', deletedGood });
    } catch (error) {
      console.error('Error deleting good:', error.message);
      res.status(500).json({ error: 'An error occurred while deleting good' });
    }
  };
  
  module.exports = {
    createGood,
    fetchGoods,
    fetchGoodById,
    editGood,
    removeGood
  };
  