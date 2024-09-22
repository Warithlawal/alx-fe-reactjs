import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import { getUserData } from './services/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    try {
      const userData = await getUserData(username);
      setUser(userData);
      setError(null);  // Clear previous errors
    } catch (err) {
      setError('User not found.');
      setUser(null);  // Clear previous user data
    }
  };

  return (
    <div className="App p-4">
      <h1 className="text-2xl mb-4">GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500">{error}</p>}
      <UserProfile user={user} />
    </div>
  );
};

export default App;
