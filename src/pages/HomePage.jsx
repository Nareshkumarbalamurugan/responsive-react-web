
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  
  const handleBuyNow = (product) => {
    if (!currentUser) {
      toast.error("Please login to purchase items");
      navigate('/login', { state: { from: '/' } });
      return;
    }
    
    addToCart(product);
    navigate('/cart');
  };

  // Featured products array with proper images
  const featuredProducts = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&auto=format&fit=crop",
      description: "Fresh organic bananas sourced directly from farms."
    },
    {
      id: 2,
      name: "Fresh Milk",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop", 
      description: "Farm-fresh whole milk, pasteurized and packed with nutrients."
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop",
      description: "Freshly baked whole grain bread, perfect for breakfast."
    },
    {
      id: 4,
      name: "Fresh Orange Juice",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop",
      description: "Freshly squeezed orange juice with no preservatives."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Shop Grocery Products</h1>
            <p className="text-lg mb-8">Fresh fruits, vegetables, and daily essentials delivered to your doorstep.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="bg-brandGreen text-white px-8 py-3 rounded-md inline-block font-medium hover:opacity-90 transition-opacity text-center"
              >
                Shop Now
              </Link>
              <div className="w-full sm:w-64">
                <SearchBar fullWidth placeholder="Search products..." />
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1543168256-418811576931?w=800&auto=format&fit=crop"
              alt="Fresh groceries and vegetables" 
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1584473457409-ce85152af916?w=800&auto=format&fit=crop"; }}
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1 */}
            <Link to="/categories/fruits-vegetables" className="block text-center">
              <div className="h-32 w-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-green-100">
                <img 
                  src="https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800&auto=format&fit=crop" 
                  alt="Fruits and Vegetables" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Fruits & Vegetables</h3>
            </Link>
            
            {/* Category 2 */}
            <Link to="/categories/beverages" className="block text-center">
              <div className="h-32 w-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-blue-100">
                <img 
                  src="https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=800&auto=format&fit=crop" 
                  alt="Beverages" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Beverages</h3>
            </Link>
            
            {/* Category 3 */}
            <Link to="/categories/dairy" className="block text-center">
              <div className="h-32 w-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-green-100">
                <img 
                  src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&auto=format&fit=crop" 
                  alt="Dairy Products" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Dairy Products</h3>
            </Link>
            
            {/* Category 4 */}
            <Link to="/categories/bakery" className="block text-center">
              <div className="h-32 w-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-red-100">
                <img 
                  src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&auto=format&fit=crop" 
                  alt="Bakery & Snacks" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Bakery & Snacks</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link to={`/product/${product.id}`} className="block">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1584473457409-ce85152af916?w=800&auto=format&fit=crop"; }}
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  </Link>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                    <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">In Stock</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-brandGreen text-white py-2 rounded-md hover:opacity-90 transition-opacity"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="flex-1 border border-brandGreen text-brandGreen py-2 rounded-md hover:bg-green-50 transition-colors"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <svg className="w-10 h-10 text-brandGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Quality Products</h3>
              <p className="text-gray-600">We source the freshest and highest quality products for our customers.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <svg className="w-10 h-10 text-brandGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your groceries delivered to your doorstep in the shortest time possible.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <svg className="w-10 h-10 text-brandGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Secure Payment</h3>
              <p className="text-gray-600">Multiple secure payment options for a hassle-free shopping experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
