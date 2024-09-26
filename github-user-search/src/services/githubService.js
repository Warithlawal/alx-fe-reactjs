import axios from 'axios';

// Function to fetch user data based on search query and location
export const fetchUserData = async (query, location = '', minRepos = 0) => {
  try {
    // Construct the GitHub API search query
    let searchQuery = `${query} repos:>=${minRepos}`;
    
    // If location is provided, add it to the search query
    if (location) {
      searchQuery += ` location:${location}`;
    }

    const response = await axios.get('https://api.github.com/search/users', {
      params: {
        q: searchQuery,
        per_page: 10, // Set the number of results per page
      },
    });

    return response.data; // Return the data from the API response
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
