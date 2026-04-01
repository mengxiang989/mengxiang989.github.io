import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faTimes } from '@fortawesome/free-solid-svg-icons';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white shadow-lg z-40">
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,245,255,0.1)_50%)] bg-[length:100%_3px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 animate-pulse">
            <FontAwesomeIcon icon={faBullhorn} className="text-white text-sm" />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-bold text-sm sm:text-base tracking-wide font-mono">
              🎉 网站公告：
            </span>
            <span className="text-sm sm:text-base font-medium">
              欢迎来到孟想的编程天地！一起探索代码的奥秘 🚀
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 transition-all duration-300 group active:scale-95"
          aria-label="关闭横幅"
        >
          <FontAwesomeIcon 
            icon={faTimes} 
            className="text-white text-sm group-hover:rotate-90 transition-transform duration-300" 
          />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
    </div>
  );
};

export default Banner;