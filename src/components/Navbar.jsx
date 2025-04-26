
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b border-gray-200 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-brandGreen text-4xl font-bold">
          ProdSeek
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12 items-center">
          <Link to="/" className="text-xl hover:text-brandGreen transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-xl hover:text-brandGreen transition-colors">
            Shop
          </Link>
          <Link to="/categories" className="text-xl hover:text-brandGreen transition-colors">
            Categories
          </Link>
          <Link to="/about" className="text-xl hover:text-brandGreen transition-colors">
            About
          </Link>
          <Link to="/cart" className="relative text-xl hover:text-brandGreen transition-colors">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
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
              <Link 
                to="/cart" 
                className="text-xl hover:text-brandGreen transition-colors flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={24} />
                <span>Cart {cartItems.length > 0 && `(${cartItems.length})`}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
