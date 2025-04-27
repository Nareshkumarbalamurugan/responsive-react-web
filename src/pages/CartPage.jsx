
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useIsMobile } from '../hooks/use-mobile';
import { toast } from 'sonner';
import AddressForm from '../components/AddressForm';
import PaymentOptions from '../components/PaymentOptions';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [address, setAddress] = useState(null);

  const cartTotal = cart.reduce((sum, item) => {
    return sum + (item.offerPrice || item.price) * item.quantity;
  }, 0);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success("Item removed from cart");
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };
  
  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowAddressForm(true);
  };

  const handleAddressSubmit = (addressData) => {
    setAddress(addressData);
    setShowAddressForm(false);
    setShowPaymentOptions(true);
    toast.success("Address saved");
  };

  const handlePaymentComplete = () => {
    toast.success("Payment successful! Your order has been placed.");
    clearCart();
    navigate('/orders');
  };

  if (cart.length === 0 && !showAddressForm && !showPaymentOptions) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
            <img
              src="https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?w=400&auto=format&fit=crop"
              alt="Empty Cart"
              className="w-48 h-48 object-cover mx-auto mb-6"
            />
            <h2 className="text-2xl font-medium mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <button
              className="bg-brandGreen text-white font-medium py-3 px-6 rounded-md hover:opacity-90 transition-opacity"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`${showPaymentOptions ? 'lg:w-1/2' : 'lg:w-2/3'}`}>
            {!showAddressForm && !showPaymentOptions && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className={isMobile ? "hidden" : "w-full"}>
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-4 px-6 text-left text-gray-600">Product</th>
                      <th className="py-4 px-4 text-left text-gray-600">Price</th>
                      <th className="py-4 px-4 text-center text-gray-600">Quantity</th>
                      <th className="py-4 px-4 text-right text-gray-600">Total</th>
                      <th className="py-4 px-4 text-center text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <div>
                              <h3 className="text-gray-800 font-medium">{item.name}</h3>
                              {item.offerCode && (
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                  {item.offerCode} applied
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <span className="text-gray-800 font-medium">₹{(item.offerPrice || item.price).toFixed(2)}</span>
                            {item.offerPrice && (
                              <span className="block text-xs text-gray-500 line-through">₹{item.price.toFixed(2)}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 border border-gray-300 rounded-l"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-t border-b">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 border border-gray-300 rounded-r"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-gray-800 font-medium">
                            ₹{((item.offerPrice || item.price) * item.quantity).toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Mobile Cart View */}
                <div className={isMobile ? "divide-y" : "hidden"}>
                  {cart.map(item => (
                    <div key={item.id} className="p-4">
                      <div className="flex gap-4 mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-grow">
                          <h3 className="text-gray-800 font-medium">{item.name}</h3>
                          {item.offerCode && (
                            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded inline-block mt-1">
                              {item.offerCode} applied
                            </span>
                          )}
                          <div className="mt-1">
                            <span className="text-gray-800 font-medium">₹{(item.offerPrice || item.price).toFixed(2)}</span>
                            {item.offerPrice && (
                              <span className="ml-1 text-xs text-gray-500 line-through">₹{item.price.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 border border-gray-300 rounded-l"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-t border-b">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 border border-gray-300 rounded-r"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            ₹{((item.offerPrice || item.price) * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {showAddressForm && (
              <AddressForm onAddressSubmit={handleAddressSubmit} />
            )}
            
            {showPaymentOptions && (
              <div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                  <div className="border-l-4 border-brandGreen pl-4">
                    <p className="font-medium">{address.fullName}</p>
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                    <p>Phone: {address.phone}</p>
                  </div>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="mt-4 text-sm text-brandBlue hover:underline"
                  >
                    Change address
                  </button>
                </div>
                
                <PaymentOptions
                  total={cartTotal}
                  onPaymentComplete={handlePaymentComplete}
                />
              </div>
            )}
          </div>

          <div className={`${showPaymentOptions ? 'lg:w-1/2' : 'lg:w-1/3'}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                {cartTotal > 1000 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">- ₹50.00</span>
                  </div>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{(cartTotal > 1000 ? cartTotal - 50 : cartTotal).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                </div>
              </div>
              
              {!showAddressForm && !showPaymentOptions && (
                <div className="space-y-3">
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-brandGreen text-white py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={handleContinueShopping}
                    className="w-full bg-gray-100 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
              
              {showAddressForm && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Your Items:</h3>
                  <ul className="space-y-2">
                    {cart.map(item => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{((item.offerPrice || item.price) * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {!showAddressForm && !showPaymentOptions && (
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium mb-3">Have a promo code?</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-brandGreen focus:border-brandGreen"
                  />
                  <button className="bg-brandGreen text-white px-4 py-2 rounded-r-md hover:opacity-90 transition-opacity">
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
