
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('seller'); // 'seller' or 'buyer'
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password, activeTab);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 container mx-auto px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>
      
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        {/* Login Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'seller' ? 'tab-active' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('seller')}
          >
            Seller Login
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'buyer' ? 'tab-active' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('buyer')}
          >
            Buyer Login
          </button>
        </div>
        
        <form onSubmit={handleLogin}>
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
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
              required
            />
            <div className="mt-1 text-right">
              <Link to="/forgot-password" className="text-brandBlue text-sm">
                Forgot password?
              </Link>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#3a5a9b] text-white py-3 rounded-md font-medium ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            } transition-opacity`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="mt-6 text-center">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="text-brandBlue">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
