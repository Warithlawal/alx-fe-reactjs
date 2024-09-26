import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService'; // Updated path

const Search = () => {
  const [query, setQuery] = useState('');
  const [minRepos, setMinRepos] = useState(0); // Add state for minRepos
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission to trigger fetchUserData
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    setLoading(true);
    setError('');
    setUsers([]);

    try {
      const data = await fetchUserData(query, minRepos); // Pass minRepos as parameter
      setUsers(data.items); // Assuming data.items is the list of users
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for GitHub users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-box"
        />
        <input
          type="number"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="input-box"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Conditional Rendering for Loading, Error, or Results */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users.length > 0 && !loading && !error && (
        <div className="results-container">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar_url} alt={user.login} className="avatar" />
              <h2>{user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
