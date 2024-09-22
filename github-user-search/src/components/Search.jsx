import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [username, setUsername] = useState(''); // Input for GitHub username
  const [userData, setUserData] = useState(null); // Store fetched user data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);
    
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);  // Store user data in state
    } catch (error) {
      setError('Looks like we can’t find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container p-4">
      <h1 className="text-2xl mb-4">GitHub User Search</h1>
      
      {/* Form to enter GitHub username */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded">
          Search
        </button>
      </form>

      {/* Display loading message */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display user info if available */}
      {userData && (
        <div className="user-info p-4 border rounded shadow-lg mt-4">
          {/* User avatar */}
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="w-24 h-24 rounded-full"
          />
          {/* User login */}
          <h2 className="text-xl mt-4">{userData.login}</h2>
          {/* Link to user GitHub profile */}
          <a
            href={userData.html_url}
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
