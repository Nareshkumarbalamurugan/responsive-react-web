
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { currentUser, updateProfile, logout, userType } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    bio: currentUser?.profile?.bio || ''
  });
  const [loading, setLoading] = useState(false);
  
  // If not logged in, redirect to login
  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateProfile({
        ...profileData,
        profile: {
          ...currentUser.profile,
          bio: profileData.bio
        }
      });
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-6 text-white">
              <div className="flex flex-col sm:flex-row items-center">
                <img
                  src={currentUser.profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=random`}
                  alt={currentUser.name}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop"; }}
                />
                <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                  <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                  <p className="text-white text-opacity-90 break-all">{currentUser.email}</p>
                  <p className="mt-1 bg-white bg-opacity-20 inline-block px-3 py-1 rounded-full text-sm capitalize">
                    {userType} Account
                  </p>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSaveProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed truncate"
                      />
                      <p className="text-gray-500 text-sm mt-1">Email cannot be changed</p>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={profileData.address}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-gray-700 mb-2">Bio</label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows="4"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-6 py-2 bg-brandGreen text-white rounded-md ${
                        loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                      }`}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-gray-500 text-sm">Full Name</h3>
                      <p className="font-medium">{currentUser.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 text-sm">Email</h3>
                      <p className="font-medium break-words">{currentUser.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 text-sm">Phone</h3>
                      <p className="font-medium">{currentUser.phone || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 text-sm">Member Since</h3>
                      <p className="font-medium">
                        {new Date(currentUser.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-gray-500 text-sm">Address</h3>
                      <p className="font-medium">{currentUser.address || 'No address added'}</p>
                    </div>
                    
                    {userType === 'seller' && (
                      <>
                        <div>
                          <h3 className="text-gray-500 text-sm">Business Name</h3>
                          <p className="font-medium">{currentUser.businessName || 'Not provided'}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-gray-500 text-sm">GST Number</h3>
                          <p className="font-medium">{currentUser.gstNumber || 'Not provided'}</p>
                        </div>
                      </>
                    )}
                    
                    <div className="md:col-span-2">
                      <h3 className="text-gray-500 text-sm">Bio</h3>
                      <p>{currentUser.profile?.bio || 'No bio added'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-brandGreen text-white rounded-md hover:opacity-90"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-2 bg-red-500 text-white rounded-md hover:opacity-90"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Account Activity Section */}
          <div className="mt-10 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Account Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h3 className="font-medium">Last Login</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(currentUser.profile?.lastLogin || new Date()).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  Successful
                </span>
              </div>
              
              {userType === 'buyer' ? (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Orders Placed</h3>
                    <p className="text-gray-600 text-sm">View your purchase history</p>
                  </div>
                  <button 
                    onClick={() => navigate('/orders')}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    View Orders
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Seller Dashboard</h3>
                    <p className="text-gray-600 text-sm">Manage your products and orders</p>
                  </div>
                  <button 
                    onClick={() => navigate('/seller-dashboard')}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Preferences Section */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-gray-600 text-sm">Receive updates about your orders and products</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={currentUser.profile?.preferences?.notifications} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Newsletter</h3>
                  <p className="text-gray-600 text-sm">Receive marketing emails with deals and offers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={currentUser.profile?.preferences?.newsletter} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Danger Zone</h2>
            <p className="text-gray-600 mb-4">These actions are irreversible. Please proceed with caution.</p>
            <div className="space-y-4">
              <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors">
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
