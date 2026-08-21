'use client';

import React from 'react';
import Link from 'next/link'; // Import Next.js Link
import { ExternalLink } from 'lucide-react';
import OspLogo from '../extra/OspLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background relative z-10 border-t border-border/25 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Upper Layout: Brand and Directory link system */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-border/20">
          
          {/* Brand block */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <a
              href="#"
              onClick={handleScrollToTop}
              className="flex items-center gap-2.5 self-start group"
              aria-label="Back to top"
            >
              <OspLogo />
              <div className="flex flex-col">
                <span className="font-display text-lg font-extrabold tracking-wider leading-none text-foreground">
                  OSP
                </span>
                <span className="font-sans text-[9px] uppercase tracking-widest font-semibold text-foreground-soft/85">
                  Truth Before Narrative
                </span>
              </div>
            </a>
            <p className="font-sans text-sm text-foreground-secondary leading-relaxed max-w-sm">
              Empowering global consensus by creating media verification pipelines and robust sensor SDKs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-xs font-bold tracking-widest text-foreground uppercase">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/#kickstarter" className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors">
                  Kickstarter Campaign
                </Link>
              </li>
              <li>
                <Link href="/#web-map" className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors">
                  Interactive Map Explorer
                </Link>
              </li>
              <li>
                <Link href="/#apps" className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors">
                  Mobile Application Suite
                </Link>
              </li>
              <li>
                <Link href="/#api-sdk" className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors">
                  API & Developer Kits
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-xs font-bold tracking-widest text-foreground uppercase">
              Social
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://www.twitch.tv/doublethinksolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  Twitch
                </a>
              </li>
              <li>
                <a
                  href=" https://www.facebook.com/profile.php?id=61592794764590"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/StopDoublethink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/doublethinksolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/doublethink-solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/doublethinksolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-foreground-secondary hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Layout: Regulatory, Attribution & Compliance details */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-xs text-foreground-soft/80">
            <span>© {currentYear} Open Source Panopticon. All rights reserved.</span>
            <span className="hidden md:inline text-border/40">|</span>
            <Link href="https://doublethinksolutions.com/privacy" className="hover:text-foreground transition-colors focus:underline">
              Privacy Policy
            </Link>
          </div>

          <div className="text-xs text-foreground-soft/85 flex items-center gap-1.5 font-sans">
            <span>Developed by</span>
            <a
              href="https://doublethinksolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:underline transition-colors inline-flex items-center gap-0.5 border-b border-primary/20 pb-0.5 hover:border-primary"
            >
              Doublethink Solutions
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
