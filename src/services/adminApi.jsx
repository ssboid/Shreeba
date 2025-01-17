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

// Login user (POST)
export const loginUser = async (username, password) => {
  try {
    console.log('Sending login request with:', username, password);
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Login failed' };
  }
};

// Add new user (POST)
export const addUser = async (username, password) => {
  try {
    console.log('Sending add user request with:', username, password);

    // Default role is 'user'
    const response = await axios.post(`${BASE_URL}/add`, {
      username,
      password,
      role: 'user', // Explicitly set role to 'user'
    });

    console.log('Add user response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Add user error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to add user' };
  }
};


// Delete user by ID (DELETE)
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    console.log('Delete response:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error deleting user:', err.response?.data || err.message);
    throw err.response?.data || { error: 'Failed to delete user' };
  }
};

export const editUser = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, userData);
    console.log('Edit response:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error editing user:', err.response?.data || err.message);
    throw err.response?.data || { error: 'Failed to edit user' };
  }
};