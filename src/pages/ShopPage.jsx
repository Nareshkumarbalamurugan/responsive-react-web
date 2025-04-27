import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { Search, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';

// Mock product data with improved images
const products = [
  {
    id: 1,
    name: 'Organic Bananas',
    price: 299,
    offerPrice: 269,
    image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?w=800&auto=format&fit=crop',
    category: 'fruits-vegetables',
    seller: {
      id: 101,
      name: 'Fresh Farms',
      rating: 4.8
    },
    description: 'Fresh organic bananas sourced directly from farmers. Rich in potassium and naturally sweet.',
    stock: 50
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
    },
    description: 'Juicy red tomatoes, perfect for salads, curries and sauces.',
    stock: 35
  },
  {
    id: 3,
    name: 'Whole Milk',
    price: 249,
    offerPrice: 224,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop',
    category: 'dairy',
    seller: {
      id: 103,
      name: 'Dairy Delights',
      rating: 4.7
    },
    description: 'Farm-fresh whole milk, pasteurized and packed with essential nutrients.',
    stock: 25
  },
  {
    id: 4,
    name: 'Brown Eggs (12 pack)',
    price: 449,
    offerPrice: 399,
    image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=800&auto=format&fit=crop',
    category: 'dairy',
    seller: {
      id: 103,
      name: 'Dairy Delights',
      rating: 4.7
    },
    description: 'Free-range brown eggs from healthy, well-fed chickens.',
    stock: 30
  },
  {
    id: 5,
    name: 'Sourdough Bread',
    price: 359,
    offerPrice: 299,
    image: 'https://images.unsplash.com/photo-1586444248888-f140a5f2c1fb?w=800&auto=format&fit=crop',
    category: 'bakery',
    seller: {
      id: 104,
      name: 'Artisan Bakers',
      rating: 4.9
    },
    description: 'Traditional sourdough bread made with a century-old starter culture.',
    stock: 15
  },
  {
    id: 6,
    name: 'Orange Juice',
    price: 289,
    offerPrice: 249,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop',
    category: 'beverages',
    seller: {
      id: 105,
      name: 'Fresh Squeezed Co.',
      rating: 4.6
    },
    description: 'Freshly squeezed orange juice with no added sugar or preservatives.',
    stock: 40
  },
  {
    id: 7,
    name: 'Avocados (3 pack)',
    price: 549,
    offerPrice: 499,
    image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&auto=format&fit=crop',
    category: 'fruits-vegetables',
    seller: {
      id: 101,
      name: 'Fresh Farms',
      rating: 4.8
    },
    description: 'Ripe and ready-to-eat Hass avocados, perfect for guacamole or avocado toast.',
    stock: 20
  },
  {
    id: 8,
    name: 'Chocolate Chip Cookies',
    price: 399,
    offerPrice: 349,
    image: 'https://images.unsplash.com/photo-1582385760710-5102f5c477ef?w=800&auto=format&fit=crop',
    category: 'bakery',
    seller: {
      id: 104,
      name: 'Artisan Bakers',
      rating: 4.9
    },
    description: 'Homemade chocolate chip cookies baked fresh daily with premium chocolate.',
    stock: 45
  },
  {
    id: 9,
    name: 'Natural Honey',
    price: 599,
    offerPrice: 549,
    image: 'https://images.unsplash.com/photo-1612200058158-a01885faa2ff?w=800&auto=format&fit=crop',
    category: 'pantry',
    seller: {
      id: 106,
      name: 'Honey Haven',
      rating: 4.8
    },
    description: 'Pure, unfiltered honey collected from wildflower meadows.',
    stock: 22
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
    },
    description: 'Premium aged basmati rice with long grains and aromatic flavor.',
    stock: 18
  },
  {
    id: 11,
    name: 'Organic Spinach',
    price: 179,
    offerPrice: 149,
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=800&auto=format&fit=crop',
    category: 'fruits-vegetables',
    seller: {
      id: 102,
      name: 'Organic Growers',
      rating: 4.5
    },
    description: 'Fresh organic spinach leaves, thoroughly washed and ready to use.',
    stock: 32
  },
  {
    id: 12,
    name: 'Masala Chai Tea',
    price: 249,
    offerPrice: 199,
    image: 'https://images.unsplash.com/photo-1561336526-2914f13ceb36?w=800&auto=format&fit=crop',
    category: 'beverages',
    seller: {
      id: 108,
      name: 'Tea Treasures',
      rating: 4.7
    },
    description: 'Traditional Indian masala chai blend with cardamom, cinnamon, and ginger.',
    stock: 28
  },
  {
    id: 13,
    name: 'Fresh Paneer',
    price: 199,
    offerPrice: 175,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop',
    category: 'dairy',
    seller: {
      id: 103,
      name: 'Dairy Delights',
      rating: 4.7
    },
    description: 'Homemade fresh cottage cheese, soft and perfect for Indian curries.',
    stock: 15
  },
  {
    id: 14,
    name: 'Coconut Water (Pack of 3)',
    price: 359,
    offerPrice: 325,
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800&auto=format&fit=crop',
    category: 'beverages',
    seller: {
      id: 105,
      name: 'Fresh Squeezed Co.',
      rating: 4.6
    },
    description: '100% natural coconut water with no added sugar or preservatives.',
    stock: 24
  },
  {
    id: 15,
    name: 'Organic Almonds (500g)',
    price: 899,
    offerPrice: 799,
    image: 'https://images.unsplash.com/photo-1591635566278-10dca0ca76ee?w=800&auto=format&fit=crop',
    category: 'pantry',
    seller: {
      id: 109,
      name: 'Nut Nation',
      rating: 4.9
    },
    description: 'Premium organic almonds, raw and unsalted for healthy snacking.',
    stock: 17
  },
  {
    id: 16,
    name: 'Garlic Naan Bread',
    price: 179,
    offerPrice: 149,
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&auto=format&fit=crop',
    category: 'bakery',
    seller: {
      id: 104,
      name: 'Artisan Bakers',
      rating: 4.9
    },
    description: 'Traditional Indian flatbread topped with garlic and butter.',
    stock: 38
  }
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const location = useLocation();
  
  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    const searchParam = queryParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location]);
  
  // Filter products by category
  const filteredByCategory = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  // Filter by search term
  const filteredProducts = searchTerm 
    ? filteredByCategory.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredByCategory;
  
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
  
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Shop</h1>
        
        {/* Search Bar at the top */}
        <div className="mb-6">
          <SearchBar 
            fullWidth
            placeholder="Search products..." 
            className="max-w-2xl mx-auto"
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category Filter */}
          <div className="lg:w-1/4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
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
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Sort By</h2>
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
          <div className="lg:w-3/4">
            {searchTerm && (
              <div className="mb-4 flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>
                  Showing results for: <span className="font-medium">"{searchTerm}"</span>
                </p>
                <button
                  onClick={handleClearSearch}
                  className="text-sm text-brandGreen hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedProducts.map(product => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
                  <Link to={`/product/${product.id}`} className="block h-44 sm:h-52 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1584473457409-ce85152af916?w=800&auto=format&fit=crop"; }}
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <Link to={`/product/${product.id}`} className="block mb-2">
                      <h3 className="font-medium text-lg hover:text-brandGreen transition-colors line-clamp-2">{product.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        {product.offerPrice ? (
                          <div className="flex items-center">
                            <span className="text-lg font-bold text-brandGreen">₹{product.offerPrice.toFixed(2)}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">₹{product.price.toFixed(2)}</span>
                            <span className="ml-2 text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded">
                              {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% off
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    </div>
                    <div className="mt-auto">
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Seller: {product.seller.name}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
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
                </div>
              ))}
            </div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400&auto=format&fit=crop"
                  alt="No products found"
                  className="w-48 h-48 object-cover mx-auto mb-6 opacity-60 rounded-full"
                />
                <p className="text-xl text-gray-600 mb-2">No products found</p>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                <button
                  className="px-6 py-2 bg-brandGreen text-white rounded-md hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
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
