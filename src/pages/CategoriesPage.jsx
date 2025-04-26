
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Fruits & Vegetables',
    image: '/public/lovable-uploads/291d7186-55e3-4105-ad5b-ebd9ea96fca8.png',
    slug: 'fruits-vegetables'
  },
  {
    id: 2,
    name: 'Beverages',
    image: '/public/lovable-uploads/291d7186-55e3-4105-ad5b-ebd9ea96fca8.png',
    slug: 'beverages'
  },
  {
    id: 3,
    name: 'Dairy Products',
    image: '/public/lovable-uploads/291d7186-55e3-4105-ad5b-ebd9ea96fca8.png',
    slug: 'dairy'
  },
  {
    id: 4,
    name: 'Bakery & Snacks',
    image: '/public/lovable-uploads/291d7186-55e3-4105-ad5b-ebd9ea96fca8.png',
    slug: 'bakery'
  },
  {
    id: 5,
    name: 'Meat & Seafood',
    image: '/public/lovable-uploads/291d7186-55e3-4105-ad5b-ebd9ea96fca8.png',
    slug: 'meat-seafood'
  },
  {
    id: 6,
    name: 'Frozen Foods',
    image: '/public/lovable-uploads/291d7186-55e3-4105-ad5b-ebd9ea96fca8.png',
    slug: 'frozen'
  },
  {
    id: 7,
    name: 'Pantry & Staples',
    image: '/public/lovable-uploads/291d7186-55e3-4105-ad5b-ebd9ea96fca8.png',
    slug: 'pantry'
  },
  {
    id: 8,
    name: 'Personal Care',
    image: '/public/lovable-uploads/291d7186-55e3-4105-ad5b-ebd9ea96fca8.png',
    slug: 'personal-care'
  }
];

const CategoriesPage = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">Categories</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(category => (
            <Link 
              to={`/categories/${category.slug}`}
              key={category.id}
              className="category-card"
            >
              <div className="p-4 rounded-full bg-gray-100">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="category-icon"
                />
              </div>
              <h3 className="text-xl font-medium mt-4">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
