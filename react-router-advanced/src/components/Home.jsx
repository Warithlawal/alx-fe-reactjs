// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in.</p>
          <button onClick={logout}>Logout</button>
          <p>
            Go to your <Link to="/profile">Profile</Link>.
          </p>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <p>
            <Link to="/login">Login</Link> to access protected routes.
          </p>
        </>
      )}
      <p>
        View a <Link to="/blog/1">Blog Post</Link>.
      </p>
    </div>
  );
};

export default Home;
