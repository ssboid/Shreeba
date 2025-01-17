// models/salesModel.js

const pool = require('../db'); // Ensure the database connection is properly set up

// Fetch all sales records
const getAllSales = async () => {
  const query = 'SELECT * FROM sales';
  const { rows } = await pool.query(query);
  return rows;
};

// Fetch a single sale by ID
const getSaleById = async (id) => {
  const query = 'SELECT * FROM sales WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Insert a new sale record
const insertSale = async (userId, goodsId, sp, date, remarks) => {
  const query = `
    INSERT INTO sales (user_id, goods_id, sp, date, remarks)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
  const { rows } = await pool.query(query, [userId, goodsId, sp, date, remarks]);
  return rows[0];
};

// Update a sale record
const updateSale = async (id, sp, date, remarks) => {
  const query = `
    UPDATE sales
    SET sp = $1, date = $2, remarks = $3
    WHERE id = $4
    RETURNING *`;
  const { rows } = await pool.query(query, [sp, date, remarks, id]);
  return rows[0];
};

// Delete a sale record
const deleteSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id = $1 RETURNING *';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Fetch all sales with goods details
const getAllSalesWithDetails = async () => {
    const query = `
      SELECT 
        sales.id AS sale_id, 
        sales.sp AS selling_price, 
        sales.date AS sale_date, 
        sales.remarks, 
        goods.name AS goods_name, 
        goods.markedprice AS marked_price
      FROM sales
      LEFT JOIN goods ON sales.goods_id = goods.id;
    `;
    const { rows } = await pool.query(query);
    return rows;
  };

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  updateSale,
  deleteSale,
  getAllSalesWithDetails,
};
