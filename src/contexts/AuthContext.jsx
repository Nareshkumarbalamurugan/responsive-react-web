
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null); // 'buyer' or 'seller'

  // Simulate loading user from localStorage on first render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setUserType(parsedUser.userType);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        setCurrentUser(null);
        setUserType(null);
      }
    }
    setLoading(false);
  }, []);

  // Simulate login
  const login = (email, password, type) => {
    // This would connect to a real API in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login
        const user = { 
          id: Date.now(), 
          email, 
          userType: type,
          // Add other user details that would come from an API
          name: type === 'seller' ? 'Demo Seller' : 'Demo Buyer',
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        setUserType(type);
        resolve(user);
      }, 1000);
    });
  };

  // Simulate registration
  const register = (email, password, type) => {
    // This would connect to a real API in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful registration
        const user = { 
          id: Date.now(), 
          email, 
          userType: type,
          name: email.split('@')[0], // Default name from email
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        setUserType(type);
        resolve(user);
      }, 1000);
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setUserType(null);
  };

  const value = {
    currentUser,
    userType,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
