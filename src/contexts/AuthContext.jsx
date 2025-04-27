
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { verifyLogin, saveCurrentUser, getCurrentUser, clearCurrentUser } from '../utils/authUtils';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null); // 'buyer' or 'seller'
  
  // Track all registered users in localStorage
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Load user from localStorage on first render
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setUserType(user.userType);
    }
    setLoading(false);
  }, []);
  
  // Save registered users to localStorage when updated
  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Login with validation against registered users
  const login = (email, password, type) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user exists in registered users
        const user = verifyLogin(email, password);
        
        if (!user) {
          reject(new Error('Invalid credentials'));
          return;
        }
        
        if (user.userType !== type) {
          reject(new Error(`This account is registered as a ${user.userType}, not as a ${type}`));
          return;
        }
        
        // Clone user data but exclude password for security
        const { password: _, ...userWithoutPassword } = user;
        
        // Update login time
        userWithoutPassword.profile = userWithoutPassword.profile || {};
        userWithoutPassword.profile.lastLogin = new Date().toISOString();
        
        saveCurrentUser(userWithoutPassword);
        setCurrentUser(userWithoutPassword);
        setUserType(type);
        resolve(userWithoutPassword);
      }, 500);
    });
  };

  // Register new user and save to registeredUsers
  const register = (email, password, type, userData = {}) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const userExists = registeredUsers.some(user => user.email === email && user.userType === type);
        
        if (userExists) {
          toast.error(`An account with this email already exists as a ${type}`);
          reject(new Error('User already exists'));
          return;
        }
        
        const name = userData.name || email.split('@')[0];
        const phone = userData.phone || '';
        const address = userData.address || '';
        
        const user = { 
          id: Date.now(), 
          email,
          password, // Store password for validation (in real app, this would be hashed)
          userType: type,
          name,
          phone,
          address,
          createdAt: new Date().toISOString(),
          profile: {
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
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
        
        // Add user to registeredUsers
        const { password: _, ...userWithoutPassword } = user;
        setRegisteredUsers(prev => [...prev, user]);
        
        saveCurrentUser(userWithoutPassword);
        setCurrentUser(userWithoutPassword);
        setUserType(type);
        resolve(userWithoutPassword);
      }, 500);
    });
  };

  // Update user profile
  const updateProfile = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const updatedUser = { ...currentUser, ...userData };
          
          // Update the user in registeredUsers
          setRegisteredUsers(prev => 
            prev.map(user => 
              user.id === currentUser.id ? { ...user, ...userData, password: user.password } : user
            )
          );
          
          saveCurrentUser(updatedUser);
          setCurrentUser(updatedUser);
          toast.success('Profile updated successfully!');
          resolve(updatedUser);
        } catch (error) {
          toast.error('Failed to update profile');
          reject(error);
        }
      }, 300);
    });
  };

  // Logout
  const logout = () => {
    clearCurrentUser();
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
    logout,
    registeredUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
