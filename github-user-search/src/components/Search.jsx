import React, { useState } from 'react';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // Add an error state

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false); // Reset error before the search

    try {
      // Make your API call here to fetch user data
      const response = await fetch(`https://api.github.com/search/users?q=${searchInput}`);
      const data = await response.json();
      
      if (data.items.length === 0) {
        setError(true); // If no users found, set error to true
      } else {
        setSearchResults(data.items);
      }
    } catch (err) {
      setError(true); // Set error if there is a failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search GitHub user..." 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required 
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>Looks like we can't find the user</p>}  {/* Display error message */}
      
      <ul>
        {searchResults.map(user => (
          <li key={user.id}>
            <img src={user.avatar_url} alt={user.login} />
            <p>{user.login}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
