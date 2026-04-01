import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useBannerStore from '../store/bannerStore';

const AnnouncementBanner = () => {
  const { isVisible, closeBanner } = useBannerStore();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        closeBanner();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, closeBanner]);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-gray-800">
            文章为作者原创，未经允许，不可抄袭！
          </span>
        </div>

        <button
          onClick={closeBanner}
          className="flex-shrink-0 ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors active:scale-95"
          aria-label="关闭横幅"
        >
          <FontAwesomeIcon icon={faTimes} className="text-gray-600 text-sm" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;