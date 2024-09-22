import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [repos, setRepos] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Invoke the onSearch function, passing the search parameters
    onSearch({
      username: username,
      location: location,
      repos: repos
    });

    // Clear input fields after submission
    setUsername('');
    setLocation('');
    setRepos('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="repos">Minimum Repositories:</label>
        <input
          type="number"
          id="repos"
          placeholder="Enter minimum repositories"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default Search;
