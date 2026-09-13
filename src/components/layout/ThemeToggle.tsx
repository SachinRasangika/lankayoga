import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../utils/cn';

interface ThemeToggleProps {
  onImage?: boolean;
}

export function ThemeToggle({ onImage = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 ease-calm',
        onImage ?
        'border-white/30 text-white hover:border-white/60' :
        'border-line text-muted hover:border-sage-400 hover:text-ink'
      )}>
      
      {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>);

}