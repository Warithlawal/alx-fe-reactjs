// src/UserContext.js
import React, { createContext } from 'react';

// Create Context
const UserContext = createContext();

// Create a Context Provider component
export const UserProvider = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
