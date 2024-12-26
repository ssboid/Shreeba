const pool = require('../db');

// Add a new good
const addGood = async (goods) => {
    const query = `
      INSERT INTO goods (
        name, description, costprice, markedprice, size, wholesalername,
        numitems, productcode, colors, sizes, purchasedate
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )
      RETURNING *;
    `;
  
    const values = [
      goods.name,
      goods.description,
      goods.costPrice,
      goods.markedPrice,
      goods.size,
      goods.wholesalerName,
      goods.numItems,
      goods.productCode, // Correct handling of productCode
      goods.colors,
      goods.sizes,
      goods.purchaseDate
    ];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating good:', error.message);
      throw error;
    }
  };
  


// Fetch all goods
const getGoods = async () => {
  const query = `SELECT * FROM goods;`;
  const result = await pool.query(query);
  return result.rows;
};

// Fetch a good by ID
const getGoodById = async (id) => {
  const query = `SELECT * FROM goods WHERE id = $1;`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update a good by ID
const updateGood = async (id, name, description, costPrice, markedPrice, size, numItems, wholesalerName, colors, purchaseDate, productCode) => {
  const query = `
    UPDATE goods
    SET 
      name = $2, 
      description = $3, 
      cost_price = $4, 
      marked_price = $5, 
      sizes = $6, 
      num_items = $7, 
      wholesaler_name = $8, 
      colors = $9, 
      purchase_date = $10, 
      product_code = $11
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id, name, description, costPrice, markedPrice, size, numItems, wholesalerName, colors, purchaseDate, productCode];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete a good by ID
const deleteGood = async (id) => {
  const query = `DELETE FROM goods WHERE id = $1 RETURNING *;`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { addGood, getGoods, getGoodById, updateGood, deleteGood };
