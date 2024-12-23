const pool = require('../db');

const addWholesaler = async (name, code, contact) => {
  const query = `
    INSERT INTO wholesalers (name, code, contact)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, code, contact];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Fetch all wholesalers
const getWholesalers = async () => {
    const query = `SELECT * FROM wholesalers`;
    const result = await pool.query(query);
    return result.rows;
  };
  
  // Update a wholesaler by ID
  const updateWholesaler = async (id, name, code, contact) => {
    const query = `
      UPDATE wholesalers
      SET name = $2, code = $3, contact = $4
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id, name, code, contact];
    const result = await pool.query(query, values);
    return result.rows[0];
  };
  
  // Delete a wholesaler by ID
  const deleteWholesaler = async (id) => {
    const query = `DELETE FROM wholesalers WHERE id = $1 RETURNING *;`;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  };
  
  module.exports = { addWholesaler, getWholesalers, updateWholesaler, deleteWholesaler };

