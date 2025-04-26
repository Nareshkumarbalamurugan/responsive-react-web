
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1457296898342-cdd24585d095?w=800&auto=format&fit=crop',
    slug: 'fruits-vegetables',
    description: 'Fresh farm produce, seasonal fruits, and organic vegetables.'
  },
  {
    id: 2,
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&auto=format&fit=crop',
    slug: 'bakery',
    description: 'Freshly baked bread, cookies, pastries, and savory snacks.'
  },
  {
    id: 5,
    name: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1595356161904-6708c97be89c?w=800&auto=format&fit=crop',
    slug: 'meat-seafood',
    description: 'Premium quality meat cuts, poultry, fish, and other seafood.'
  },
  {
    id: 6,
    name: 'Frozen Foods',
    image: 'https://images.unsplash.com/photo-1586377249903-21160f5456ac?w=800&auto=format&fit=crop',
    slug: 'frozen',
    description: 'Ready-to-cook meals, frozen vegetables, and ice cream.'
  },
  {
    id: 7,
    name: 'Pantry & Staples',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9667d9f?w=800&auto=format&fit=crop',
    slug: 'pantry',
    description: 'Rice, flour, pulses, spices, oil, and other essentials.'
  },
  {
    id: 8,
    name: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=800&auto=format&fit=crop',
    slug: 'personal-care',
    description: 'Skincare, haircare, and personal hygiene products.'
  }
];

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Categories</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-brandGreen focus:border-brandGreen transition duration-150 ease-in-out sm:text-sm"
          />
        </div>
        
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map(category => (
              <Link 
                to={`/shop?category=${category.slug}`}
                key={category.id}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-medium text-gray-900 group-hover:text-brandGreen transition-colors">{category.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{category.description}</p>
                </div>
              </Link>
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
