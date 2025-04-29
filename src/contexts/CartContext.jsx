
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

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
    
    // Load applied coupon
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(savedCoupon));
      } catch (error) {
        console.error('Failed to parse coupon from localStorage:', error);
        setAppliedCoupon(null);
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
    
    // Calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => {
      const itemPrice = item.offerPrice || item.price;
      return sum + (itemPrice * item.quantity);
    }, 0);
    
    // Apply coupon discount if any
    let finalPrice = subtotal;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        finalPrice = subtotal * (1 - appliedCoupon.discount);
      } else if (appliedCoupon.type === 'fixed') {
        finalPrice = Math.max(0, subtotal - appliedCoupon.discount);
      }
    }
    
    // Add delivery and tax
    const deliveryCharge = subtotal > 500 ? 0 : 50;
    const tax = finalPrice * 0.05; // 5% tax
    
    // Set final total price
    setTotalPrice(finalPrice + deliveryCharge + tax);
    
  }, [cartItems, appliedCoupon]);
  
  // Save applied offers to localStorage
  useEffect(() => {
    if (appliedOffers.length > 0) {
      localStorage.setItem('appliedOffers', JSON.stringify(appliedOffers));
    } else {
      localStorage.removeItem('appliedOffers');
    }
  }, [appliedOffers]);
  
  // Save applied coupon to localStorage
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('appliedCoupon');
    }
  }, [appliedCoupon]);

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
    // For demo purposes, we'll just apply discounts for specific coupon codes
    const validCoupons = {
      'WELCOME10': { discount: 0.1, type: 'percentage' },
      'FLAT100': { discount: 100, type: 'fixed' },
      'SUMMER20': { discount: 0.2, type: 'percentage' }
    };
    
    const coupon = validCoupons[couponCode];
    if (!coupon) return false;
    
    // Check minimum order value for FLAT100
    if (couponCode === 'FLAT100') {
      const subtotal = cartItems.reduce((sum, item) => {
        const itemPrice = item.offerPrice || item.price;
        return sum + (itemPrice * item.quantity);
      }, 0);
      
      if (subtotal < 1000) {
        return false;
      }
    }
    
    // Store the applied coupon
    setAppliedCoupon({
      code: couponCode,
      ...coupon,
      appliedAt: new Date().toISOString()
    });
    
    return true;
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    setAppliedOffers([]);
    setAppliedCoupon(null);
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
    appliedOffers,
    appliedCoupon
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
