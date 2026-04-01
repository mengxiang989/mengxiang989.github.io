import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LikeButton = ({ likes, onLike }) => {
  const iconRef = useRef(null);

  const handleClick = () => {
    onLike();
    // GSAP 弹跳动画：点击时爱心放大再缩小
    gsap.fromTo(
      iconRef.current,
      { scale: 1 },
      { scale: 1.5, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }
    );
  };

  return (
    <button
      onClick={handleClick}
      className="group flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border-2 border-blue-100 px-5 py-2 rounded-full transition-all duration-300 hover:shadow-md active:scale-95"
      aria-label="点赞"
    >
      <div ref={iconRef} className="text-red-500 transform origin-center">
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <span className="font-bold font-sans text-sm tracking-wide">{likes} 赞</span>
    </button>
  );
};

export default LikeButton;