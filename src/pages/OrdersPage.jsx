
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Mock order data
const mockOrders = [
  {
    id: 'ORD12345678',
    date: '2023-12-15T10:30:00',
    status: 'delivered',
    total: 2499,
    paymentMethod: 'UPI',
    items: [
      { 
        id: 1, 
        name: 'Organic Bananas', 
        price: 299, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&auto=format&fit=crop' 
      },
      { 
        id: 3, 
        name: 'Whole Milk', 
        price: 249, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop' 
      },
      { 
        id: 5, 
        name: 'Sourdough Bread', 
        price: 359, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop' 
      },
      { 
        id: 8, 
        name: 'Chocolate Chip Cookies', 
        price: 399, 
        quantity: 3, 
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop' 
      }
    ],
    address: '123 Main Street, Mumbai, Maharashtra, 400001',
    trackingId: 'TRK987654321',
    invoice: 'INV-12345'
  },
  {
    id: 'ORD87654321',
    date: '2023-11-28T14:45:00',
    status: 'shipped',
    total: 1347,
    paymentMethod: 'Card',
    items: [
      { 
        id: 7, 
        name: 'Avocados (3 pack)', 
        price: 549, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop' 
      },
      { 
        id: 6, 
        name: 'Orange Juice', 
        price: 289, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&auto=format&fit=crop' 
      },
      { 
        id: 4, 
        name: 'Brown Eggs (12 pack)', 
        price: 449, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&auto=format&fit=crop' 
      }
    ],
    address: '123 Main Street, Mumbai, Maharashtra, 400001',
    trackingId: 'TRK123456789',
    invoice: 'INV-67890'
  },
  {
    id: 'ORD56789012',
    date: '2023-10-10T09:15:00',
    status: 'cancelled',
    total: 3245,
    paymentMethod: 'UPI',
    items: [
      { 
        id: 9, 
        name: 'Natural Honey', 
        price: 599, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&auto=format&fit=crop' 
      },
      { 
        id: 10, 
        name: 'Basmati Rice (5kg)', 
        price: 799, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e8cf?w=800&auto=format&fit=crop' 
      },
      { 
        id: 13, 
        name: 'Fresh Paneer', 
        price: 199, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=800&auto=format&fit=crop' 
      },
      { 
        id: 15, 
        name: 'Organic Almonds (500g)', 
        price: 899, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1563293740-7f8574c61f3f?w=800&auto=format&fit=crop' 
      }
    ],
    address: '456 Park Avenue, Delhi, 110001',
    cancellationReason: 'Changed my mind about the products'
  },
  {
    id: 'ORD34567890',
    date: '2023-09-05T16:20:00',
    status: 'delivered',
    total: 1598,
    paymentMethod: 'Card',
    items: [
      { 
        id: 12, 
        name: 'Masala Chai Tea', 
        price: 249, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop' 
      },
      { 
        id: 16, 
        name: 'Garlic Naan Bread', 
        price: 179, 
        quantity: 3, 
        image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?w=800&auto=format&fit=crop' 
      },
      { 
        id: 11, 
        name: 'Organic Spinach', 
        price: 179, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop' 
      }
    ],
    address: '456 Park Avenue, Delhi, 110001',
    trackingId: 'TRK567890123',
    invoice: 'INV-34567'
  }
];

const OrdersPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // If not logged in, redirect to login
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      // Simulate loading orders
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 800);
    }
  }, [currentUser, navigate]);
  
  // Filter orders
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);
  
  // View order details
  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
  };
  
  // Close order details modal
  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };
  
  // Get status badge style
  const getStatusBadge = (status) => {
    switch(status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Orders</h1>
          
          {/* Order filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button 
              className={`px-4 py-2 rounded-full ${
                filter === 'all' ? 'bg-brandGreen text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setFilter('all')}
            >
              All Orders
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${
                filter === 'delivered' ? 'bg-brandGreen text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setFilter('delivered')}
            >
              Delivered
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${
                filter === 'shipped' ? 'bg-brandGreen text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setFilter('shipped')}
            >
              Shipped
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${
                filter === 'processing' ? 'bg-brandGreen text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setFilter('processing')}
            >
              Processing
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${
                filter === 'cancelled' ? 'bg-brandGreen text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setFilter('cancelled')}
            >
              Cancelled
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block w-8 h-8 border-4 border-brandGreen border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading your orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="mt-4 text-xl font-medium text-gray-900">No orders found</h2>
              <p className="mt-2 text-gray-500">
                {filter === 'all' 
                  ? 'You have not placed any orders yet.' 
                  : `You have no ${filter} orders.`}
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-block px-6 py-2 bg-brandGreen text-white rounded-md hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Order Placed:</p>
                        <p className="font-medium">
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500 text-sm">Order ID:</p>
                        <p className="font-medium">{order.id}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500 text-sm">Total:</p>
                        <p className="font-medium">₹{order.total.toFixed(2)}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500 text-sm">Status:</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4">
                      {order.items.slice(0, 3).map(item => (
                        <div key={item.id} className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="ml-3">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      
                      {order.items.length > 3 && (
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                            <p className="text-gray-500 text-sm">+{order.items.length - 3} more</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        className="px-4 py-2 bg-brandGreen text-white rounded-md hover:opacity-90 transition-opacity"
                        onClick={() => handleViewOrderDetails(order)}
                      >
                        View Details
                      </button>
                      
                      {order.invoice && (
                        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                          Download Invoice
                        </button>
                      )}
                      
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                          Write Review
                        </button>
                      )}
                      
                      {order.trackingId && (
                        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                          Track Package
                        </button>
                      )}
                      
                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Order Details</h2>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleCloseOrderDetails}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Order Information</h3>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-500">Order ID:</span>
                          <p className="font-medium">{selectedOrder.id}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Date:</span>
                          <p className="font-medium">
                            {new Date(selectedOrder.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <p>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedOrder.status)}`}>
                              {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                            </span>
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Payment Method:</span>
                          <p className="font-medium">{selectedOrder.paymentMethod}</p>
                        </div>
                        {selectedOrder.trackingId && (
                          <div>
                            <span className="text-gray-500">Tracking ID:</span>
                            <p className="font-medium">{selectedOrder.trackingId}</p>
                          </div>
                        )}
                        {selectedOrder.cancellationReason && (
                          <div>
                            <span className="text-gray-500">Cancellation Reason:</span>
                            <p className="font-medium">{selectedOrder.cancellationReason}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Delivery Address</h3>
                      <p className="whitespace-pre-wrap">{selectedOrder.address}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4">Order Items</h3>
                  <div className="border rounded-lg overflow-hidden mb-6">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.items.map(item => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-12 w-12 object-cover rounded-md"
                                />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ₹{item.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="w-full max-w-xs">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>₹{selectedOrder.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Shipping:</span>
                        <span>{selectedOrder.total > 500 ? 'Free' : '₹40.00'}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">GST (18%):</span>
                        <span>₹{(selectedOrder.total * 0.18).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-t font-bold">
                        <span>Grand Total:</span>
                        <span>₹{(selectedOrder.total + (selectedOrder.total > 500 ? 0 : 40) + (selectedOrder.total * 0.18)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      onClick={handleCloseOrderDetails}
                    >
                      Close
                    </button>
                    
                    {selectedOrder.invoice && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Download Invoice
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
