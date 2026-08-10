'use client';

import { Shield, Heart, Check, Sparkles, ArrowUpRight } from 'lucide-react';

export default function MainProductSection() {

  return (
    <section id="main-product" className="w-full py-20 lg:py-28 bg-background border-t border-border/20 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Product Introduction */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary self-start">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-sans text-[10px] font-bold tracking-wider uppercase">The Core Ecosystem</span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Falsifiable Evidence, Captured at the Source
          </h2>
          
          <p className="font-sans text-sm md:text-base text-foreground-secondary leading-relaxed max-w-2xl">
            OSP is a dedicated camera app that signs your video, frame by frame, using your device's raw physical sensor suite at the exact millisecond of capture. By locking physical telemetry directly into the video data, recording truth becomes cheaper than maintaining a lie.
          </p>

          {/* Core App Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex gap-3 items-start">
              <div className="p-2 rounded-lg bg-secondary border border-border/40 text-secondary-foreground">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-foreground">Sensor-Bound Capture</h4>
                <p className="font-sans text-xs text-foreground-secondary mt-1">Signs video with your device's full sensor bundle at the moment of capture."</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2 rounded-lg bg-secondary border border-border/40 text-secondary-foreground">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-foreground">Quiet Generosity</h4>
                <p className="font-sans text-xs text-foreground-secondary mt-1">Fund licenses anonymously for people on the ground who need it.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Buy It Forward Interactive Card */}
        <div className="lg:col-span-5 w-full flex items-center justify-center">
          <div className="w-full max-w-md bg-secondary border border-border/30 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col space-y-6 relative">
            
            {/* Header */}
            <div className="border-b border-border/10 pb-5">
              <h3 className="font-display text-2xl font-bold text-foreground mt-1">Get OSP on Kickstarter</h3>
              <p className="font-sans text-xs text-foreground-secondary mt-2">
                Support our campaign to secure your lifetime licenses. Higher tiers buy it forward for those who need it.
              </p>
            </div>

            {/* Estimated Tiers List */}
            <div className="space-y-3">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-foreground-secondary mb-1">
                Estimated Rewards & Tiers
              </h4>

              {/* $10 Tier */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/20">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-sans text-xs font-bold text-foreground">$10 Tier</p>
                    <p className="font-sans text-[10px] text-foreground-secondary">1x Core License</p>
                  </div>
                </div>
                <span className="font-sans text-xs font-semibold text-foreground-secondary">Base Tier</span>
              </div>

              {/* $25 Tier */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/20">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-sans text-xs font-bold text-foreground">$25 Tier</p>
                    <p className="font-sans text-[10px] text-foreground-secondary">1x License + 2 sponsored extra keys</p>
                  </div>
                </div>
                <span className="font-sans text-xs font-bold text-foreground-secondary bg-primary/10 px-2 py-0.5 rounded-full">3 Keys Total</span>
              </div>

              {/* $50 Tier */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/20">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-sans text-xs font-bold text-foreground">$50 Tier</p>
                    <p className="font-sans text-[10px] text-foreground-secondary">1x License + 5 sponsored extra keys</p>
                  </div>
                </div>
                <span className="font-sans text-xs font-bold text-foreground-secondary bg-primary/10 px-2 py-0.5 rounded-full">6 Keys Total</span>
              </div>

              {/* $100 Tier */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/20">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-sans text-xs font-bold text-foreground">$100 Tier</p>
                    <p className="font-sans text-[10px] text-foreground-secondary">1x License + 10 sponsored extra keys</p>
                  </div>
                </div>
                <span className="font-sans text-xs font-bold text-foreground-secondary bg-primary/10 px-2 py-0.5 rounded-full">11 Keys Total</span>
              </div>
            </div>

            {/* Disclaimer and Kickstarter Button */}
            <div className="pt-2">
              <p className="font-sans text-[10.5px] text-foreground-secondary italic text-center mb-4 leading-normal">
                * Note: Tiers unlock rewards and incentives in addition to the keys.
              </p>

              {/* <a 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-sans text-xs font-bold tracking-wider uppercase border border-primary-border/20 hover:bg-primary-hover transition-all shadow-md cursor-pointer"
              >
                <span>Get Your License</span>
                <ArrowUpRight className="w-4 h-4" />
              </a> */}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
