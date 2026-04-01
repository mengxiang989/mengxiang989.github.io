import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBannerStore = create(
  persist(
    (set) => ({
      isVisible: true,
      closeBanner: () => set({ isVisible: false }),
      resetBanner: () => set({ isVisible: true }),
    }),
    {
      name: 'announcement-banner-storage',
    }
  )
);

export default useBannerStore;