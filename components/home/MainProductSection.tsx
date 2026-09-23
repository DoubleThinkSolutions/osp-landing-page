'use client';

import Image from 'next/image';
import { Shield, Heart, Sparkles, ArrowUpRight } from 'lucide-react';

const TIERS = [
  {
    id: '01',
    name: 'The Signal',
    price: '$1',
    limit: 'No cap',
    badge: 'Supporter',
    image: '/tiers/role_01_signal_full_64.png',
    description: 'Backer-only updates, Discord invite, community titles & emojis, name on public backer wall.',
  },
  {
    id: '02',
    name: 'The Lens',
    price: '$10',
    limit: 'No cap',
    badge: '1 License',
    image: '/tiers/role_02_lens_full_64.png',
    description: '1 permanent license (1 device), 3-mo server waiver, upgraded titles. Unlocks printable stickers at $56k.',
  },
  {
    id: '03',
    name: 'The Witness',
    price: '$25',
    limit: 'No cap',
    badge: '2 Licenses',
    image: '/tiers/role_03_witness_full_64.png',
    description: '2 licenses (keep 1, gift 1), 6-mo server waiver. Unlocks 18x24 poster file.',
  },
  {
    id: '04',
    name: 'The Osprey',
    price: '$50',
    limit: 'No cap',
    badge: '5 Licenses',
    image: '/tiers/role_04_osprey_full_64.png',
    description: '5 licenses, 1-yr server waiver, BTS updates. Unlocks Aegis mascot enamel pin at $63k.',
  },
  {
    id: '05',
    name: 'The Guardian',
    price: '$100',
    limit: 'No cap',
    badge: '10 Licenses',
    image: '/tiers/role_05_guardian_full_64.png',
    description: '10 licenses, live team Q&A, app credits. Unlocks custom OSP hoodie at $74k.',
  },
  {
    id: '06',
    name: 'The Steward',
    price: '$500',
    limit: 'Limited to 30',
    badge: '50 Licenses',
    image: '/tiers/role_06_steward_full_64.png',
    description: '50 licenses, lifetime waiver, Aegis plushie & preconfigured Android testing device at $93k.',
  },
  {
    id: '07',
    name: 'The Whale',
    price: '$1,000',
    limit: 'Limited to 20',
    badge: '100 Licenses',
    image: '/tiers/role_07_whale_full_64.png',
    description: '100 licenses, lifetime waiver, named Founding Whale, enterprise preview & Founding Brain Trust seat.',
  },
];

export default function MainProductSection() {
  return (
    <section id="main-product" className="w-full py-20 lg:py-28 bg-background border-t border-border/20 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column: Product Introduction */}
        <div className="lg:col-span-6 flex flex-col space-y-6 text-left sticky top-12">
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
              <div className="p-2 rounded-lg bg-secondary border border-border/40 text-secondary-foreground shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-foreground">Sensor-Bound Capture</h4>
                <p className="font-sans text-xs text-foreground-secondary mt-1">Signs video with your device's full sensor bundle at the moment of capture.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2 rounded-lg bg-secondary border border-border/40 text-secondary-foreground shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-foreground">Quiet Generosity</h4>
                <p className="font-sans text-xs text-foreground-secondary mt-1">Fund licenses anonymously for people on the ground who need it.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Full Tier List */}
        <div className="lg:col-span-6 w-full flex items-center justify-center">
          <div className="w-full max-w-lg bg-secondary border border-border/30 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col space-y-6 relative">

            {/* Header */}
            <div className="border-b border-border/10 pb-5">
              <h3 className="font-display text-2xl font-bold text-foreground mt-1">Get OSP on Kickstarter</h3>
              <p className="font-sans text-xs text-foreground-secondary mt-2">
                Support our campaign to secure your lifetime licenses. Higher tiers buy it forward for those who need it.
              </p>
            </div>

            {/* Scrollable Container with custom scrollbar */}
            <div className="max-h-95 overflow-y-auto pr-1.5 space-y-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">

              {TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className="flex items-start justify-between p-3.5 rounded-xl bg-background border border-border/20 gap-3 hover:border-border/40 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden bg-secondary/50 border border-border/10">
                      <Image
                        src={tier.image}
                        alt={`${tier.name} icon`}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <p className="font-sans text-xs font-bold text-foreground truncate">{tier.name}</p>
                        <span className="font-sans text-xs font-extrabold text-primary">{tier.price}</span>
                      </div>
                      <p className="font-sans text-[11px] text-foreground-secondary mt-0.5 line-clamp-2 leading-snug">
                        {tier.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 gap-1">
                    <span className="font-sans text-[10px] font-bold text-foreground-secondary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {tier.badge}
                    </span>
                    <span className="font-sans text-[9px] text-foreground-secondary/70">
                      {tier.limit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer and Kickstarter Button */}
            <div className="pt-2 border-t border-border/10">
              <p className="font-sans text-[10.5px] text-foreground-secondary italic text-center mb-4 leading-normal">
                * Note: Tiers unlock additional stretch rewards and community perks as backer milestones are reached.
              </p>

              <a
                href="https://www.kickstarter.com/projects/opensourcepanopticon/the-open-source-panopticon-osp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-sans text-xs font-bold tracking-wider uppercase border border-primary-border/20 hover:bg-primary-hover transition-all shadow-md cursor-pointer"
              >
                <span>Get Your License</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}