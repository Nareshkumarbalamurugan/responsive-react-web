
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogIn } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { currentUser, logout, userType } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="border-b border-gray-200 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-brandGreen text-4xl font-bold">
          ProdSeek
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/cart" className="relative text-xl hover:text-brandGreen transition-colors">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button 
            className="flex items-center"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-lg hover:text-brandGreen transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-lg hover:text-brandGreen transition-colors">
            Shop
          </Link>
          <Link to="/categories" className="text-lg hover:text-brandGreen transition-colors">
            Categories
          </Link>
          <Link to="/about" className="text-lg hover:text-brandGreen transition-colors">
            About
          </Link>
          <Link to="/cart" className="relative text-lg hover:text-brandGreen transition-colors">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
          
          {/* User Profile Menu */}
          <div className="relative">
            <button 
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 text-lg hover:text-brandGreen transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              {currentUser ? (
                <User size={24} />
              ) : (
                <LogIn size={24} />
              )}
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                {currentUser ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="font-medium">{currentUser.name}</p>
                      <p className="text-sm text-gray-500">{currentUser.email}</p>
                      <p className="text-xs text-gray-400 mt-1 capitalize">{userType} Account</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    {userType === 'seller' && (
                      <Link 
                        to="/seller-dashboard" 
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Seller Dashboard
                      </Link>
                    )}
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button 
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 border-b border-gray-200 py-4">
            <div className="flex flex-col space-y-4 px-6">
              <Link 
                to="/" 
                className="text-xl hover:text-brandGreen transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="text-xl hover:text-brandGreen transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/categories" 
                className="text-xl hover:text-brandGreen transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className="text-xl hover:text-brandGreen transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {currentUser ? (
                <>
                  <div className="py-2 border-t border-gray-200">
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                    <p className="text-xs text-gray-400 mt-1 capitalize">{userType} Account</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="text-xl hover:text-brandGreen transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  {userType === 'seller' && (
                    <Link 
                      to="/seller-dashboard" 
                      className="text-xl hover:text-brandGreen transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Seller Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/orders" 
                    className="text-xl hover:text-brandGreen transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button 
                    className="text-xl text-left hover:text-brandGreen transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-xl hover:text-brandGreen transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-xl hover:text-brandGreen transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
