'use client';

import { ExternalLink } from 'lucide-react';

export default function WebsiteSection() {
  return (
    <section id="web-map" className="w-full py-20 lg:py-28 bg-secondary border-y border-border/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Descriptions */}
        <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Explore Verified Media on the OSP Map Platform
          </h2>
          <p className="font-sans text-sm md:text-base text-foreground-secondary leading-relaxed">
            The beta OSP map is live for demonstration purposes. Watch as media gets uploaded live or filter for a specific time down to the minute. View the sensor data and watch it change frame by frame.
          </p>
          <div>
            <a
              href="https://osp.doublethinksolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-sans text-xs font-bold tracking-wider uppercase border border-primary-border/20 hover:bg-primary-hover transition-all"
            >
              Launch Interactive Map
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: High-Fidelity Laptop Display Shell */}
        <div className="lg:col-span-7 w-full flex items-center justify-center py-6">
          <div className="flex flex-col items-center relative select-none w-full max-w-lg">
            
            {/* Desktop Laptop Monitor Container */}
            <div className="w-full aspect-16/10 bg-foreground border-[6px] border-foreground-secondary rounded-t-3xl p-1.5 shadow-2xl relative">
              <div className="w-full h-full bg-foreground rounded-xl relative overflow-hidden flex items-center justify-center border border-foreground-secondary">
                <img 
                  src="/OSP-Web-Screen.png" 
                  alt="OSP Web Platform Dashboard" 
                  className="w-full h-full object-cover opacity-90"
                />

                <a
                  href="https://osp.doublethinksolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute flex items-center gap-2 bg-background/90 hover:bg-background text-foreground px-5 py-2.5 rounded-xl shadow-xl text-xs font-semibold tracking-wide transition-all hover:scale-[1.03] backdrop-blur-sm border border-border"
                >
                  <span>Visit Web Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Laptop Base Stand */}
            <div className="w-[108%] h-3 bg-foreground-secondary rounded-b-xl relative shadow-md">
              <div className="w-20 h-1 bg-foreground rounded-full mx-auto mt-px" />
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
