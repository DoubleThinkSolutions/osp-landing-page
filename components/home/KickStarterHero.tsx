'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import LandscapePhoneFrame from '../extra/LandscapePhoneFrame';
import PhoneFrame from '../extra/PhoneFrame';

interface KickstarterHeroProps {
  isRecording: boolean;
  setIsRecording: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function KickstarterHero({ isRecording, setIsRecording }: KickstarterHeroProps) {
  const [seconds, setSeconds] = useState(12 * 3600 + 43 * 60); // Starting at 00:12:43 as per original UI

  // Handle the live timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      // Reset the timer when recording stops
      setSeconds(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Helper function to format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const renderPhoneInnerContent = () => (
    <>
      {/* VIRTUAL GLASS VISIBILITY */}
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

      {/* CAMERA UI HUD OVERLAY */}
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between pointer-events-none z-20 font-mono text-[10px] text-white/70 tracking-widest uppercase">
        {/* Dynamic Status Indicator & Timer Header */}
        <div className="flex items-center justify-between w-full select-none">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isRecording ? 'bg-red-600/90 animate-pulse' : 'bg-gray-300/90'
              }`}
            />
          </div>

          <div className="text-center text-xs font-bold font-sans tabular-nums select-none">
            {formatTime(seconds)}
          </div>
        </div>

        {/* Grid Lines Overlay */}
        <div className="absolute inset-y-0 left-1/3 border-r border-white/5 pointer-events-none" />
        <div className="absolute inset-y-0 left-2/3 border-r border-white/5 pointer-events-none" />
        <div className="absolute inset-x-0 top-1/3 border-b border-white/5 pointer-events-none" />
        <div className="absolute inset-x-0 top-2/3 border-b border-white/5 pointer-events-none" />

        {/* Camera Shutter Button: Bottom on mobile vertical, Right side on desktop landscape */}
        <div className="absolute bottom-6 md:bottom-auto left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:top-1/2 md:-translate-y-1/2 flex flex-col items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className="cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full border-4 flex items-center justify-center bg-transparent transition-all hover:scale-105 active:scale-95 group border-red-600/70"
            aria-label={isRecording ? 'Pause recording' : 'Resume recording'}
            title={isRecording ? 'Pause recording and background video' : 'Resume recording and background video'}
          >
            <div
              className={`transition-all duration-300 bg-red-600/70 ${
                isRecording ? 'w-4 h-4 md:w-5 md:h-5 rounded-sm' : 'w-5 h-5 md:w-6 md:h-6 rounded-full'
              }`}
            />
          </button>
        </div>
      </div>

      {/* HERO CORE INTERACTION LAYER */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center md:items-start px-6 pb-16 md:pb-0 md:pl-12 md:pr-28 text-center md:text-left select-text">
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-xl leading-[1.1] mb-3">
          PRESERVE TRUTH.
          <br />
          VERIFY THE WORLD.
        </h1>

        <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed mb-6">
          Contribute directly by supporting our kickstarter. Learn about our upcoming apps and developer tools below.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a
            href="https://www.kickstarter.com/projects/opensourcepanopticon/the-open-source-panopticon-osp"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-sans text-[11px] font-bold tracking-wider uppercase border border-primary-border/40 hover:bg-primary-hover shadow-lg transition-all flex items-center gap-1.5"
          >
            Support Kickstarter
            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#main-product"
            className="w-full sm:w-auto text-center px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans text-[11px] font-bold tracking-wider uppercase border border-white/10 backdrop-blur-sm transition-all"
          >
            Learn More
          </a>
        </div>
      </div>
    </>
  );

  return (
    <section
      id="kickstarter"
      className="relative w-full min-h-screen py-8 md:py-0 overflow-hidden bg-transparent flex items-center justify-center"
    >
      {/* MAIN SCREEN WRAPPER */}
      <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10">
        {/* MOBILE VERTICAL FRAME (< md) */}
        <div className="block md:hidden w-full max-w-xs">
          <PhoneFrame className="w-full" screenClassName="relative">
            {renderPhoneInnerContent()}
          </PhoneFrame>
        </div>

        {/* DESKTOP LANDSCAPE FRAME (>= md) */}
        <div className="hidden md:block w-full max-w-5xl aspect-video relative px-4">
          <LandscapePhoneFrame className="w-full h-full" screenClassName="relative">
            {renderPhoneInnerContent()}
          </LandscapePhoneFrame>
        </div>
      </div>
    </section>
  );
}
