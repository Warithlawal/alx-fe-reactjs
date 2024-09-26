import axios from 'axios';

// Function to fetch user data based on the search query and minimum repository count
export const fetchUserData = async (query, minRepos = 0) => {
  try {
    const response = await axios.get('https://api.github.com/search/users', {
      params: {
        q: `${query} repos:>=${minRepos}`, // GitHub search syntax for filtering users by minimum repos
        per_page: 10, // Limit results per page to 10
      },
    });

    return response.data; // Returns the entire data object containing user items
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
