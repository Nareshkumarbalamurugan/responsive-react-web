
/**
 * Authentication utilities for login verification and storage
 */

// Verify login credentials against stored user data
export const verifyLogin = (email, password) => {
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
  const matchedUser = users.find(
    user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );
  
  return matchedUser || null;
};

// Register a new user
export const registerUser = (userData) => {
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
  // Check if user with this email already exists
  const existingUser = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
  
  if (existingUser) {
    return { success: false, message: 'User with this email already exists' };
  }
  
  // Add user to local storage
  const newUser = {
    id: Date.now(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  
  return { 
    success: true, 
    message: 'Registration successful', 
    user: { ...newUser, password: undefined } // Return user without password
  };
};

// Save the current user to local storage
export const saveCurrentUser = (user) => {
  // Store without sensitive information
  const userToStore = { ...user };
  delete userToStore.password;
  
  localStorage.setItem('currentUser', JSON.stringify(userToStore));
};

// Get the current logged-in user from local storage
export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user;
  } catch (error) {
    console.error('Error parsing user from localStorage', error);
    return null;
  }
};

// Clear the current user from local storage (logout)
export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

// Get all registered users
export const getRegisteredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  } catch (error) {
    console.error('Error parsing registered users from localStorage', error);
    return [];
  }
};
