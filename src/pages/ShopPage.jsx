
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

// Mock product data
const products = [
  {
    id: 1,
    name: 'Organic Bananas',
    price: 299,
    offerPrice: 269,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&auto=format&fit=crop',
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
    price: 314,
    offerPrice: 267,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop',
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
    price: 249,
    offerPrice: 224,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop',
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
    price: 449,
    offerPrice: 399,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&auto=format&fit=crop',
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
    price: 359,
    offerPrice: 299,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
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
    price: 289,
    offerPrice: 249,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&auto=format&fit=crop',
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
    price: 549,
    offerPrice: 499,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop',
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
    price: 399,
    offerPrice: 349,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop',
    category: 'bakery',
    seller: {
      id: 104,
      name: 'Artisan Bakers',
      rating: 4.9
    }
  },
  {
    id: 9,
    name: 'Natural Honey',
    price: 599,
    offerPrice: 549,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&auto=format&fit=crop',
    category: 'pantry',
    seller: {
      id: 106,
      name: 'Honey Haven',
      rating: 4.8
    }
  },
  {
    id: 10,
    name: 'Basmati Rice (5kg)',
    price: 799,
    offerPrice: 699,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8cf?w=800&auto=format&fit=crop',
    category: 'pantry',
    seller: {
      id: 107,
      name: 'Grain Goods',
      rating: 4.6
    }
  },
  {
    id: 11,
    name: 'Organic Spinach',
    price: 179,
    offerPrice: 149,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop',
    category: 'fruits-vegetables',
    seller: {
      id: 102,
      name: 'Organic Growers',
      rating: 4.5
    }
  },
  {
    id: 12,
    name: 'Masala Chai Tea',
    price: 249,
    offerPrice: 199,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop',
    category: 'beverages',
    seller: {
      id: 108,
      name: 'Tea Treasures',
      rating: 4.7
    }
  },
  {
    id: 13,
    name: 'Fresh Paneer',
    price: 199,
    offerPrice: 175,
    image: 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=800&auto=format&fit=crop',
    category: 'dairy',
    seller: {
      id: 103,
      name: 'Dairy Delights',
      rating: 4.7
    }
  },
  {
    id: 14,
    name: 'Coconut Water (Pack of 3)',
    price: 359,
    offerPrice: 325,
    image: 'https://images.unsplash.com/photo-1536304017280-239a7173b44e?w=800&auto=format&fit=crop',
    category: 'beverages',
    seller: {
      id: 105,
      name: 'Fresh Squeezed Co.',
      rating: 4.6
    }
  },
  {
    id: 15,
    name: 'Organic Almonds (500g)',
    price: 899,
    offerPrice: 799,
    image: 'https://images.unsplash.com/photo-1563293740-7f8574c61f3f?w=800&auto=format&fit=crop',
    category: 'pantry',
    seller: {
      id: 109,
      name: 'Nut Nation',
      rating: 4.9
    }
  },
  {
    id: 16,
    name: 'Garlic Naan Bread',
    price: 179,
    offerPrice: 149,
    image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?w=800&auto=format&fit=crop',
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
  const [sortBy, setSortBy] = useState('recommended');
  const { addToCart } = useCart();
  
  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return (a.offerPrice || a.price) - (b.offerPrice || b.price);
      case 'price-high':
        return (b.offerPrice || b.price) - (a.offerPrice || a.price);
      case 'rating':
        return b.seller.rating - a.seller.rating;
      case 'recommended':
      default:
        return 0; // keeps original order
    }
  });

  // Categories for filter
  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'fruits-vegetables', label: 'Fruits & Vegetables' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'bakery', label: 'Bakery & Snacks' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'pantry', label: 'Pantry Items' }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Shop</h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {/* Category Filter */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    className={`w-full text-left px-4 py-2 rounded-md ${
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
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Sort By</h2>
              <div className="space-y-2">
                <button
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    sortBy === 'recommended' ? 'bg-brandGreen text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setSortBy('recommended')}
                >
                  Recommended
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    sortBy === 'price-low' ? 'bg-brandGreen text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setSortBy('price-low')}
                >
                  Price: Low to High
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    sortBy === 'price-high' ? 'bg-brandGreen text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setSortBy('price-high')}
                >
                  Price: High to Low
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    sortBy === 'rating' ? 'bg-brandGreen text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setSortBy('rating')}
                >
                  Highest Rated
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-52 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-lg mb-2 hover:text-brandGreen transition-colors">{product.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        {product.offerPrice ? (
                          <div className="flex items-center">
                            <span className="text-lg font-bold text-brandGreen">₹{product.offerPrice.toFixed(2)}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">₹{product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                        )}
                      </div>
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
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-lg text-gray-600">No products found in this category.</p>
                <button
                  className="mt-4 px-6 py-2 bg-brandGreen text-white rounded-md hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedCategory('all')}
                >
                  Show All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
