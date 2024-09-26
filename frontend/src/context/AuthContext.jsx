import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthContextProvider component that will wrap the app
const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if email exists in localStorage to determine if the user is logged in
    const authEmail = localStorage.getItem('authEmail');
    if (authEmail) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (email) => {
    // When login is successful, store email and set isAuthenticated to true
    localStorage.setItem('authEmail', email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove email from localStorage and set isAuthenticated to false
    localStorage.removeItem('authEmail');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
