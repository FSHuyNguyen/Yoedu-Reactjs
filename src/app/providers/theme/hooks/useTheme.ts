import { useContext } from 'react';
import { ThemeContext } from '@/app/providers/theme/theme-context';

export const useTheme = () => useContext(ThemeContext);
