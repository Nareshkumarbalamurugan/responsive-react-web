
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

// Mock product data (expanded from ShopPage with INR prices)
const products = [
  {
    id: 1,
    name: 'Organic Bananas',
    price: 299,
    offerPrice: 269,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&auto=format&fit=crop",
    category: 'fruits-vegetables',
    description: 'Sweet and nutritious organic bananas, perfect for snacking or adding to smoothies.',
    nutritionInfo: 'Rich in potassium, vitamin C, and dietary fiber.',
    origin: 'Kerala, India',
    quantity: '1 bunch (approx. 5-7 bananas)',
    offers: [
      { code: 'FRESH10', description: '10% off on all fresh fruits', discount: 30 },
      { code: 'COMBO20', description: '₹50 off when bought with any dairy product' }
    ],
    seller: {
      id: 101,
      name: 'Fresh Farms',
      rating: 4.8
    },
    reviews: [
      { id: 1, user: 'Priya D.', rating: 5, comment: 'Very fresh and sweet bananas. Will buy again!', date: '2023-11-15' },
      { id: 2, user: 'Rahul T.', rating: 4, comment: 'Good quality, but a bit green when delivered.', date: '2023-11-10' }
    ]
  },
  {
    id: 2,
    name: 'Fresh Tomatoes',
    price: 314,
    offerPrice: 267,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop",
    category: 'fruits-vegetables',
    description: 'Juicy, ripe tomatoes perfect for salads, sandwiches, or cooking.',
    nutritionInfo: 'Good source of vitamin C, potassium, and lycopene.',
    origin: 'Himachal Pradesh, India',
    quantity: '500g (approximately 4 medium tomatoes)',
    offers: [
      { code: 'VEGGIE15', description: '15% off on all vegetables', discount: 47 },
      { code: 'BULK25', description: '₹75 off when you buy 2kg or more' }
    ],
    seller: {
      id: 102,
      name: 'Organic Growers',
      rating: 4.5
    },
    reviews: [
      { id: 3, user: 'Anita L.', rating: 5, comment: 'These tomatoes taste amazing! So much flavor compared to store-bought.', date: '2023-11-12' }
    ]
  },
  {
    id: 3,
    name: 'Whole Milk',
    price: 249,
    offerPrice: 224,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop",
    category: 'dairy',
    description: 'Fresh, pasteurized whole milk from grass-fed cows. Rich in calcium and protein.',
    nutritionInfo: 'Contains essential vitamins and minerals including calcium, vitamin D, and protein.',
    origin: 'Punjab, India',
    quantity: '1 liter',
    offers: [
      { code: 'DAIRY10', description: '10% off on all dairy products', discount: 25 },
      { code: 'FRESH20', description: '₹50 off when bought with any breakfast cereal' }
    ],
    seller: {
      id: 103,
      name: 'Dairy Delights',
      rating: 4.7
    },
    reviews: [
      { id: 4, user: 'Vikram S.', rating: 5, comment: 'Excellent quality milk! Creamy and fresh.', date: '2023-12-05' },
      { id: 5, user: 'Meera P.', rating: 4, comment: 'Good milk, but packaging could be improved.', date: '2023-11-28' }
    ]
  },
  {
    id: 4,
    name: 'Brown Eggs (12 pack)',
    price: 449,
    offerPrice: 399,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&auto=format&fit=crop",
    category: 'dairy',
    description: 'Farm-fresh brown eggs from free-range chickens. High in protein and essential nutrients.',
    nutritionInfo: 'Rich source of high-quality protein, vitamin D, and B vitamins.',
    origin: 'Haryana, India',
    quantity: '12 eggs',
    offers: [
      { code: 'EGG20', description: '₹50 off on egg products', discount: 50 },
      { code: 'BREAKFAST15', description: '15% off when bought with bread or milk' }
    ],
    seller: {
      id: 103,
      name: 'Dairy Delights',
      rating: 4.7
    },
    reviews: [
      { id: 6, user: 'Kiran R.', rating: 5, comment: 'Eggs are always fresh and of consistent quality.', date: '2023-12-10' },
      { id: 7, user: 'Arjun B.', rating: 5, comment: 'Love the rich yellow yolks of these eggs. Will buy again!', date: '2023-11-30' }
    ]
  },
  {
    id: 5,
    name: 'Sourdough Bread',
    price: 359,
    offerPrice: 299,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop",
    category: 'bakery',
    description: 'Artisanal sourdough bread made with traditional fermentation methods. Crusty outside, soft inside.',
    nutritionInfo: 'Contains probiotics from the fermentation process. Lower gluten content than regular bread.',
    origin: 'Bangalore, India',
    quantity: '500g loaf',
    offers: [
      { code: 'BAKER10', description: '10% off on bakery items', discount: 36 },
      { code: 'BUNDLE25', description: '25% off when bought with any spread or jam' }
    ],
    seller: {
      id: 104,
      name: 'Artisan Bakers',
      rating: 4.9
    },
    reviews: [
      { id: 8, user: 'Neha G.', rating: 5, comment: 'Best sourdough in town! Perfectly fermented and delicious.', date: '2023-12-15' }
    ]
  },
  {
    id: 6,
    name: 'Orange Juice',
    price: 289,
    offerPrice: 249,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&auto=format&fit=crop",
    category: 'beverages',
    description: 'Freshly squeezed orange juice without added sugar or preservatives. Rich in vitamin C.',
    nutritionInfo: 'Excellent source of vitamin C. Contains natural antioxidants and flavonoids.',
    origin: 'Nagpur, India',
    quantity: '1 liter',
    offers: [
      { code: 'JUICE15', description: '15% off on all juices', discount: 40 },
      { code: 'MORNING20', description: '₹50 off when bought with any breakfast item' }
    ],
    seller: {
      id: 105,
      name: 'Fresh Squeezed Co.',
      rating: 4.6
    },
    reviews: [
      { id: 9, user: 'Suresh M.', rating: 4, comment: 'Fresh and tangy juice. Great for morning breakfast.', date: '2023-12-08' },
      { id: 10, user: 'Anjali K.', rating: 5, comment: 'Tastes like fresh oranges. No artificial flavors!', date: '2023-12-01' }
    ]
  },
  {
    id: 7,
    name: 'Avocados (3 pack)',
    price: 549,
    offerPrice: 499,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop",
    category: 'fruits-vegetables',
    description: 'Perfectly ripe Hass avocados, ready to eat. Rich, creamy texture and buttery flavor.',
    nutritionInfo: 'High in healthy fats, fiber, and potassium. Contains vitamins K, E, and C.',
    origin: 'Maharashtra, India',
    quantity: '3 avocados',
    offers: [
      { code: 'AVOCADO10', description: '10% off on avocados', discount: 50 },
      { code: 'GUAC20', description: '₹100 off when buying ingredients for guacamole' }
    ],
    seller: {
      id: 101,
      name: 'Fresh Farms',
      rating: 4.8
    },
    reviews: [
      { id: 11, user: 'Deepika S.', rating: 4, comment: 'Good quality avocados. Perfectly ripe on arrival.', date: '2023-12-12' }
    ]
  },
  {
    id: 8,
    name: 'Chocolate Chip Cookies',
    price: 399,
    offerPrice: 349,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop",
    category: 'bakery',
    description: 'Freshly baked chocolate chip cookies with premium dark chocolate chunks and a hint of sea salt.',
    nutritionInfo: 'Made with real butter and brown sugar. Contains eggs, wheat, and dairy.',
    origin: 'Delhi, India',
    quantity: '250g (approx. 10 cookies)',
    offers: [
      { code: 'SWEET15', description: '15% off on desserts', discount: 60 },
      { code: 'TREAT25', description: '25% off when bought with coffee or tea' }
    ],
    seller: {
      id: 104,
      name: 'Artisan Bakers',
      rating: 4.9
    },
    reviews: [
      { id: 12, user: 'Ravi P.', rating: 5, comment: 'These cookies are incredible! Perfect sweetness and texture.', date: '2023-12-10' },
      { id: 13, user: 'Sunita L.', rating: 5, comment: 'My kids love these cookies. They taste homemade!', date: '2023-12-05' }
    ]
  }
];

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedOffer, setSelectedOffer] = useState(null);
  
  // Find the product based on the URL parameter
  const product = products.find(p => p.id === parseInt(productId)) || products[0];
  
  // Calculate savings
  const savings = product.price - (selectedOffer?.price || product.offerPrice || product.price);
  const savingsPercentage = ((savings / product.price) * 100).toFixed(0);
  
  const handleAddToCart = () => {
    const productWithDetails = {
      ...product,
      quantity,
      offerPrice: selectedOffer?.price || product.offerPrice,
      offerCode: selectedOffer?.code
    };
    addToCart(productWithDetails);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to cart page
    window.location.href = '/cart';
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
              
              {/* Product thumbnails */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="border-2 border-blue-500 rounded-md overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-16 object-cover"
                  />
                </div>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1546868871-0f936769675e?w=800&auto=format&fit=crop" 
                    alt="Product angle 2" 
                    className="w-full h-16 object-cover"
                  />
                </div>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&auto=format&fit=crop" 
                    alt="Product package" 
                    className="w-full h-16 object-cover"
                  />
                </div>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?w=800&auto=format&fit=crop" 
                    alt="Product closeup" 
                    className="w-full h-16 object-cover"
                  />
                </div>
              </div>
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
            
            {/* Price display with offer */}
            <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-100">
              <div className="flex items-center mb-2">
                <span className="text-3xl font-bold text-brandGreen">
                  ₹{(selectedOffer?.price || product.offerPrice || product.price).toFixed(2)}
                </span>
                {(selectedOffer?.price || product.offerPrice) && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ₹{product.price.toFixed(2)}
                  </span>
                )}
                {savings > 0 && (
                  <span className="ml-3 bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    Save ₹{savings.toFixed(2)} ({savingsPercentage}% off)
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Inclusive of all taxes
              </div>
            </div>
            
            {/* Available offers section */}
            {product.offers && product.offers.length > 0 && (
              <div className="mb-6 bg-orange-50 p-4 rounded-md border border-orange-100">
                <h3 className="text-lg font-medium text-orange-700 mb-3">Available Offers</h3>
                <ul className="space-y-2">
                  {product.offers.map((offer, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-orange-600 mr-2">•</span>
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{offer.code}:</span>{' '}
                        <span className="text-gray-700">{offer.description}</span>
                      </div>
                      {offer.discount && (
                        <button 
                          className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                          onClick={() => setSelectedOffer(offer.discount ? {
                            price: product.price - offer.discount,
                            code: offer.code
                          } : null)}
                        >
                          Apply
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
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
                <button 
                  className="bg-orange-500 text-white py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
                  onClick={handleBuyNow}
                >
                  Buy Now
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
            
            {currentUser && (
              <div className="mt-6 flex items-center">
                <button className="flex items-center mr-6 text-gray-600 hover:text-red-500">
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-500">
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button 
                className={`py-4 px-6 font-medium ${
                  activeTab === 'details' 
                    ? 'border-b-2 border-brandGreen text-brandGreen' 
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Product Details
              </button>
              <button 
                className={`py-4 px-6 font-medium ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-brandGreen text-brandGreen' 
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews.length})
              </button>
              <button 
                className={`py-4 px-6 font-medium ${
                  activeTab === 'nutrition' 
                    ? 'border-b-2 border-brandGreen text-brandGreen' 
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('nutrition')}
              >
                Nutrition Information
              </button>
            </nav>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            {activeTab === 'details' && (
              <>
                <p className="mb-4">{product.description}</p>
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Product Features</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Fresh and organic</li>
                    <li>No pesticides or harmful chemicals</li>
                    <li>Sustainably sourced</li>
                    <li>Support local farmers</li>
                    <li>Packed with care to ensure freshness</li>
                  </ul>
                </div>
              </>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  {currentUser && (
                    <button className="bg-brandGreen text-white px-4 py-2 rounded-md text-sm">
                      Write a Review
                    </button>
                  )}
                </div>
                
                {product.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 py-4 last:border-b-0">
                    <div className="flex justify-between mb-2">
                      <p className="font-medium">{review.user}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      {Array(5).fill().map((_, i) => (
                        <svg 
                          key={i} 
                          className="w-4 h-4" 
                          fill={i < review.rating ? "currentColor" : "none"} 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'nutrition' && (
              <div>
                <p className="mb-6">{product.nutritionInfo}</p>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-4 border-b pb-2">Nutrition Facts</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Calories</span>
                      <span>90 kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Fat</span>
                      <span>0.3g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sodium</span>
                      <span>1mg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Carbohydrates</span>
                      <span>23g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dietary Fiber</span>
                      <span>2.6g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sugars</span>
                      <span>12g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein</span>
                      <span>1.1g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Potassium</span>
                      <span>358mg</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
