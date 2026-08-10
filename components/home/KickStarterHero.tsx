'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import LandscapePhoneFrame from '../extra/LandscapePhoneFrame';

export default function KickstarterHero() {
  const [isRecording, setIsRecording] = useState(true);
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

  return (
    <section id="kickstarter" className="relative w-full h-screen min-h-150 sm:min-h-187.5 overflow-hidden bg-transparent flex items-center justify-center">

      {/* MAIN SCREEN WRAPPER */}
      <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10">
        
        {/* Fullscreen Horizontal Phone Node container */}
        <div className="w-full max-w-5xl aspect-video relative px-4">
          <LandscapePhoneFrame className="w-full h-full" screenClassName="relative">
            
            {/* VIRTUAL GLASS VISIBILITY */}
            <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

            {/* CAMERA UI HUD OVERLAY */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none z-20 font-mono text-[10px] text-white/70 tracking-widest uppercase">
              
              {/* Dynamic Status Indicator */}
              <div className="flex items-center gap-2 select-none">
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isRecording ? 'bg-red-600/90 animate-pulse' : 'bg-gray-300/90'
                }`} />
              </div>

              {/* Dynamic Time Display */}
              <div className="text-center text-xs font-bold font-sans tabular-nums select-none">
                {formatTime(seconds)}
              </div>

              {/* Grid Lines Overlay */}
              <div className="absolute inset-y-0 left-1/3 border-r border-white/5 pointer-events-none" />
              <div className="absolute inset-y-0 left-2/3 border-r border-white/5 pointer-events-none" />
              <div className="absolute inset-x-0 top-1/3 border-b border-white/5 pointer-events-none" />
              <div className="absolute inset-x-0 top-2/3 border-b border-white/5 pointer-events-none" />

              {/* Camera Shutter / Capture Button UI Column */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-auto">
                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`cursor-pointer w-14 h-14 rounded-full border-4 flex items-center justify-center bg-transparent transition-all hover:scale-105 active:scale-95 group border-red-600/70`}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                  <div className={`transition-all duration-300 bg-red-600/70 ${
                    isRecording 
                      ? 'w-5 h-5 rounded-sm' 
                      : 'w-6 h-6 rounded-full'
                  }`} />
                </button>
              </div>
            </div>

            {/* HERO CORE INTERACTION LAYER */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-start pl-12 pr-28 text-left select-text">
              
              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-xl leading-[1.1] mb-3">
                PRESERVE TRUTH.<br />VERIFY THE WORLD.
              </h1>

              <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed mb-6">
                Contribute directly by supporting our kickstarter. Learn about our upcoming apps and developer tools below.
              </p>

              <div className="flex items-center gap-3 w-full">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-sans text-[11px] font-bold tracking-wider uppercase border border-primary-border/40 hover:bg-primary-hover shadow-lg transition-all flex items-center gap-1.5"
                >
                  Kickstarter Coming Soon ...
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#main-product"
                  className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans text-[11px] font-bold tracking-wider uppercase border border-white/10 backdrop-blur-sm transition-all"
                >
                  Learn More
                </a>
              </div>

            </div>

          </LandscapePhoneFrame>
        </div>

      </div>
    </section>
  );
}
