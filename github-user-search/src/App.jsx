import React, { useState } from 'react';
import Search from './components/Search';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle search and API call
  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUser(response.data);  // Update user state with fetched data
    } catch (error) {
      setError('Looks like we can’t find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App p-4">
      <h1 className="text-2xl mb-4">GitHub User Search</h1>

      {/* Search component for input */}
      <Search onSearch={handleSearch} />

      {/* Conditional rendering for loading, error, and user display */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {user && (
        <div className="user-profile p-4 border rounded shadow-lg mt-4">
          <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full" />
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
