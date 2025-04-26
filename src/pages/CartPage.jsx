
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { QrCode } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, applyOffer, removeOffer, applyCoupon, appliedOffers, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [showQrCode, setShowQrCode] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: '',
    state: '',
    pincode: '',
    saveAddress: true
  });

  const navigate = useNavigate();
  
  // Fill address with user data if available
  useEffect(() => {
    if (currentUser) {
      setDeliveryAddress(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        phone: currentUser.phone || prev.phone,
        address: currentUser.address || prev.address
      }));
    }
  }, [currentUser]);
  
  // Offer details for products
  const availableOffers = {
    1: [
      { code: 'FRESH10', discount: '10%', price: 269.1 },  // ₹299 - 10%
      { code: 'COMBO20', discount: '₹50 off', price: 249 }
    ],
    2: [
      { code: 'VEGGIE15', discount: '15%', price: 266.9 }, // ₹314 - 15%
      { code: 'BULK25', discount: '₹75 off', price: 239 }
    ],
    3: [
      { code: 'DAIRY10', discount: '10%', price: 224.1 },  // ₹249 - 10%
      { code: 'FRESH20', discount: '₹50 off', price: 199 }
    ],
  };
  
  const handleApplyOffer = (productId, offerPrice, offerCode) => {
    applyOffer(productId, offerPrice, offerCode);
    toast.success(`Offer code ${offerCode} applied successfully!`);
  };
  
  const handleRemoveOffer = (productId) => {
    removeOffer(productId);
    toast.info('Offer removed');
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error('Please enter a coupon code');
      return;
    }
    
    const success = applyCoupon(couponCode);
    if (success) {
      toast.success(`Coupon ${couponCode} applied successfully!`);
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code');
    }
  };
  
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDeliveryAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleProceedToCheckout = () => {
    if (!currentUser) {
      toast.error('Please login to proceed to checkout');
      navigate('/login');
      return;
    }
    
    const { name, phone, address, city, state, pincode } = deliveryAddress;
    
    if (!name || !phone || !address || !city || !state || !pincode) {
      toast.error('Please fill all address fields');
      return;
    }
    
    setShowPaymentOptions(true);
  };
  
  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePayment = () => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      toast.success('Payment successful! Your order has been placed.');
      
      // Save address if option is checked
      if (deliveryAddress.saveAddress && currentUser) {
        // Update user's address in real app
      }
      
      // Clear cart after successful payment
      clearCart();
      
      // Redirect to a thank you page
      navigate('/orders');
    }, 2000);
  };
  
  const toggleQrCode = () => {
    setShowQrCode(!showQrCode);
  };
  
  // Check if an offer is applied to a product
  const isOfferApplied = (productId) => {
    return appliedOffers.some(offer => offer.productId === productId);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-16 container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-medium mt-4 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/shop" 
            className="bg-brandGreen text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 container mx-auto px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        {!showPaymentOptions && (
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 p-4 md:p-6 flex flex-col sm:flex-row">
                  <div className="sm:w-28 sm:h-28 mb-4 sm:mb-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="sm:ml-6 flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Seller: {item.seller?.name || 'Unknown Seller'}</p>
                    
                    {/* Price display with offer */}
                    <div className="mb-3">
                      {item.offerPrice ? (
                        <div className="flex flex-wrap items-center">
                          <span className="text-lg font-bold text-green-600">₹{item.offerPrice.toFixed(2)}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">₹{item.price.toFixed(2)}</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 ml-2 rounded">
                            {item.offerCode}
                          </span>
                          <button 
                            onClick={() => handleRemoveOffer(item.id)}
                            className="text-xs text-red-500 ml-2 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span className="text-lg font-bold">₹{item.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    {/* Available offers dropdown */}
                    {availableOffers[item.id] && !isOfferApplied(item.id) && (
                      <div className="mb-3">
                        <details className="text-sm">
                          <summary className="text-blue-600 cursor-pointer font-medium">
                            {availableOffers[item.id].length} Available Offers
                          </summary>
                          <ul className="mt-2 pl-4 space-y-1">
                            {availableOffers[item.id].map((offer, idx) => (
                              <li key={idx} className="flex justify-between items-center">
                                <span className="text-gray-700">
                                  <span className="text-green-600">{offer.code}</span>: {offer.discount} off
                                </span>
                                <button 
                                  onClick={() => handleApplyOffer(item.id, offer.price, offer.code)}
                                  className="text-blue-600 hover:underline text-sm px-2 py-1"
                                >
                                  Apply
                                </button>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap justify-between items-center mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md mb-2 sm:mb-0">
                        <button 
                          className="px-3 py-1 border-r border-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 border-l border-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="text-lg font-bold">
                        ₹{((item.offerPrice || item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showPaymentOptions ? (
          /* Delivery Address and Payment Form */
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-medium mb-6">Delivery Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={deliveryAddress.name}
                    onChange={handleAddressChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={deliveryAddress.phone}
                    onChange={handleAddressChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={deliveryAddress.address}
                    onChange={handleAddressChange}
                    rows="2"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryAddress.city}
                    onChange={handleAddressChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={deliveryAddress.state}
                    onChange={handleAddressChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={deliveryAddress.pincode}
                    onChange={handleAddressChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="saveAddress"
                    checked={deliveryAddress.saveAddress}
                    onChange={handleAddressChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Save this address for future orders</span>
                </label>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-2xl font-medium mb-6">Payment Options</h2>
              
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row mb-4">
                  <label className="flex-1 flex items-center mb-2 sm:mb-0">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="upi" 
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mr-2" 
                    />
                    UPI Payment
                  </label>
                  <label className="flex-1 flex items-center mb-2 sm:mb-0">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card" 
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mr-2" 
                    />
                    Card Payment
                  </label>
                  <label className="flex-1 flex items-center">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mr-2" 
                    />
                    Cash on Delivery
                  </label>
                </div>
                
                {paymentMethod === 'upi' && (
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                          UPI ID
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="name@upi"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Popular UPI Options: Paytm, Google Pay, PhonePe, etc.</p>
                      </div>
                      
                      <button 
                        onClick={toggleQrCode}
                        className="bg-brandGreen text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-opacity-90"
                      >
                        <QrCode size={18} />
                        <span>Scan QR</span>
                      </button>
                    </div>
                    
                    {showQrCode && (
                      <div className="flex flex-col items-center border rounded-md p-4 bg-white">
                        <div className="bg-white p-3 rounded-lg border">
                          <img 
                            src="https://images.unsplash.com/photo-1572707691716-5749311607ae?w=200&auto=format&fit=crop" 
                            alt="QR Code" 
                            className="w-48 h-48 object-contain"
                          />
                        </div>
                        <p className="mt-3 font-medium">Scan with any UPI app to pay</p>
                        <p className="text-sm text-gray-500">Amount: ₹{(totalPrice + (totalPrice > 500 ? 0 : 40) + (totalPrice * 0.18)).toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {paymentMethod === 'card' && (
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1 text-sm">Card Number</label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardDetailsChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1 text-sm">Name on Card</label>
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardDetailsChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex gap-3 mb-3">
                      <div className="flex-1">
                        <label className="block text-gray-700 mb-1 text-sm">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardDetailsChange}
                          placeholder="MM/YY"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="w-24">
                        <label className="block text-gray-700 mb-1 text-sm">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardDetailsChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'cod' && (
                  <div className="border rounded-md p-4 bg-gray-50">
                    <p className="text-sm">A convenience fee of ₹40 will be applied for Cash on Delivery orders.</p>
                    <div className="flex items-center mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <svg className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-yellow-700">
                        Please keep exact change ready at the time of delivery.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{(totalPrice + (totalPrice > 500 ? 0 : 40) + (totalPrice * 0.18) + (paymentMethod === 'cod' ? 40 : 0)).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  className="w-1/2 bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
                  onClick={() => setShowPaymentOptions(false)}
                >
                  Back
                </button>
                <button 
                  className="w-1/2 bg-brandGreen text-white py-3 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={handlePayment}
                  disabled={processingPayment || 
                    (paymentMethod === 'upi' && !upiId && !showQrCode) || 
                    (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv))}
                >
                  {processingPayment ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Order Summary */
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-2xl font-medium mb-6">Order Summary</h2>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>{totalPrice > 500 ? 'Free' : '₹40.00'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">
                    ₹{(totalPrice + (totalPrice > 500 ? 0 : 40) + (totalPrice * 0.18)).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Free shipping on orders above ₹500
                </p>
              </div>
              
              <button 
                className="w-full bg-brandGreen text-white py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
            
            <div className="mt-4 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Have a coupon?</h3>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Enter coupon code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border border-gray-300 rounded-l-md px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-brandGreen"
                />
                <button 
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md hover:bg-gray-300 transition-colors"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
              
              <div className="mt-4 text-sm">
                <p className="font-medium mb-2">Available coupons:</p>
                <ul className="pl-4 space-y-1 text-gray-600">
                  <li>WELCOME10 - 10% off on your first order</li>
                  <li>FLAT100 - ₹100 off on orders above ₹1000</li>
                  <li>SUMMER20 - 20% off on orders above ₹1500</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
