import React, { useState } from 'react';
import Search from './components/Search';
import { fetchUserData } from './services/githubService';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle search
  const handleSearch = async (username) => {
    setLoading(true);  // Start loading
    setError(null);  // Reset any previous errors
    try {
      const userData = await fetchUserData(username);  // Fetch user data
      setUser(userData);  // Set user data if successful
    } catch (error) {
      setError('Looks like we can’t find the user');  // Set error if fetch fails
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="App p-4">
      <h1 className="text-2xl mb-4">GitHub User Search</h1>
      
      {/* Search component to capture input */}
      <Search onSearch={handleSearch} />
      
      {/* Display loading message */}
      {loading && <p className="text-gray-500">Loading...</p>}
      
      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Display user data if found */}
      {user && (
        <div className="user-profile p-4 border rounded shadow-lg mt-4">
          <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full" />
          <h2 className="text-xl mt-4">{user.name || user.login}</h2>
          <p>{user.bio}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
