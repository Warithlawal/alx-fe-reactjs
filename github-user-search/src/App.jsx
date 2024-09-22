import React, { useState } from 'react';
import Search from './components/Search';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle the search and fetch GitHub users
  const handleSearch = async ({ username, location, repos }) => {
    setLoading(true);
    setError(null);

    try {
      // Construct the search query
      const query = `q=${username ? `user:${username}` : ''}${location ? `+location:${location}` : ''}${repos ? `+repos:>${repos}` : ''}`;
      const response = await axios.get(`https://api.github.com/search/users?${query}`);
      
      // If users found, set them in state
      if (response.data.items.length > 0) {
        setUsers(response.data.items);
      } else {
        setError("Looks like we can't find the user");
        setUsers([]);
      }
    } catch (error) {
      setError("Looks like we can't find the user");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container p-4">
      <h1 className="text-2xl mb-4">GitHub User Search</h1>
      
      {/* Search form */}
      <Search onSearch={handleSearch} />
      
      {/* Loading state */}
      {loading && <p>Loading...</p>}
      
      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Render users if any exist */}
      {users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {users.map((user) => (
            <div key={user.id} className="user-info p-4 border rounded shadow-lg mt-4">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
