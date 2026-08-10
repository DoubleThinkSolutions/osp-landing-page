'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { AudioProvider } from './AudioContext';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full min-h-screen bg-gray-700" aria-hidden="true" />
    );
  }

  return (
    <AudioProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AudioProvider>
  );
}
