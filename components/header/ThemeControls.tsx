'use client';

import { useState } from 'react';
import { Sun, Moon, Eye, Palette, X } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioId } from '../../lib/audioConfig';
import { THEME_CLASSES, ThemeMode, useTheme } from '../../context/ThemeProvider';

export function ThemeControls() {
  const { playTriggered } = useAudio();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  
  const { theme: currentTheme, setTheme: setCurrentTheme } = useTheme();

  const baseButtonStyles = "cursor-pointer p-3 rounded-full border backdrop-blur-md transition-colors shadow-lg pointer-events-auto";
  const activeStyles = 'border-primary-foreground bg-primary/80 text-primary-foreground';
  const inactiveStyles = 'border-primary-border/70 bg-primary/70 text-primary-foreground-disabled hover:bg-primary-hover';

  const getThemeIcon = (theme: ThemeMode) => {
    switch (theme) {
      case 'light': return <Sun className="h-5 w-5" strokeWidth={2} />;
      case 'low-contrast': return <Eye className="h-5 w-5" strokeWidth={2} />;
      case 'low-contrast-dark': return <Eye className="h-5 w-5" strokeWidth={2} />;
      case 'blue-yellow':
      case 'green-magenta': return <Palette className="h-5 w-5" strokeWidth={2} />;
      default: return <Moon className="h-5 w-5" strokeWidth={2} />;
    }
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    setCurrentTheme(newTheme);
    playTriggered(AudioId.CLICK);
    
    document.documentElement.classList.remove(...THEME_CLASSES);
    
    if (newTheme !== 'light') {
      document.documentElement.classList.add(newTheme);
    }
  };

  return (
    <>
      {/* Top Left Theme Action Button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => {
            setIsThemeModalOpen(true);
            playTriggered(AudioId.CLICK);
          }}
          className={`${baseButtonStyles} ${inactiveStyles}`}
          title="Open Theme Settings"
          aria-label="Open Theme Settings"
        >
          {getThemeIcon(currentTheme)}
        </button>
      </div>

      {/* Theme Matrix Modal Overlay */}
      <AnimatePresence>
        {isThemeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/40 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsThemeModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-primary/90 border border-primary-border/60 max-w-md w-full rounded-2xl p-6 shadow-2xl relative flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-primary-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary-foreground" />
                  <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-primary-foreground">
                    Display & Accessibility
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsThemeModalOpen(false);
                    playTriggered(AudioId.CLICK);
                  }}
                  className="text-primary-foreground-disabled hover:text-primary-foreground p-1 transition-colors rounded-md"
                  aria-label="Close theme options panel"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Rows Configurations */}
              <div className="flex flex-col gap-5">
                {/* Row 1: Light & Dark Modes */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-sans tracking-wider text-foreground-soft/70 uppercase font-medium">General Themes</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        currentTheme === 'light' ? activeStyles : inactiveStyles
                      }`}
                    >
                      <Sun className="h-4 w-4" /> Light Mode
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        currentTheme === 'dark' ? activeStyles : inactiveStyles
                      }`}
                    >
                      <Moon className="h-4 w-4" /> Dark Mode
                    </button>
                  </div>
                </div>

                {/* Row 2: Low Contrast/Dyslexia Theme */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-sans tracking-wider text-foreground-soft/70 uppercase font-medium">Low Contrast</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleThemeChange('low-contrast')}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                        currentTheme === 'low-contrast' ? activeStyles : inactiveStyles
                      }`}
                    >
                      <Eye className="h-4 w-4 shrink-0" /> Light Contrast
                    </button>
                    <button
                      onClick={() => handleThemeChange('low-contrast-dark')}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                        currentTheme === 'low-contrast-dark' ? activeStyles : inactiveStyles
                      }`}
                    >
                      <Eye className="h-4 w-4 shrink-0" /> Dark Contrast
                    </button>
                  </div>
                </div>

                {/* Row 3: Color Blind Adjustments */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-sans tracking-wider text-foreground-soft/70 uppercase font-medium">Color Adjustments</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleThemeChange('blue-yellow')}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all 
                        ${
                        currentTheme === 'blue-yellow' ? activeStyles : inactiveStyles
                      }`}
                    >
                      Blue / Yellow Filter
                    </button>
                    <button
                      onClick={() => handleThemeChange('green-magenta')}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                        currentTheme === 'green-magenta' ? activeStyles : inactiveStyles
                      }`}
                    >
                      Green / Magenta Filter
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
