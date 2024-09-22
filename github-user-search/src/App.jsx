import React, { useState } from 'react';
import axios from 'axios';
import Search from './components/Search';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async ({ username, location, repos }) => {
    setLoading(true);
    setError(null);
    
    try {
      // Construct the query for advanced search
      const query = `${username ? `user:${username}` : ''} ${location ? `location:${location}` : ''} ${repos ? `repos:>${repos}` : ''}`.trim().replace(/\s+/g, '+');
      const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
      
      if (response.data.items.length > 0) {
        setUsers(response.data.items);  // Store user data
      } else {
        setError("Looks like we can't find the user");
        setUsers([]);  // Reset users if no results
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setUsers([]);  // Reset users on error
    } finally {
      setLoading(false);  // End loading state
    }
  };

  return (
    <div className="app-container p-4">
      <h1 className="text-2xl mb-4 text-center">GitHub User Search</h1>

      {/* Render Search component, passing handleSearch as a prop */}
      <Search onSearch={handleSearch} />
      
      {/* Display loading message */}
      {loading && <p className="text-center">Loading...</p>}
      
      {/* Display error message if any */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {/* Render search results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {users.map((user) => (
          <div key={user.id} className="user-info p-4 border rounded shadow-lg mt-4 text-center">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-xl mt-4">{user.login}</h2>
            {user.location && <p>Location: {user.location}</p>}
            <p>Public Repositories: {user.public_repos}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              View GitHub Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
