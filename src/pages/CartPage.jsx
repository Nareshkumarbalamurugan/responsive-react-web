
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import AddressForm from '../components/AddressForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  
  // Calculate total price
  const subtotal = cartItems?.reduce((total, item) => {
    return total + (item.offerPrice || item.price) * item.quantity;
  }, 0) || 0;
  
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryCharge + tax;

  // Load saved address from local storage
  useEffect(() => {
    if (currentUser) {
      const savedAddress = localStorage.getItem(`userAddress_${currentUser.id}`);
      if (savedAddress) {
        setUserAddress(JSON.parse(savedAddress));
      }
    }
  }, [currentUser]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  const handleCheckout = () => {
    if (!currentUser) {
      toast.error('Please login to checkout');
      navigate('/login', { state: { from: '/cart' }});
      return;
    }
    
    if (!userAddress) {
      setIsAddressDialogOpen(true);
      return;
    }
    
    // Process checkout with the address
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };
  
  const handleSaveAddress = (address) => {
    setUserAddress(address);
    // Save to local storage
    if (currentUser) {
      localStorage.setItem(`userAddress_${currentUser.id}`, JSON.stringify(address));
    }
    setIsAddressDialogOpen(false);
    toast.success('Address saved successfully!');
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1612083476946-c6dd471f80e0?w=800&auto=format&fit=crop"
          alt="Empty Cart" 
          className="w-64 h-64 object-cover mb-8 rounded-full opacity-70"
        />
        <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/shop" 
          className="bg-brandGreen text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row gap-4">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-28 h-28 object-cover rounded-md"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1584473457409-ce85152af916?w=800&auto=format&fit=crop"; }}
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-brandGreen transition-colors">
                        {item.name}
                      </Link>
                      {item.seller && (
                        <p className="text-sm text-gray-500">Seller: {item.seller.name}</p>
                      )}
                      <div className="mt-2">
                        <div className="flex items-center">
                          {item.offerPrice ? (
                            <>
                              <span className="text-lg font-bold text-brandGreen">₹{(item.offerPrice * item.quantity).toFixed(2)}</span>
                              <span className="text-sm text-gray-500 line-through ml-2">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="text-lg font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="text-red-500 hover:text-red-700 text-sm"
                          onClick={() => handleRemoveItem(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charge</span>
                  {deliveryCharge > 0 ? (
                    <span className="font-medium">₹{deliveryCharge.toFixed(2)}</span>
                  ) : (
                    <span className="text-green-600">Free</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Delivery Address */}
              {userAddress && (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="font-medium mb-2">Delivery Address</h3>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <p className="font-medium">{userAddress.fullName}</p>
                    <p>{userAddress.streetAddress}</p>
                    <p>{userAddress.city}, {userAddress.state} {userAddress.postalCode}</p>
                    <p>Phone: {userAddress.phoneNumber}</p>
                    <button 
                      className="text-brandGreen text-sm mt-2 hover:underline"
                      onClick={() => setIsAddressDialogOpen(true)}
                    >
                      Change Address
                    </button>
                  </div>
                </div>
              )}
              
              <button 
                className="w-full py-3 bg-brandGreen text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                onClick={handleCheckout}
              >
                {userAddress ? 'Place Order' : 'Continue to Delivery'}
              </button>
              
              <div className="mt-6 text-center">
                <Link to="/shop" className="text-brandGreen hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Address Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delivery Address</DialogTitle>
            <DialogDescription>
              Enter your delivery address details below
            </DialogDescription>
          </DialogHeader>
          <AddressForm onSave={handleSaveAddress} initialAddress={userAddress} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartPage;
