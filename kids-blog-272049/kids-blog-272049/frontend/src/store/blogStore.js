import { create } from 'zustand';
import { initialArticles } from '../data/articles';

const useBlogStore = create((set) => ({
  articles: initialArticles,
  searchQuery: '',
  selectedCategory: '全部',

  setSearchQuery: (val) => set({ searchQuery: val }),
  setCategory: (val) => set({ selectedCategory: val }),
}));

export default useBlogStore;