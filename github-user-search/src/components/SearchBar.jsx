import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    onSearch(username);
    setUsername('');  // Clear input after search
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        className="border p-2 rounded"
      />
      <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
