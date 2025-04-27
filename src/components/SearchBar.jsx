
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const SearchBar = ({ className = "", placeholder = "Search products...", fullWidth = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Always navigate to shop page with search parameter
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${fullWidth ? 'w-full' : ''} ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-brandGreen focus:border-brandGreen transition duration-150 ease-in-out sm:text-sm"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm('')}
          className="absolute inset-y-0 right-12 flex items-center pr-2"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      )}
      <button
        type="submit"
        className="absolute inset-y-0 right-0 px-3 flex items-center bg-brandGreen text-white rounded-r-md hover:bg-opacity-90 transition-opacity"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
