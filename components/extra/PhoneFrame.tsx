'use client';

import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
}

export default function PhoneFrame({ children, className = '', screenClassName = '' }: PhoneFrameProps) {
  return (
    <div className={`relative mx-auto select-none w-full max-w-77.5 ${className}`}>
      <div className="relative w-full aspect-9/19">
        
        {/* Outer Case & Bezel */}
        <div className="relative z-10 w-full h-full rounded-[44px] sm:rounded-[48px] border-8 sm:border-10 border-foreground-secondary bg-foreground shadow-2xl ring-1 ring-foreground-soft/50 flex flex-col overflow-hidden">
          
          {/* Ear Speaker Grill */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 sm:w-12 h-1 bg-foreground-secondary rounded-full z-30" />

          {/* Device Screen Area */}
          <div className={`relative flex-1 w-full h-full bg-foreground overflow-hidden rounded-[34px] sm:rounded-[38px] ${screenClassName}`}>
            
            {/* Glare/Shine Effect Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/3 to-white/8 pointer-events-none z-20 rounded-[34px] sm:rounded-[38px]" />
            
            {/* Screen Content */}
            <div className="w-full h-full relative z-10">
              {children}
            </div>


            
          </div>

        </div>

        {/* Volume Up */}
        <div className="absolute -left-1 top-[20%] w-1 h-8 sm:h-10 bg-foreground-secondary rounded-l-md border-y border-l border-foreground-soft/40 pointer-events-none z-0" />
        {/* Volume Down */}
        <div className="absolute -left-1 top-[30%] w-1 h-8 sm:h-10 bg-foreground-secondary rounded-l-md border-y border-l border-foreground-soft/40 pointer-events-none z-0" />
        {/* Power/Side Button */}
        <div className="absolute -right-1 top-[25%] w-1 h-12 sm:h-14 bg-foreground-secondary rounded-r-md border-y border-r border-foreground-soft/40 pointer-events-none z-0" />

      </div>
    </div>
  );
}