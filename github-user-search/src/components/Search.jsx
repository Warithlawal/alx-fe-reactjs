import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [repos, setRepos] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass user input to the parent component for searching
    await onSearch({ username, location, repos });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Minimum Repositories"
        value={repos}
        onChange={(e) => setRepos(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Search</button>
    </form>
  );
};

export default Search;
