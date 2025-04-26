
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogIn } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { currentUser, logout, userType } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white border-b border-gray-200 py-4'} px-4 md:px-6`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-brandGreen text-3xl md:text-4xl font-bold">
          ProdSeek
        </Link>
        
        {/* Search Bar - Desktop */}
        <div className="hidden md:block md:w-1/3 lg:w-2/5">
          <SearchBar />
        </div>
        
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
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          <Link to="/" className={`text-lg hover:text-brandGreen transition-colors ${location.pathname === '/' ? 'text-brandGreen font-medium' : ''}`}>
            Home
          </Link>
          <Link to="/shop" className={`text-lg hover:text-brandGreen transition-colors ${location.pathname === '/shop' ? 'text-brandGreen font-medium' : ''}`}>
            Shop
          </Link>
          <Link to="/categories" className={`text-lg hover:text-brandGreen transition-colors ${location.pathname === '/categories' ? 'text-brandGreen font-medium' : ''}`}>
            Categories
          </Link>
          <Link to="/about" className={`text-lg hover:text-brandGreen transition-colors ${location.pathname === '/about' ? 'text-brandGreen font-medium' : ''}`}>
            About
          </Link>
          <Link to="/cart" className={`relative text-lg hover:text-brandGreen transition-colors ${location.pathname === '/cart' ? 'text-brandGreen font-medium' : ''}`}>
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
              aria-label={currentUser ? "User profile" : "Login"}
            >
              {currentUser ? (
                <User size={24} />
              ) : (
                <LogIn size={24} />
              )}
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                {currentUser ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-200">
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
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Orders
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
                    <button 
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-3">Account</h3>
                    <Link 
                      to="/login" 
                      className="block w-full text-center py-2 mb-2 bg-brandGreen text-white rounded hover:bg-opacity-90 transition-opacity"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="block w-full text-center py-2 border border-brandGreen text-brandGreen rounded hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-16 left-0 right-0 bg-white z-50 border-b border-gray-200 py-4 shadow-lg max-h-[85vh] overflow-y-auto">
            <div className="px-6 pb-4">
              <SearchBar />
            </div>
            
            <div className="flex flex-col space-y-4 px-6">
              <Link 
                to="/" 
                className={`text-xl hover:text-brandGreen transition-colors ${location.pathname === '/' ? 'text-brandGreen font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className={`text-xl hover:text-brandGreen transition-colors ${location.pathname === '/shop' ? 'text-brandGreen font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/categories" 
                className={`text-xl hover:text-brandGreen transition-colors ${location.pathname === '/categories' ? 'text-brandGreen font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className={`text-xl hover:text-brandGreen transition-colors ${location.pathname === '/about' ? 'text-brandGreen font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {currentUser ? (
                <>
                  <div className="py-2 border-t border-gray-200 mt-2">
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
                  <Link 
                    to="/orders" 
                    className="text-xl hover:text-brandGreen transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
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
                  <button 
                    className="text-xl text-left hover:text-brandGreen transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 border-t border-gray-200 pt-4 mt-2">
                  <Link 
                    to="/login" 
                    className="py-2 bg-brandGreen text-white text-center rounded-md hover:bg-opacity-90 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="py-2 border border-brandGreen text-brandGreen text-center rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
