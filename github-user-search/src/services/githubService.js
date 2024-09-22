import axios from 'axios';

// Function to fetch user data
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;  // Return user data from API
  } catch (error) {
    throw error;  // Throw error if something goes wrong
  }
};
