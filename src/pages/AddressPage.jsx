
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import AddressForm from '../components/AddressForm';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const AddressPage = () => {
  const [userAddress, setUserAddress] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.from || '/cart';

  // Load saved address from local storage
  useEffect(() => {
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

  const handleSaveAddress = (address) => {
    setUserAddress(address);
    // Save to local storage
    if (currentUser) {
      localStorage.setItem(`userAddress_${currentUser.id}`, JSON.stringify(address));
    }
    toast.success('Address saved successfully!');
    navigate(returnTo);
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
          <h1 className="text-2xl md:text-3xl font-bold">Delivery Address</h1>
        </div>

        {userAddress && (
          <div className="border border-gray-200 rounded-md p-4 mb-6">
            <h2 className="font-semibold mb-2">Current Address</h2>
            <div className="text-sm">
              <p className="font-medium">{userAddress.fullName}</p>
              <p>{userAddress.streetAddress}</p>
              <p>{userAddress.city}, {userAddress.state} {userAddress.postalCode}</p>
              <p>Phone: {userAddress.phoneNumber}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setUserAddress(null)}
              >
                Edit Address
              </Button>
            </div>
          </div>
        )}

        {!userAddress && (
          <>
            <p className="mb-6 text-gray-600">
              Please enter your delivery address to continue.
            </p>
            <AddressForm onSave={handleSaveAddress} buttonText="Continue to Payment" />
          </>
        )}
      </div>
    </div>
  );
};

export default AddressPage;
