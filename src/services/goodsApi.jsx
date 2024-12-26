// services/goodsApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/goods'; // Base URL for the goods API

// Fetch all goods (GET)
export const getGoods = () => {
  console.log("Fetching all goods from:", BASE_URL); // Log base URL

  return axios.get(BASE_URL)
    .then((res) => {
      console.log("Goods fetched successfully:", res.data); // Log fetched data
      return res.data;
    })
    .catch((err) => {
      console.error("Error fetching goods:", err); // Log error if fetching fails
      return Promise.reject(err);
    });
};

// Add a new good (POST)
export const addGood = (newGood) => {
  console.log("Attempting to add a new good:", newGood); // Log data to be added

  return axios.post(BASE_URL, newGood)
    .then((res) => {
      console.log("Good added successfully:", res.data); // Log success response
      return res.data;
    })
    .catch((err) => {
      console.error("Error adding good:", err); // Log error if adding fails
      return Promise.reject(err);
    });
};

// Update an existing good (PUT)
export const updateGood = (id, updatedGood) => {
  console.log(`Attempting to update good with ID ${id}:`, updatedGood); // Log ID and data to update

  return axios.put(`${BASE_URL}/${id}`, updatedGood)
    .then((res) => {
      console.log("Good updated successfully:", res.data); // Log success response
      return res.data;
    })
    .catch((err) => {
      console.error(`Error updating good with ID ${id}:`, err); // Log error if updating fails
      return Promise.reject(err);
    });
};

// Delete a good (DELETE)
export const deleteGood = (id) => {
  console.log(`Attempting to delete good with ID ${id}`); // Log ID to be deleted

  return axios.delete(`${BASE_URL}/${id}`)
    .then((res) => {
      console.log("Good deleted successfully:", res.data); // Log success response
      return res.data;
    })
    .catch((err) => {
      console.error(`Error deleting good with ID ${id}:`, err); // Log error if deletion fails
      return Promise.reject(err);
    });
};
