import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);  // Pass the username to the parent component
      setUsername('');  // Clear the input after submission
    }
  };

  return (
    <div className="search-container p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
