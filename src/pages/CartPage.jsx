
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BadgePercent } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, applyCoupon } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [userAddress, setUserAddress] = useState(null);
  
  // Load saved address from localStorage
  React.useEffect(() => {
    if (currentUser) {
      const savedAddress = localStorage.getItem(`userAddress_${currentUser.id}`);
      if (savedAddress) {
        try {
          setUserAddress(JSON.parse(savedAddress));
        } catch (error) {
          console.error("Failed to parse saved address:", error);
        }
      }
    }
  }, [currentUser]);
  
  // Calculate total price
  const subtotal = cartItems?.reduce((total, item) => {
    return total + (item.offerPrice || item.price) * item.quantity;
  }, 0) || 0;
  
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryCharge + tax;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    
    const success = applyCoupon(couponCode.trim().toUpperCase());
    if (success) {
      toast.success('Coupon applied successfully!');
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleApplyOffer = (offerCode) => {
    const success = applyCoupon(offerCode);
    if (success) {
      toast.success(`Offer code ${offerCode} applied successfully!`);
    } else {
      toast.error('Unable to apply offer');
    }
  };

  const handleProceedToCheckout = () => {
    if (!currentUser) {
      toast.error('Please login to checkout');
      navigate('/login', { state: { from: '/cart' }});
      return;
    }
    
    if (!userAddress) {
      navigate('/address', { state: { from: '/cart' }});
      return;
    }
    
    navigate('/payment', { state: { from: '/cart' }});
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <img 
          src="https://images.unsplash.com/photo-1612083476946-c6dd471f80e0?w=800&auto=format&fit=crop"
          alt="Empty Cart" 
          className="w-64 h-64 object-cover mb-8 rounded-full opacity-70"
        />
        <h2 className="text-2xl font-medium mb-2 text-center">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 text-center">Looks like you haven't added anything to your cart yet.</p>
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
          <div className="lg:w-2/3 w-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row gap-4">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0 mx-auto md:mx-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-28 h-28 object-cover rounded-md"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1584473457409-ce85152af916?w=800&auto=format&fit=crop"; }}
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-brandGreen transition-colors block text-center md:text-left">
                        {item.name}
                      </Link>
                      {item.seller && (
                        <p className="text-sm text-gray-500 text-center md:text-left">Seller: {item.seller.name}</p>
                      )}
                      <div className="mt-2">
                        <div className="flex items-center justify-center md:justify-start">
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
                      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
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
          <div className="lg:w-1/3 w-full mt-6 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              {/* Offers Section */}
              <Card className="mb-6 p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-4">
                  <BadgePercent className="text-brandGreen" />
                  <h3 className="font-semibold">Available Offers</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between items-center">
                    <span>• Use code WELCOME10 for 10% off your first order</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-brandGreen"
                      onClick={() => handleApplyOffer('WELCOME10')}
                    >
                      Apply
                    </Button>
                  </li>
                  <li>
                    <span>• Free delivery on orders above ₹500</span>
                    {subtotal < 500 && (
                      <span className="text-xs text-gray-500 block mt-1">
                        Add ₹{(500 - subtotal).toFixed(2)} more to get free delivery
                      </span>
                    )}
                  </li>
                  <li className="flex justify-between items-center">
                    <span>• Use FLAT100 for ₹100 off on orders above ₹1000</span>
                    {subtotal >= 1000 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-brandGreen"
                        onClick={() => handleApplyOffer('FLAT100')}
                      >
                        Apply
                      </Button>
                    )}
                  </li>
                  <li className="flex justify-between items-center">
                    <span>• Use SUMMER20 for 20% off on summer collection</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-brandGreen"
                      onClick={() => handleApplyOffer('SUMMER20')}
                    >
                      Apply
                    </Button>
                  </li>
                </ul>
              </Card>

              {/* Coupon Input */}
              <div className="flex gap-2 mb-6">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleApplyCoupon}>Apply</Button>
              </div>

              {/* Price Summary */}
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
                    <Button 
                      variant="link"
                      className="text-brandGreen p-0 mt-2 h-auto"
                      onClick={() => navigate('/address', { state: { from: '/cart' }})}
                    >
                      Change Address
                    </Button>
                  </div>
                </div>
              )}
              
              <Button 
                className="w-full py-6 bg-brandGreen text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                onClick={handleProceedToCheckout}
              >
                {!currentUser ? "Login to Checkout" : userAddress ? 'Proceed to Payment' : 'Add Delivery Address'}
              </Button>
              
              <div className="mt-6 text-center">
                <Link to="/shop" className="text-brandGreen hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
