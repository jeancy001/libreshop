import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ search, setSearch }) => {
  return (
    <div className="fixed absolute top-20 right-4 w-full max-w-md px-4 z-10 mt-10">
      <div className="relative">
        <input
          type="search"
          value={search}
          placeholder="Search Products..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
