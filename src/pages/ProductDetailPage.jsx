
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// Mock product data (expanded from ShopPage)
const products = [
  {
    id: 1,
    name: 'Organic Bananas',
    price: 2.99,
    image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
    category: 'fruits-vegetables',
    description: 'Sweet and nutritious organic bananas, perfect for snacking or adding to smoothies.',
    nutritionInfo: 'Rich in potassium, vitamin C, and dietary fiber.',
    origin: 'Costa Rica',
    quantity: '1 bunch (approx. 5-7 bananas)',
    seller: {
      id: 101,
      name: 'Fresh Farms',
      rating: 4.8
    },
    reviews: [
      { id: 1, user: 'Jane D.', rating: 5, comment: 'Very fresh and sweet bananas. Will buy again!', date: '2023-11-15' },
      { id: 2, user: 'Mike T.', rating: 4, comment: 'Good quality, but a bit green when delivered.', date: '2023-11-10' }
    ]
  },
  {
    id: 2,
    name: 'Fresh Tomatoes',
    price: 3.49,
    image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
    category: 'fruits-vegetables',
    description: 'Juicy, ripe tomatoes perfect for salads, sandwiches, or cooking.',
    nutritionInfo: 'Good source of vitamin C, potassium, and lycopene.',
    origin: 'Local Farm',
    quantity: '1 lb (approximately 4 medium tomatoes)',
    seller: {
      id: 102,
      name: 'Organic Growers',
      rating: 4.5
    },
    reviews: [
      { id: 3, user: 'Sarah L.', rating: 5, comment: 'These tomatoes taste amazing! So much flavor compared to store-bought.', date: '2023-11-12' }
    ]
  }
];

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product based on the URL parameter
  const product = products.find(p => p.id === parseInt(productId)) || products[0];
  
  const handleAddToCart = () => {
    const productWithQuantity = {
      ...product,
      quantity
    };
    addToCart(productWithQuantity);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {Array(5).fill().map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-5 h-5" 
                    fill={i < Math.floor(product.seller.rating) ? "currentColor" : "none"} 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">{product.seller.rating} ({product.reviews.length} reviews)</span>
            </div>
            <p className="text-3xl font-bold text-brandGreen mb-4">${product.price.toFixed(2)}</p>
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <p className="font-medium mr-4">Quantity:</p>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className="px-4 py-2 border-r border-gray-300"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button 
                    className="px-4 py-2 border-l border-gray-300"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button 
                  className="bg-brandGreen text-white py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="font-medium mb-2">Product Information:</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Origin</p>
                  <p>{product.origin}</p>
                </div>
                <div>
                  <p className="text-gray-600">Quantity</p>
                  <p>{product.quantity}</p>
                </div>
              </div>
            </div>
            
            <div>
              <p className="font-medium mb-2">Seller:</p>
              <Link 
                to={`/seller/${product.seller.id}`}
                className="flex items-center text-brandBlue hover:underline"
              >
                {product.seller.name}
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button className="py-4 px-6 border-b-2 border-brandGreen text-brandGreen font-medium">
                Product Details
              </button>
              <button className="py-4 px-6 text-gray-500 font-medium">
                Reviews ({product.reviews.length})
              </button>
              <button className="py-4 px-6 text-gray-500 font-medium">
                Nutrition Information
              </button>
            </nav>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <p className="mb-4">{product.description}</p>
            <p className="mb-4">{product.nutritionInfo}</p>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Product Features</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Fresh and organic</li>
                <li>No pesticides or harmful chemicals</li>
                <li>Sustainably sourced</li>
                <li>Support local farmers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
