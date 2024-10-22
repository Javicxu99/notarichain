// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const saveAuthToken = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    // Después de setAuthToken(token);

console.log('Token guardado en el contexto:', token);

  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: saveAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
