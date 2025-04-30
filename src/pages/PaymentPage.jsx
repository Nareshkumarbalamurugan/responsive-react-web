
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import PaymentOptions from '../components/PaymentOptions';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice, clearCart, cartItems, appliedCoupon } = useCart();
  const returnTo = location.state?.from || '/cart';

  // Calculate the order subtotal without discounts
  const subtotal = cartItems?.reduce((total, item) => {
    return total + (item.offerPrice || item.price) * item.quantity;
  }, 0) || 0;
  
  // Calculate discount amount if a coupon is applied
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = subtotal * appliedCoupon.discount;
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.discount;
    }
  }
  
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const tax = (subtotal - discountAmount) * 0.05; // 5% tax on discounted amount

  const handlePaymentComplete = () => {
    toast.success('Order placed successfully!');
    clearCart();
    
    // Scroll to top before navigating
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    navigate('/');
  };

  // Handle navigation with scroll to top
  const handleNavigate = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    navigate(returnTo);
  };

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="p-2 mr-2"
            onClick={handleNavigate}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Payment</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount {appliedCoupon.code}</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Charge</span>
                {deliveryCharge > 0 ? (
                  <span>₹{deliveryCharge.toFixed(2)}</span>
                ) : (
                  <span className="text-green-600">Free</span>
                )}
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-xl font-bold text-brandGreen">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <PaymentOptions 
            total={totalPrice} 
            onPaymentComplete={handlePaymentComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
