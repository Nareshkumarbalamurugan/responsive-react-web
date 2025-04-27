import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { useIsMobile } from '../hooks/use-mobile';
import ProductReview from '../components/ProductReview';
import { Star, Check } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

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
    image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1586444248888-f140a5f2c1fb?w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1582385760710-5102f5c477ef?w=800&auto=format&fit=crop",
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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Find the product based on the URL parameter
  const product = products.find(p => p.id === parseInt(productId));
  
  // Handle scenario where product is not found
  if (!product) {
    useEffect(() => {
      toast.error("Product not found!");
      navigate('/shop');
    }, [navigate]);
    
    return <div className="p-10 text-center">Loading...</div>;
  }
  
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
    if (!currentUser) {
      toast.error("Please login to purchase items");
      navigate('/login', { state: { from: `/product/${productId}` } });
      return;
    }
    
    handleAddToCart();
    // Navigate to cart page
    navigate('/cart');
  };

  useEffect(() => {
    // Reset scroll position when product changes
    window.scrollTo(0, 0);
    // Reset selected offer when product changes
    setSelectedOffer(null);
    setQuantity(1);
  }, [productId]);

  const handleSubmitReview = (review) => {
    if (!currentUser) {
      toast.error("Please login to submit a review");
      navigate('/login', { state: { from: `/product/${productId}` } });
      return;
    }
    
    // In a real application, this would send the review to a backend
    toast.success("Thank you for your review!");
    
    // For now, we're just updating the UI
    if (product.reviews) {
      product.reviews.push({
        ...review,
        id: Date.now(),
        user: currentUser.name || currentUser.email,
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
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
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.seller.rating) ? 'fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.seller.rating} ({product.reviews.length} reviews)</span>
            </div>
            
            {/* Price display with offer */}
            <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-100">
              <div className="flex flex-wrap items-center mb-2 gap-2">
                <span className="text-3xl font-bold text-brandGreen">
                  ₹{(selectedOffer?.price || product.offerPrice || product.price).toFixed(2)}
                </span>
                {(selectedOffer?.price || product.offerPrice) && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.price.toFixed(2)}
                  </span>
                )}
                {savings > 0 && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
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
                    <li key={idx} className="flex items-start md:items-center flex-col md:flex-row md:gap-2">
                      <span className="text-orange-600 mr-2">•</span>
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{offer.code}:</span>{' '}
                        <span className="text-gray-700">{offer.description}</span>
                      </div>
                      {offer.discount && (
                        <button 
                          className="mt-2 md:mt-0 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
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
                  {currentUser ? 'Buy Now' : 'Login to Buy'}
                </button>
              </div>
              
              {!currentUser && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <p className="text-sm text-blue-700 flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Login to purchase products and save to your account
                  </p>
                </div>
              )}
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
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button className="flex items-center text-gray-600 hover:text-red-500">
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
        <div className="mt-12">
          <div className={`border-b border-gray-200 ${isMobile ? 'overflow-x-auto' : ''}`}>
            <nav className={`flex ${isMobile ? 'w-max' : ''}`}>
              <button 
                className={`py-4 px-4 md:px-6 font-medium whitespace-nowrap ${
                  activeTab === 'details' 
                    ? 'border-b-2 border-brandGreen text-brandGreen' 
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Product Details
              </button>
              <button 
                className={`py-4 px-4 md:px-6 font-medium whitespace-nowrap ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-brandGreen text-brandGreen' 
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews.length})
              </button>
              <button 
                className={`py-4 px-4 md:px-6 font-medium whitespace-nowrap ${
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
          
          <div className="mt-8 bg-white p-4 md:p-6 rounded-lg shadow-md">
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
              <ProductReview 
                productId={product.id}
                existingReviews={product.reviews}
                onReviewSubmit={handleSubmitReview}
              />
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
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link 
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium">{relatedProduct.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-brandGreen font-medium">₹{relatedProduct.offerPrice || relatedProduct.price}</span>
                      {relatedProduct.offerPrice && (
                        <span className="ml-2 text-xs text-gray-500 line-through">₹{relatedProduct.price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
