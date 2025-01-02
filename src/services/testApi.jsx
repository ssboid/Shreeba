import axios from 'axios';

const BASE_URL = 'https://66d728f9006bfbe2e6500b43.mockapi.io/test';

export const getImages = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

export const postImage = async (imageUrl) => {
  try {
    const response = await axios.post(BASE_URL, { url: imageUrl });
    return response.data;
  } catch (error) {
    console.error('Error posting image:', error);
    return null;
  }
};
