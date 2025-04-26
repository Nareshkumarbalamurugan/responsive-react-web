
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

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
          name: type === 'seller' ? 'Demo Seller' : 'Demo Buyer',
          phone: '+91 9876543210',
          address: type === 'seller' ? '123 Business Park, Mumbai, India' : '456 Residential Colony, Delhi, India',
          createdAt: new Date().toISOString(),
          profile: {
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
            bio: type === 'seller' ? 'Passionate about providing quality products to customers.' : 'I love shopping for quality products.',
            preferences: {
              notifications: true,
              newsletter: true
            },
            lastLogin: new Date().toISOString()
          }
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        setUserType(type);
        toast.success('Logged in successfully!');
        resolve(user);
      }, 1000);
    });
  };

  // Simulate registration
  const register = (email, password, type, userData = {}) => {
    // This would connect to a real API in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful registration
        const name = userData.name || email.split('@')[0];
        const phone = userData.phone || '';
        const address = userData.address || '';
        
        const user = { 
          id: Date.now(), 
          email, 
          userType: type,
          name,
          phone,
          address,
          createdAt: new Date().toISOString(),
          profile: {
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
            bio: type === 'seller' ? 'Welcome to my shop!' : 'I\'m a new shopper!',
            preferences: {
              notifications: true,
              newsletter: true
            },
            lastLogin: new Date().toISOString()
          }
        };
        
        // Add seller-specific details
        if (type === 'seller') {
          user.businessName = userData.businessName || `${name}'s Store`;
          user.gstNumber = userData.gstNumber || '';
          user.sellerType = userData.sellerType || 'individual';
          user.businessAddress = userData.businessAddress || address;
          user.bankDetails = {
            accountNumber: userData.accountNumber || '',
            ifscCode: userData.ifscCode || '',
            bankName: userData.bankName || ''
          };
        }
        
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        setUserType(type);
        toast.success('Account created successfully!');
        resolve(user);
      }, 1000);
    });
  };

  // Update user profile
  const updateProfile = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const updatedUser = { ...currentUser, ...userData };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setCurrentUser(updatedUser);
          toast.success('Profile updated successfully!');
          resolve(updatedUser);
        } catch (error) {
          toast.error('Failed to update profile');
          reject(error);
        }
      }, 800);
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setUserType(null);
    toast.success('Logged out successfully');
  };

  const value = {
    currentUser,
    userType,
    loading,
    login,
    register,
    updateProfile,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
