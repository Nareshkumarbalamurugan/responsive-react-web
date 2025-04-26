
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [appliedOffers, setAppliedOffers] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        setCartItems([]);
      }
    }
    
    // Load applied offers
    const savedOffers = localStorage.getItem('appliedOffers');
    if (savedOffers) {
      try {
        setAppliedOffers(JSON.parse(savedOffers));
      } catch (error) {
        console.error('Failed to parse offers from localStorage:', error);
        setAppliedOffers([]);
      }
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
    
    // Calculate total price
    const total = cartItems.reduce((sum, item) => {
      const offerPrice = item.offerPrice || item.price;
      return sum + (offerPrice * item.quantity);
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);
  
  // Save applied offers to localStorage
  useEffect(() => {
    if (appliedOffers.length > 0) {
      localStorage.setItem('appliedOffers', JSON.stringify(appliedOffers));
    } else {
      localStorage.removeItem('appliedOffers');
    }
  }, [appliedOffers]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    // Also remove any offers for this product
    setAppliedOffers(prev => prev.filter(offer => offer.productId !== productId));
  };

  // Update quantity of an item
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Apply offer to a product
  const applyOffer = (productId, offerPrice, offerCode) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, offerPrice, offerCode }
          : item
      )
    );
    
    // Add to applied offers
    setAppliedOffers(prev => {
      // Remove any existing offer for this product
      const filtered = prev.filter(offer => offer.productId !== productId);
      // Add the new offer
      return [...filtered, { productId, offerPrice, offerCode, appliedAt: new Date().toISOString() }];
    });
  };
  
  // Remove offer from a product
  const removeOffer = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, offerPrice: undefined, offerCode: undefined }
          : item
      )
    );
    
    // Remove from applied offers
    setAppliedOffers(prev => prev.filter(offer => offer.productId !== productId));
  };

  // Apply coupon to entire cart
  const applyCoupon = (couponCode) => {
    // In a real application, this would validate the coupon with a backend API
    // For demo purposes, we'll just apply a 10% discount for any coupon
    const validCoupons = {
      'WELCOME10': { discount: 0.1, type: 'percentage' },
      'FLAT100': { discount: 100, type: 'fixed' },
      'SUMMER20': { discount: 0.2, type: 'percentage' }
    };
    
    const coupon = validCoupons[couponCode];
    if (!coupon) return false;
    
    // Store the applied coupon
    localStorage.setItem('appliedCoupon', JSON.stringify({
      code: couponCode,
      ...coupon,
      appliedAt: new Date().toISOString()
    }));
    
    return true;
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    setAppliedOffers([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('appliedOffers');
    localStorage.removeItem('appliedCoupon');
  };

  const value = {
    cartItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyOffer,
    removeOffer,
    applyCoupon,
    clearCart,
    appliedOffers
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
