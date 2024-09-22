import axios from 'axios';

export const getUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
