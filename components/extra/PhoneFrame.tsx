'use client';

import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
}

export default function PhoneFrame({ children, className = '', screenClassName = '' }: PhoneFrameProps) {
  return (
    <div className={`relative mx-auto select-none ${className}`}>
      {/* Outer Case & Bezel shadow shadow */}
      <div className="relative mx-auto w-70 h-142.5 sm:w-77.5 sm:h-157.5 rounded-[48px] border-10 border-foreground-secondary bg-foreground shadow-2xl ring-1 ring-foreground-soft/50 flex flex-col overflow-hidden">

        {/* Ear Speaker Grill */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-foreground-secondary rounded-full z-30" />

        {/* Device Screen Area */}
        <div className={`relative flex-1 w-full h-full bg-foreground overflow-hidden rounded-[38px] ${screenClassName}`}>
          
          {/* Glare/Shine Effect Overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/3 to-white/8 pointer-events-none z-20 rounded-[38px]" />
          
          {/* Screen Content */}
          <div className="w-full h-full relative z-10">
            {children}
          </div>
          
        </div>
      </div>

      {/* Physical Side Buttons Accents */}
      {/* Volume Up */}
      <div className="absolute -left-0.75 top-30 w-0.75 h-10 bg-foreground-secondary rounded-l-md border-y border-l border-foreground-soft/40" />
      {/* Volume Down */}
      <div className="absolute -left-0.75 top-43.75 w-0.75 h-10 bg-foreground-secondary rounded-l-md border-y border-l border-foreground-soft/40" />
      {/* Power/Side Button */}
      <div className="absolute -right-0.75 top-36.25 w-0.75 h-15 bg-foreground-secondary rounded-r-md border-y border-r border-foreground-soft/40" />
    </div>
  );
}
