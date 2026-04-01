import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useBlogStore from '../store/blogStore';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const { articles, searchQuery, selectedCategory, setCategory } = useBlogStore();

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.summary && article.summary.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCategory = selectedCategory === '全部' || article.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  const categories = useMemo(() => ['全部', ...new Set(articles.map((a) => a.category))], [articles]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <header className="pt-24 pb-12 px-4 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            孟想的编程天地
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            记录编程学习的点点滴滴
          </p>
          
          <div>
            <SearchBar />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <nav className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {filteredArticles.map((article) => (
              <div key={article.id} className="h-full">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-gray-300 mb-4">
              <FontAwesomeIcon icon={faSearch} className="text-5xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">没有找到相关文章</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">请尝试其他搜索关键词或分类</p>
            <button
              onClick={() => setCategory('全部')}
              className="px-6 py-2 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-700 transition-all"
            >
              查看全部文章
            </button>
          </div>
        )}
      </main>

      <footer className="py-8 text-center border-t border-gray-200 bg-gray-50">
        <p className="text-gray-500 text-sm">
          © 2026 孟想的编程天地 By HAISNAP
        </p>
      </footer>
    </div>
  );
};

export default Home;