import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import useBlogStore from '../store/blogStore';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles } = useBlogStore();
  
  const article = articles.find((a) => a.id === Number(id));

  useEffect(() => {
    if (article) {
      window.scrollTo(0, 0);
    }
  }, [id, article]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-4">
        <div className="text-center border border-gray-200 p-8 rounded-lg bg-gray-50 shadow-sm">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-6xl mb-6 text-gray-400" />
          <h2 className="text-3xl font-bold mb-4">文章未找到</h2>
          <p className="mb-8 text-gray-600">抱歉，您访问的文章不存在。</p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-20 font-sans">
      <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-semibold transition-colors"
          >
            <div className="w-8 h-8 flex items-center justify-center mr-3 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            </div>
            返回首页
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pt-24">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full mb-6">
            <FontAwesomeIcon icon={faTag} className="mr-2 text-xs" />
            <span>{article.category}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-center gap-8 text-gray-500 text-sm border-t border-b border-gray-200 py-4 max-w-2xl mx-auto">
            <span className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              {article.date}
            </span>
          </div>
        </header>

        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md mb-12">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <article className="bg-white rounded-lg p-6 md:p-10 shadow-sm border border-gray-200 mb-12">
          <div 
            className="prose prose-lg max-w-none 
              prose-headings:text-gray-900
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200
              prose-img:rounded-lg prose-img:border prose-img:border-gray-200
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
          
          <div id="slot-article-content-end" className="hidden mt-8 border-t border-gray-200 pt-4"></div>
        </article>
      </main>
    </div>
  );
};

export default Article;