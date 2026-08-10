'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Kickstarter', href: '#kickstarter' },
  { label: 'Web Map', href: '#web-map' },
  { label: 'Mobile Apps', href: '#apps' },
  { label: 'API & SDK', href: '#api-sdk' },
  { label: 'Contact', href: '#contact' },
];

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname !== '/') {
    return null;
  }

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        setIsOpen(false);
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-40 p-4 md:p-6 w-full max-w-7xl flex justify-center pointer-events-none">
      {/* Container holding the bar items re-enables layout pointer events */}
      <div className="flex items-center gap-4 pointer-events-auto">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-card/40 border border-border/30 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase font-sans text-foreground-secondary hover:text-foreground hover:bg-primary/10 transition-all focus:outline-none focus:ring-2 focus:ring-primary/35"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Action Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer lg:hidden p-2 rounded-lg border border-primary-border bg-card/60 text-foreground hover:bg-card/90 transition-all"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="lg:hidden fixed inset-x-0 bottom-0 top-20 left-20 right-20 z-30 pointer-events-auto"
          >
            <div className="flex flex-col px-8 py-8 gap-6 h-fit bg-card/90 rounded-2xl">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-xl rounded-2xl text-center font-display font-bold tracking-wide text-foreground hover:bg-secondary transition-colors py-1 focus:outline-none"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
