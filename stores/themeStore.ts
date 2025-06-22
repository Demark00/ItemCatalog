
import { create } from 'zustand';
import { ThemeStoreState } from '@/types/themeStore-type';

export const useThemeStore = create<ThemeStoreState>((set) => ({
    theme: 'light', // Default theme

    // Initialize theme from localStorage on client-side
    initializeTheme: (): void => {
        if (typeof window !== 'undefined') { // Check if we're in the browser
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                set({ theme: storedTheme });
            }
        }
    },

    setTheme: (newTheme: string): void => {
        set({ theme: newTheme });
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
        }
    },
    
}));