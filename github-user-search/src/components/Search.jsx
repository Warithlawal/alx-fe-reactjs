import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async (query, page) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://api.github.com/search/users`, {
        params: {
          q: query,
          page: page,
          per_page: 10, // Number of users per page
        },
      });
      setUsers((prevUsers) => [...prevUsers, ...response.data.items]);
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([]); // Clear previous results
    setPage(1);
    fetchUsers(query, 1); // Fetch first page of results
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(query, nextPage); // Fetch next page of results
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for GitHub users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="results-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar_url} alt={user.login} />
            <h2>{user.login}</h2>
            <p>Location: {user.location || 'Not Available'}</p>
            <p>Repositories: {user.public_repos || 'Not Available'}</p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        ))}
      </div>

      {users.length > 0 && !loading && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default Search;
