import { useState, useEffect } from 'react';

const colors = [
  '202 96% 45%', // Blue (Default)
  '0 91% 60%',   // Red
  '24 94% 50%',  // Orange
  '45 93% 47%',  // Yellow
  '142 71% 45%', // Green
  '189 94% 43%', // Cyan
  '226 70% 55%', // Indigo
  '262 83% 58%', // Violet
  '330 81% 60%'  // Pink
];

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [colorIndex, setColorIndex] = useState(() => {
    const savedColorIndex = localStorage.getItem('colorIndex');
    return savedColorIndex ? parseInt(savedColorIndex, 10) : 0;
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', colors[colorIndex]);
    localStorage.setItem('colorIndex', colorIndex);
  }, [colorIndex]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const nextColor = () => {
    setColorIndex(prev => (prev + 1) % colors.length);
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    nextColor,
    currentColor: colors[colorIndex]
  };
}
