import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop',
    slug: 'fruits-vegetables'
  },
  {
    id: 2,
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop',
    slug: 'beverages'
  },
  {
    id: 3,
    name: 'Dairy Products',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&auto=format&fit=crop',
    slug: 'dairy'
  },
  {
    id: 4,
    name: 'Bakery & Snacks',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
    slug: 'bakery'
  },
  {
    id: 5,
    name: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop',
    slug: 'meat-seafood'
  },
  {
    id: 6,
    name: 'Frozen Foods',
    image: 'https://images.unsplash.com/photo-1624274579623-568736cf2e32?w=800&auto=format&fit=crop',
    slug: 'frozen'
  },
  {
    id: 7,
    name: 'Pantry & Staples',
    image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&auto=format&fit=crop',
    slug: 'pantry'
  },
  {
    id: 8,
    name: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&auto=format&fit=crop',
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
