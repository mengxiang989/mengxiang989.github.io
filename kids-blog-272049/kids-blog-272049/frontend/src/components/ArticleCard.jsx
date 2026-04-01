import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const { id, title, summary, category, date, image } = article;

  return (
    <article className="group relative flex flex-col h-full bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:border-gray-300 hover:shadow-md">
      <Link to={`/article/${id}`} className="relative h-48 overflow-hidden block">
        <img
          src={image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 bg-white/90 text-gray-700 text-xs font-semibold rounded shadow-sm">
            {category}
          </span>
        </div>
      </Link>

      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center text-gray-500 text-xs mb-3">
          <time>{date}</time>
        </div>

        <Link to={`/article/${id}`} className="block mb-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {summary}
        </p>

        <div className="flex items-center justify-end pt-4 border-t border-gray-100 mt-auto">
          <Link 
            to={`/article/${id}`}
            className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            阅读全文
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
        
        <div id={`slot-article-card-${id}`} className="hidden"></div>
      </div>
    </article>
  );
};

export default ArticleCard;