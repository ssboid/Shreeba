const { getWholesalers, updateWholesaler, deleteWholesaler, addWholesaler } = require('../models/wholesalerModel');

const createWholesaler = async (req, res) => {
  const { name, code, contact } = req.body;

  if (!name || !code || !contact) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newWholesaler = await addWholesaler(name, code, contact);
    res.status(201).json(newWholesaler);
  } catch (error) {
    console.error('Error adding wholesaler:', error.message);
    res.status(500).json({ error: 'An error occurred while adding wholesaler' });
  }
};



// Fetch all wholesalers
const fetchWholesalers = async (req, res) => {
  try {
    const wholesalers = await getWholesalers();
    res.status(200).json(wholesalers);
  } catch (error) {
    console.error('Error fetching wholesalers:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching wholesalers' });
  }
};

// Update a wholesaler by ID
const editWholesaler = async (req, res) => {
  const { id } = req.params;
  const { name, code, contact } = req.body;

  if (!id || !name || !code || !contact) {
    return res.status(400).json({ error: 'ID, name, code, and contact are required' });
  }

  try {
    const updatedWholesaler = await updateWholesaler(id, name, code, contact);
    if (!updatedWholesaler) {
      return res.status(404).json({ error: 'Wholesaler not found' });
    }
    res.status(200).json(updatedWholesaler);
  } catch (error) {
    console.error('Error updating wholesaler:', error.message);
    res.status(500).json({ error: 'An error occurred while updating wholesaler' });
  }
};

// Delete a wholesaler by ID
const removeWholesaler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const deletedWholesaler = await deleteWholesaler(id);
    if (!deletedWholesaler) {
      return res.status(404).json({ error: 'Wholesaler not found' });
    }
    res.status(200).json({ message: 'Wholesaler deleted successfully', deletedWholesaler });
  } catch (error) {
    console.error('Error deleting wholesaler:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting wholesaler' });
  }
};

module.exports = {createWholesaler, fetchWholesalers, editWholesaler, removeWholesaler };

