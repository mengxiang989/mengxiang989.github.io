import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">
          <span className="text-xl font-semibold">
            孟想的编程天地
          </span>
        </Link>

        <nav className="flex items-center space-x-8">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <FontAwesomeIcon icon={faHome} />
            <span className="hidden md:inline">首页</span>
          </Link>
          
          <Link to="/about" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span className="hidden md:inline">关于</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;