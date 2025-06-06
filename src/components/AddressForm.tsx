
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressFormProps {
  onSave: (address: AddressData) => void;
  initialAddress?: AddressData | null;
  buttonText?: string;
}

interface AddressData {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ 
  onSave, 
  initialAddress = null, 
  buttonText = "Save Address" 
}) => {
  const [address, setAddress] = useState<AddressData>(initialAddress || {
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </Label>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
          required
          className="w-full"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <Label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </Label>
        <Input
          type="text"
          id="streetAddress"
          name="streetAddress"
          value={address.streetAddress}
          onChange={handleChange}
          required
          className="w-full"
          placeholder="Enter your street address"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="Enter your city"
          />
        </div>

        <div>
          <Label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </Label>
          <Input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="Enter your state"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </Label>
          <Input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="Enter postal code"
          />
        </div>

        <div>
          <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </Label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={address.phoneNumber}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full py-3 bg-brandGreen text-white font-medium rounded-md hover:opacity-90 transition-opacity"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default AddressForm;
