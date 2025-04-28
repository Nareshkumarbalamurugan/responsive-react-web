
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
  const { totalPrice, clearCart } = useCart();
  const returnTo = location.state?.from || '/cart';

  const handlePaymentComplete = () => {
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="p-2 mr-2"
            onClick={() => navigate(returnTo)}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Payment</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Order Total</h2>
            <p className="text-2xl font-bold text-brandGreen">₹{totalPrice.toFixed(2)}</p>
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
