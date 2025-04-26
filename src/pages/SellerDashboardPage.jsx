
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SellerDashboardPage = () => {
  const { currentUser, userType } = useAuth();
  const navigate = useNavigate();
  
  // Redirect non-sellers to home page
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (userType !== 'seller') {
      navigate('/');
    }
  }, [currentUser, userType, navigate]);
  
  if (!currentUser || userType !== 'seller') {
    return null;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
        
        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-1">Total Products</h3>
            <p className="text-3xl font-bold">24</p>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+2 new</span>
              <span className="text-gray-500 ml-2">since last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-1">Total Orders</h3>
            <p className="text-3xl font-bold">108</p>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+15%</span>
              <span className="text-gray-500 ml-2">since last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-1">Monthly Revenue</h3>
            <p className="text-3xl font-bold">₹56,789</p>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+8%</span>
              <span className="text-gray-500 ml-2">since last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-1">Avg. Rating</h3>
            <p className="text-3xl font-bold">4.8</p>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+0.2</span>
              <span className="text-gray-500 ml-2">since last month</span>
            </div>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <button className="text-brandGreen hover:underline">View All Orders</button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 'ORD39485', customer: 'Rahul Sharma', date: '2023-12-18', total: 1249, status: 'Processing' },
                  { id: 'ORD38941', customer: 'Priya Patel', date: '2023-12-17', total: 2345, status: 'Shipped' },
                  { id: 'ORD38790', customer: 'Ankit Gupta', date: '2023-12-16', total: 3499, status: 'Delivered' },
                  { id: 'ORD38523', customer: 'Neha Singh', date: '2023-12-15', total: 749, status: 'Processing' },
                  { id: 'ORD38217', customer: 'Vikram Mehta', date: '2023-12-14', total: 1899, status: 'Shipped' }
                ].map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-brandGreen hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Top Selling Products */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Top Selling Products</h2>
            <button className="text-brandGreen hover:underline">View All Products</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { 
                id: 1, 
                name: 'Organic Bananas', 
                price: 299, 
                sold: 342, 
                image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&auto=format&fit=crop',
                stock: 128
              },
              { 
                id: 3, 
                name: 'Whole Milk', 
                price: 249, 
                sold: 289, 
                image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop',
                stock: 56
              },
              { 
                id: 8, 
                name: 'Chocolate Chip Cookies', 
                price: 399, 
                sold: 256, 
                image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop',
                stock: 87
              },
              { 
                id: 5, 
                name: 'Sourdough Bread', 
                price: 359, 
                sold: 198, 
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
                stock: 35
              }
            ].map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">₹{product.price.toFixed(2)}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Units Sold</span>
                      <span className="text-sm font-medium">{product.sold}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">In Stock</span>
                      <span className="text-sm font-medium">{product.stock}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-brandGreen text-white py-2 rounded-md text-sm hover:opacity-90 transition-opacity">
                      Edit
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors">
                      Manage Stock
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <svg className="w-6 h-6 mx-auto text-brandGreen mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium">Add New Product</span>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <svg className="w-6 h-6 mx-auto text-brandGreen mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm font-medium">Manage Orders</span>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <svg className="w-6 h-6 mx-auto text-brandGreen mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium">View Analytics</span>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <svg className="w-6 h-6 mx-auto text-brandGreen mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">Account Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage;
