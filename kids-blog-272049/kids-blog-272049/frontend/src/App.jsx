import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';
import About from './pages/About';
import Header from './components/Header';
import AnnouncementBanner from './components/AnnouncementBanner';

const App = () => {
  return (
    <HashRouter>
      <React.StrictMode>
        <div className="min-h-screen bg-white text-gray-800">
          <Header />
          <AnnouncementBanner />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </React.StrictMode>
    </HashRouter>
  );
};

export default App;