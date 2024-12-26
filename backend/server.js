// server.js
const express = require('express');
const pool = require('./db'); // Import the pool from db.js
const userRoutes = require('./routes/userRoutes');
const wholesalerRoutes = require('./routes/wholesalerRoutes');
const goodsRoutes = require('./routes/goodsRoutes'); // Import the goods routes

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json()); // Middleware to parse JSON requests

// Use the /users route for user-related operations
app.use('/users', userRoutes);
app.use('/wholesalers', wholesalerRoutes);
app.use('/goods', goodsRoutes); // Mount the goods routes

// Example route to test the database connection
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Sample query to check connection
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
