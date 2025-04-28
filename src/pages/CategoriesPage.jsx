
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import SearchBar from '../components/SearchBar';

const categories = [
  {
    id: 1,
    name: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop',
    slug: 'fruits-vegetables',
    description: 'Fresh farm produce, seasonal fruits, and organic vegetables.'
  },
  {
    id: 2,
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=800&auto=format&fit=crop',
    slug: 'beverages',
    description: 'Refreshing drinks, juices, teas, coffee, and dairy beverages.'
  },
  {
    id: 3,
    name: 'Dairy Products',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&auto=format&fit=crop',
    slug: 'dairy',
    description: 'Milk, cheese, butter, yogurt, and other dairy essentials.'
  },
  {
    id: 4,
    name: 'Bakery & Snacks',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop',
    slug: 'bakery',
    description: 'Freshly baked bread, cookies, pastries, and savory snacks.'
  },
  {
    id: 5,
    name: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop',
    slug: 'meat-seafood',
    description: 'Premium quality meat cuts, poultry, fish, and other seafood.'
  },
  {
    id: 6,
    name: 'Frozen Foods',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&auto=format&fit=crop',
    slug: 'frozen',
    description: 'Ready-to-cook meals, frozen vegetables, and ice cream.'
  },
  {
    id: 7,
    name: 'Pantry & Staples',
    image: 'https://images.unsplash.com/photo-1584473457493-17c4c30abfa4?w=800&auto=format&fit=crop',
    slug: 'pantry',
    description: 'Rice, flour, pulses, spices, oil, and other essentials.'
  },
  {
    id: 8,
    name: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?w=800&auto=format&fit=crop',
    slug: 'personal-care',
    description: 'Skincare, haircare, and personal hygiene products.'
  }
];

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCategoryClick = (slug) => {
    // Navigate to shop page with category filter
    navigate(`/shop?category=${slug}`);
  };

  return (
    <div className="py-8 px-4 sm:py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Categories</h1>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <SearchBar 
            placeholder="Search categories..." 
            fullWidth={true}
            className="w-full"
          />
        </div>
        
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredCategories.map(category => (
              <div 
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1584473457409-ce85152af916?w=800&auto=format&fit=crop"; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-medium text-gray-900 group-hover:text-brandGreen transition-colors">{category.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No categories found matching "{searchTerm}"</p>
            <button
              className="mt-4 px-6 py-2 bg-brandGreen text-white rounded-md hover:opacity-90 transition-opacity"
              onClick={() => setSearchTerm('')}
            >
              Show All Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
