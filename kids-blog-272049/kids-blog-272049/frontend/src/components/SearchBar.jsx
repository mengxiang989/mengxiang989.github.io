import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useBlogStore from '../store/blogStore';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useBlogStore();

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
        <FontAwesomeIcon icon={faSearch} className="text-sm" />
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full py-2.5 pl-11 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400 text-sm"
        placeholder="搜索文章..."
        aria-label="搜索文章"
      />
      
      <div id="slot-search-bar-append" className="hidden"></div>
    </div>
  );
};

export default SearchBar;