export interface ThemeStoreState {
    theme: string;
    initializeTheme: () => void;
    setTheme: (newTheme: string) => void;
}