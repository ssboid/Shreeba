import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:5000/sales';

// Add a new sale
export const addSale = async (saleData) => {
  try {
    const response = await axios.post(API_BASE_URL, saleData);
    return response.data;
  } catch (error) {
    console.error('Error adding sale:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to add sale' };
  }
};

// Fetch all sales (if needed in the future)
export const fetchSales = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to fetch sales' };
  };
};
