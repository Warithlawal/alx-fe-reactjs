import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);  // Stores user data
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Handle the search input and fetch GitHub user data
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`https://api.github.com/users/${query}`);
      setUser(response.data);
    } catch (err) {
      setError("Looks like we cant find the user");  // Set error message
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter GitHub username"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Search</button>
      </form>

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display user information */}
      {user && (
        <div className="user-info p-4 border rounded shadow-lg">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-full"
          />
          <h2 className="text-xl mt-4">{user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
