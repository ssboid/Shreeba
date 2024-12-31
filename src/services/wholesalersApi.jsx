// services/wholesalersApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/wholesalers';

// Fetch all wholesalers (GET)
export const getWholesalers = () => {
  console.log("Attempting to fetch wholesalers from:", BASE_URL); // Log base URL

  return axios.get(BASE_URL)
    .then((res) => {
      console.log("Data fetched successfully:", res.data); // Log fetched data
      return res.data;
    })
    .catch((err) => {
      console.error("Error fetching data from server:", err); // Log error if fetching fails
      return Promise.reject(err);
    });
};

// Add a new wholesaler (POST)
export const addWholesaler = (newWholesaler) => {
  console.log("Attempting to add a new wholesaler:", newWholesaler); // Log data to be added

  return axios.post(BASE_URL, newWholesaler)
    .then((res) => {
      console.log("Wholesaler added successfully:", res.data); // Log success response
      return res.data;
    })
    .catch((err) => {
      console.error("Error adding wholesaler:", err); // Log error if adding fails
      return Promise.reject(err);
    });
};

// Update an existing wholesaler (PUT)
export const updateWholesaler = (id, updatedWholesaler) => {
  console.log(`Attempting to update wholesaler with ID ${id}:`, updatedWholesaler); // Log ID and data to update

  return axios.put(`${BASE_URL}/${id}`, updatedWholesaler)
    .then((res) => {
      console.log("Wholesaler updated successfully:", res.data); // Log success response
      return res.data;
    })
    .catch((err) => {
      console.error(`Error updating wholesaler with ID ${id}:`, err); // Log error if updating fails
      return Promise.reject(err);
    });
};

// Delete a wholesaler (DELETE)
export const deleteWholesaler = (id) => {
  console.log(`Attempting to delete wholesaler with ID ${id}`); // Log ID to be deleted

  return axios.delete(`${BASE_URL}/${id}`)
    .then((res) => {
      console.log("Wholesaler deleted successfully:", res.data); // Log success response
      return res.data;
    })
    .catch((err) => {
      console.error(`Error deleting wholesaler with ID ${id}:`, err); // Log error if deletion fails
      return Promise.reject(err);
    });
};
