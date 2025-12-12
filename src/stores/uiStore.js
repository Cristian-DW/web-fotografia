import { create } from 'zustand';

export const useUIStore = create((set) => ({
    // Modal states
    authModalOpen: false,
    authModalMode: 'login', // 'login' | 'register'
    createPostModalOpen: false,
    lightboxOpen: false,
    lightboxImage: null,

    // Sidebar state
    sidebarOpen: false,

    // Notification panel state
    notificationPanelOpen: false,

    // Theme
    theme: 'dark',

    // Actions
    openAuthModal: (mode = 'login') => set({ authModalOpen: true, authModalMode: mode }),
    closeAuthModal: () => set({ authModalOpen: false }),
    setAuthModalMode: (mode) => set({ authModalMode: mode }),

    openCreatePostModal: () => set({ createPostModalOpen: true }),
    closeCreatePostModal: () => set({ createPostModalOpen: false }),

    openLightbox: (image) => set({ lightboxOpen: true, lightboxImage: image }),
    closeLightbox: () => set({ lightboxOpen: false, lightboxImage: null }),

    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    closeSidebar: () => set({ sidebarOpen: false }),

    toggleNotificationPanel: () => set((state) => ({
        notificationPanelOpen: !state.notificationPanelOpen
    })),
    closeNotificationPanel: () => set({ notificationPanelOpen: false }),

    setTheme: (theme) => set({ theme })
}));

export default useUIStore;
