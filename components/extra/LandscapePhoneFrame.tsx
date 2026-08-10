'use client';

import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
}

export default function LandscapePhoneFrame({ children, className = '', screenClassName = '' }: PhoneFrameProps) {
  return (
    <div className={`relative mx-auto select-none ${className}`}>
      {/* Outer Case & Bezel - Flipped to Landscape: aspect ratio shifted to w-[630px] h-[310px] via classes */}
      <div className="relative w-full h-full rounded-[48px] border-10 border-foreground-secondary bg-foreground/40 backdrop-blur-sm shadow-2xl ring-1 ring-neutral-700/50 flex overflow-hidden">
        
        {/* Dynamic Island / Notch (Rotated to left side for Landscape) */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-28 bg-foreground rounded-full z-30 flex flex-col items-center justify-between py-3.5">
          {/* Camera lens indicator */}
          <div className="w-2.5 h-2.5 rounded-full bg-foreground-secondary/80 border border-foreground-soft/30" />
          {/* Sensor indicator */}
          <div className="w-1.5 h-1.5 rounded-full bg-foreground-secondary/60" />
        </div>

        {/* Ear Speaker Grill (Rotated to far left) */}
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-foreground rounded-full z-30" />

        {/* Device Screen Area - Transparent bg-transparent allowed here */}
        <div className={`relative flex-1 w-full h-full bg-transparent overflow-hidden rounded-[38px] ${screenClassName}`}>
          
          {/* Glare/Shine Effect Overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/2 to-white/6 pointer-events-none z-20 rounded-[38px]" />
          
          {/* Screen Content */}
          <div className="w-full h-full relative z-10">
            {children}
          </div>
          
        </div>

        {/* Home Indicator Bar (Rotated to right edge in landscape) */}
        <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-1 h-28 bg-foreground/40 rounded-full z-30" />
      </div>

      {/* Physical Buttons (Adjusted for landscape positions) */}
      {/* Power Button (Now on Top right side) */}
      <div className="absolute left-36.25 -top-0.75 w-15 h-0.75 bg-foreground-secondary rounded-t-md border-x border-t border-foreground-soft/40" />
      {/* Volume Buttons (Now on Bottom left sides) */}
      <div className="absolute left-30 -bottom-0.75 w-10 h-0.75 bg-foreground-secondary rounded-b-md border-x border-b border-foreground-soft/40" />
      <div className="absolute left-43.75 -bottom-0.75 w-10 h-0.75 bg-foreground-secondary rounded-b-md border-x border-b border-foreground-soft/40" />
    </div>
  );
}
