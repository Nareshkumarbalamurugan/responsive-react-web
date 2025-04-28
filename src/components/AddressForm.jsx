
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddressForm = ({ onSave, initialAddress = null, buttonText = "Save Address" }) => {
  const [address, setAddress] = useState(initialAddress || {
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <Input
          type="text"
          id="streetAddress"
          name="streetAddress"
          value={address.streetAddress}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <Input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <Input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={address.phoneNumber}
            onChange={handleChange}
            required
            className="w-full"
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
