import React, { useState } from 'react';
import axios from 'axios';
import Search from './components/Search';

const App = () => {
  const [user, setUser] = useState(null);  // Stores user data
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Fetch GitHub user data based on username
  const handleSearch = async (username) => {
    setLoading(true);  // Start loading
    setError(null);    // Clear previous errors
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUser(response.data);  // Store user data
    } catch (error) {
      setError('Looks like we can’t find the user');  // Set error message
      setUser(null);  // Clear user data if there's an error
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="app-container p-4">
      <h1 className="text-2xl mb-4">GitHub User Search</h1>

      {/* Render Search component, pass handleSearch as prop */}
      <Search onSearch={handleSearch} />

      {/* Conditional rendering based on loading, error, and user states */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {user && (
        <div className="user-info p-4 border rounded shadow-lg mt-4">
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

export default App;
