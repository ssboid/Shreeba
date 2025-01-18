const pool = require('../db');

// Add a new good
const addGood = async (goods) => {
    const query = `
      INSERT INTO goods (
        name, description, costprice, markedprice, wholesalername,
        numitems, productcode, colors, sizes, purchasedate, productimage
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
      goods.wholesalerName,
      goods.numItems,
      goods.productCode,
      goods.colors,
      goods.sizes,
      goods.purchaseDate,
      goods.productImage
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
const updateGood = async (id, name, description, costPrice, markedPrice, wholesalerName, purchaseDate, productImage) => {
  const query = `
    UPDATE goods
    SET 
      name = $2, 
      description = $3, 
      costprice = $4, 
      markedprice = $5, 
      wholesalername = $6, 
      purchasedate = $7, 
      productimage = $8
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id, name, description, costPrice, markedPrice, wholesalerName, purchaseDate, productImage];
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