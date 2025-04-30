
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const PaymentOptions = ({ total, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      
      if (onPaymentComplete) {
        onPaymentComplete();
      }
    }, 2000);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        
        <div className="space-y-4">
          {/* Cash on Delivery Option */}
          <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
            <input 
              type="radio" 
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="mr-2"
            />
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-gray-600">Pay when your order arrives</p>
            </div>
          </label>
          
          {/* UPI/QR Code Option */}
          <label className="flex items-start p-4 border rounded-md cursor-pointer hover:bg-gray-50">
            <input 
              type="radio" 
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={() => setPaymentMethod('upi')}
              className="mr-2 mt-1"
            />
            <div className="flex-grow">
              <p className="font-medium">UPI / QR Payment</p>
              <p className="text-sm text-gray-600 mb-3">Pay using UPI apps like Google Pay, PhonePe, Paytm</p>
              
              {paymentMethod === 'upi' && (
                <div className="flex flex-col items-center">
                  <div className="border border-gray-200 p-2 rounded-md bg-white mb-3">
                    <img 
                      src="/lovable-uploads/ec342845-03c9-417a-ad11-418f0296f4c9.png" 
                      alt="QR Code for Payment" 
                      className="h-48 w-48 object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Scan with any UPI app to pay ₹{total.toFixed(2)}</p>
                </div>
              )}
            </div>
          </label>
          
          {/* Card Payment Option */}
          <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
            <input 
              type="radio" 
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className="mr-2"
            />
            <div>
              <p className="font-medium">Credit / Debit Card</p>
              <p className="text-sm text-gray-600">All major cards accepted</p>
            </div>
          </label>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-3 rounded-md font-medium text-white ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-brandGreen hover:opacity-90 transition-opacity'
            }`}
          >
            {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentOptions;
