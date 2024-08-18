// src/components/UserContext.js
import React, { createContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
