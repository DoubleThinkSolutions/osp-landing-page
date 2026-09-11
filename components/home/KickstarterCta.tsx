'use client';

import { ChevronRight } from 'lucide-react';

export default function KickstarterCta() {
  return (
    <section className="w-full py-12 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side text */}
        <div className="flex flex-col text-left">
          <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight">
            Ready to secure trust online?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-secondary-foreground/80 mt-1">
            Support our kickstarter and get exclusive access, rewards and licenses.
          </p>
        </div>

        {/* Right Side action link */}
        <div>
          <a
            href="https://www.kickstarter.com/projects/opensourcepanopticon/the-open-source-panopticon-osp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-background text-foreground font-sans text-xs font-bold tracking-wider uppercase border border-foreground hover:opacity-95 shadow-md transition-all group"
          >
            Support Kickstarter
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
