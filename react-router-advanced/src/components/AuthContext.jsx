// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null indicates no user is logged in

  // Simulate login by setting a user object
  const login = (username, password) => {
    // Here you would have real authentication logic
    // For simplicity, we'll just set a dummy user
    setUser({ username });
  };

  // Logout function to remove user
  const logout = () => {
    setUser(null);
  };

  // Value provided to context consumers
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
