import { createContext } from 'react';
import type { ThemeMode } from './theme-provider';

export const ThemeContext = createContext({
  theme: 'light' as ThemeMode,
  toggleTheme: () => {},
});
