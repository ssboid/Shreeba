// services/usersApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/users';

// Fetch all users (GET)
export const getUsers = () => {
  console.log("Attempting to fetch users from:", BASE_URL); // Log base URL

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
