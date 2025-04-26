
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('seller'); // 'seller' or 'buyer'
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      await register(email, password, activeTab);
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 container mx-auto px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Register</h1>
      
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        {/* Register Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'seller' ? 'tab-active' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('seller')}
          >
            Register as Seller
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'buyer' ? 'tab-active' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('buyer')}
          >
            Register as Buyer
          </button>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
              required
            />
          </div>
          
          {activeTab === 'seller' && (
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                By registering as a seller, you agree to our seller terms and conditions.
                You will be able to list your products after your account is verified.
              </p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#3a5a9b] text-white py-3 rounded-md font-medium ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            } transition-opacity`}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
          
          <div className="mt-6 text-center">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-brandBlue">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
