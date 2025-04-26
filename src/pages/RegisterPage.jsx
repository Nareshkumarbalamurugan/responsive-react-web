
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Seller specific fields
  const [businessName, setBusinessName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [sellerType, setSellerType] = useState('individual');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    bankName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('seller');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Phone validation
    if (phone && !/^\+?[0-9]{10,15}$/.test(phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Seller specific validations
    if (activeTab === 'seller') {
      if (!businessName) {
        newErrors.businessName = 'Business name is required';
      }
      
      if (!gstNumber) {
        newErrors.gstNumber = 'GST number is required';
      } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber)) {
        newErrors.gstNumber = 'Please enter a valid GST number';
      }
      
      if (!bankDetails.accountNumber) {
        newErrors.accountNumber = 'Account number is required';
      }
      
      if (!bankDetails.ifscCode) {
        newErrors.ifscCode = 'IFSC code is required';
      } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankDetails.ifscCode)) {
        newErrors.ifscCode = 'Please enter a valid IFSC code';
      }
      
      if (!bankDetails.bankName) {
        newErrors.bankName = 'Bank name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      const userData = {
        name,
        phone,
        address
      };
      
      if (activeTab === 'seller') {
        Object.assign(userData, {
          businessName,
          gstNumber,
          sellerType,
          accountNumber: bankDetails.accountNumber,
          ifscCode: bankDetails.ifscCode,
          bankName: bankDetails.bankName
        });
      }
      
      await register(email, password, activeTab, userData);
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="py-12 container mx-auto px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Register</h1>
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        {/* Register Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'seller' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('seller')}
          >
            Register as Seller
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'buyer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('buyer')}
          >
            Register as Buyer
          </button>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">{activeTab === 'seller' ? 'Business Information' : 'Personal Information'}</h2>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Full Name*</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email Address*</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className={`w-full border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Seller Specific Fields */}
            {activeTab === 'seller' && (
              <>
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4 mt-4">Business Details</h2>
                </div>
                
                <div>
                  <label htmlFor="businessName" className="block text-gray-700 mb-2">Business Name*</label>
                  <input
                    id="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className={`w-full border ${
                      errors.businessName ? 'border-red-500' : 'border-gray-300'
                    } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="gstNumber" className="block text-gray-700 mb-2">GST Number*</label>
                  <input
                    id="gstNumber"
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    placeholder="22AAAAA0000A1Z5"
                    className={`w-full border ${
                      errors.gstNumber ? 'border-red-500' : 'border-gray-300'
                    } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.gstNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.gstNumber}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="sellerType" className="block text-gray-700 mb-2">Seller Type</label>
                  <select
                    id="sellerType"
                    value={sellerType}
                    onChange={(e) => setSellerType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                    <option value="manufacturer">Manufacturer</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4 mt-4">Bank Details</h2>
                </div>
                
                <div>
                  <label htmlFor="accountNumber" className="block text-gray-700 mb-2">Account Number*</label>
                  <input
                    id="accountNumber"
                    type="text"
                    name="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={handleBankDetailsChange}
                    className={`w-full border ${
                      errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                    } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="ifscCode" className="block text-gray-700 mb-2">IFSC Code*</label>
                  <input
                    id="ifscCode"
                    type="text"
                    name="ifscCode"
                    value={bankDetails.ifscCode}
                    onChange={handleBankDetailsChange}
                    className={`w-full border ${
                      errors.ifscCode ? 'border-red-500' : 'border-gray-300'
                    } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.ifscCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="bankName" className="block text-gray-700 mb-2">Bank Name*</label>
                  <input
                    id="bankName"
                    type="text"
                    name="bankName"
                    value={bankDetails.bankName}
                    onChange={handleBankDetailsChange}
                    className={`w-full border ${
                      errors.bankName ? 'border-red-500' : 'border-gray-300'
                    } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.bankName && (
                    <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
                  )}
                </div>
              </>
            )}
            
            {/* Security Section */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-4">Security</h2>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">Password*</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                Confirm Password*
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            {activeTab === 'seller' && (
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  By registering as a seller, you agree to our seller terms and conditions.
                  You will be able to list your products after your account is verified.
                </p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 rounded-md font-medium ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              } transition-colors`}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
            
            <div className="mt-6 text-center">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
