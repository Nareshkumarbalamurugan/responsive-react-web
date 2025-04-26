
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

// Mock seller data
const sellers = [
  {
    id: 101,
    name: 'Fresh Farms',
    description: 'We are a family-owned farm specializing in organic vegetables and fruits. All our products are grown using sustainable farming practices without any harmful pesticides or chemicals.',
    logo: '/public/lovable-uploads/215b2ed0-efad-44e1-930a-e5ec51473d15.png',
    rating: 4.8,
    reviewCount: 245,
    since: 'March 2020',
    contactEmail: 'contact@freshfarms.com',
    contactPhone: '(123) 456-7890',
    location: 'Springfield, IL',
    products: [
      {
        id: 1,
        name: 'Organic Bananas',
        price: 2.99,
        image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
      },
      {
        id: 7,
        name: 'Avocados (3 pack)',
        price: 5.99,
        image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
      },
      {
        id: 11,
        name: 'Organic Apples',
        price: 3.49,
        image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
      },
      {
        id: 12,
        name: 'Fresh Salad Mix',
        price: 4.29,
        image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
      }
    ]
  },
  {
    id: 102,
    name: 'Organic Growers',
    description: 'Certified organic farm with a wide variety of seasonal vegetables and fruits. We focus on biodiversity and soil health to grow nutrient-rich produce.',
    logo: '/public/lovable-uploads/215b2ed0-efad-44e1-930a-e5ec51473d15.png',
    rating: 4.5,
    reviewCount: 189,
    since: 'June 2019',
    contactEmail: 'hello@organicgrowers.com',
    contactPhone: '(987) 654-3210',
    location: 'Greenville, SC',
    products: [
      {
        id: 2,
        name: 'Fresh Tomatoes',
        price: 3.49,
        image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
      },
      {
        id: 13,
        name: 'Organic Carrots',
        price: 2.49,
        image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
      },
      {
        id: 14,
        name: 'Organic Bell Peppers',
        price: 3.99,
        image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
      }
    ]
  },
  {
    id: 103,
    name: 'Dairy Delights',
    description: 'Family-owned dairy farm producing high-quality milk, cheese, yogurt, and eggs. Our animals are pasture-raised and treated humanely.',
    logo: '/public/lovable-uploads/215b2ed0-efad-44e1-930a-e5ec51473d15.png',
    rating: 4.7,
    reviewCount: 210,
    since: 'January 2021',
    contactEmail: 'info@dairydelights.com',
    contactPhone: '(555) 123-4567',
    location: 'Madison, WI',
    products: [
      {
        id: 3,
        name: 'Whole Milk',
        price: 2.79,
        image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
      },
      {
        id: 4,
        name: 'Brown Eggs (12 pack)',
        price: 4.99,
        image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
      },
      {
        id: 15,
        name: 'Greek Yogurt',
        price: 3.29,
        image: '/public/lovable-uploads/fecf0a8b-d980-4df5-a320-a9e87cff5c61.png',
      }
    ]
  }
];

const SellerDetailsPage = () => {
  const { sellerId } = useParams();
  const { addToCart } = useCart();
  
  // Find the seller based on the URL parameter
  const seller = sellers.find(s => s.id === parseInt(sellerId)) || sellers[0];
  
  const handleAddToCart = (product) => {
    const productWithSeller = {
      ...product,
      seller: {
        id: seller.id,
        name: seller.name,
        rating: seller.rating
      }
    };
    addToCart(productWithSeller);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        {/* Seller Hero Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <img 
                  src={seller.logo} 
                  alt={seller.name} 
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{seller.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {Array(5).fill().map((_, i) => (
                      <svg 
                        key={i} 
                        className="w-5 h-5" 
                        fill={i < Math.floor(seller.rating) ? "currentColor" : "none"} 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg">{seller.rating}</span>
                  <span className="text-gray-500 ml-2">({seller.reviewCount} reviews)</span>
                </div>
                <p className="text-gray-700 mb-4">{seller.description}</p>
                <div className="flex flex-wrap text-sm text-gray-600">
                  <div className="mr-6 mb-2">
                    <span className="font-medium">Location:</span> {seller.location}
                  </div>
                  <div className="mr-6 mb-2">
                    <span className="font-medium">Seller since:</span> {seller.since}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium mb-2">Email</p>
              <p className="text-gray-700">{seller.contactEmail}</p>
            </div>
            <div>
              <p className="font-medium mb-2">Phone</p>
              <p className="text-gray-700">{seller.contactPhone}</p>
            </div>
          </div>
        </div>
        
        {/* Seller's Products */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Products from {seller.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {seller.products.map(product => (
              <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
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
    </div>
  );
};

export default SellerDetailsPage;
