
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

// Mock product data
const products = [
  {
    id: 1,
    name: 'Organic Bananas',
    price: 2.99,
    image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
    category: 'fruits-vegetables',
    seller: {
      id: 101,
      name: 'Fresh Farms',
      rating: 4.8
    }
  },
  {
    id: 2,
    name: 'Fresh Tomatoes',
    price: 3.49,
    image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
    category: 'fruits-vegetables',
    seller: {
      id: 102,
      name: 'Organic Growers',
      rating: 4.5
    }
  },
  {
    id: 3,
    name: 'Whole Milk',
    price: 2.79,
    image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
    category: 'dairy',
    seller: {
      id: 103,
      name: 'Dairy Delights',
      rating: 4.7
    }
  },
  {
    id: 4,
    name: 'Brown Eggs (12 pack)',
    price: 4.99,
    image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
    category: 'dairy',
    seller: {
      id: 103,
      name: 'Dairy Delights',
      rating: 4.7
    }
  },
  {
    id: 5,
    name: 'Sourdough Bread',
    price: 3.99,
    image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
    category: 'bakery',
    seller: {
      id: 104,
      name: 'Artisan Bakers',
      rating: 4.9
    }
  },
  {
    id: 6,
    name: 'Orange Juice',
    price: 3.29,
    image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
    category: 'beverages',
    seller: {
      id: 105,
      name: 'Fresh Squeezed Co.',
      rating: 4.6
    }
  },
  {
    id: 7,
    name: 'Avocados (3 pack)',
    price: 5.99,
    image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
    category: 'fruits-vegetables',
    seller: {
      id: 101,
      name: 'Fresh Farms',
      rating: 4.8
    }
  },
  {
    id: 8,
    name: 'Chocolate Chip Cookies',
    price: 4.49,
    image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
    category: 'bakery',
    seller: {
      id: 104,
      name: 'Artisan Bakers',
      rating: 4.9
    }
  }
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  
  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Categories for filter
  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'fruits-vegetables', label: 'Fruits & Vegetables' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'bakery', label: 'Bakery & Snacks' },
    { value: 'beverages', label: 'Beverages' }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Shop</h1>
        
        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category.value
                    ? 'bg-brandGreen text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">In Stock</span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Seller: {product.seller.name}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {Array(5).fill().map((_, i) => (
                        <svg 
                          key={i} 
                          className="w-4 h-4" 
                          fill={i < Math.floor(product.seller.rating) ? "currentColor" : "none"} 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-500">{product.seller.rating}</span>
                  </div>
                </div>
                <button 
                  className="w-full bg-brandGreen text-white py-2 rounded-md hover:opacity-90 transition-opacity"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
