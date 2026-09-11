'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OspLogo from '../extra/OspLogo';

export default function BrandLogo() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const logoContent = (
    <>
      <OspLogo />
      <div className="flex flex-col">
        <span className="font-display text-lg font-extrabold tracking-wider leading-none text-foreground">
          OSP
        </span>
        <span className="font-sans text-[9px] uppercase tracking-widest font-semibold text-foreground-secondary/85">
          Truth Before Narrative
        </span>
      </div>
    </>
  );

  return (
    <div className="fixed flex top-5.5 pl-0 pr-3 left-4 z-40 pointer-events-auto bg-card/40 border border-border/30 rounded-full backdrop-blur-sm shadow-sm">
      {isHomePage ? (
        <div className="flex items-center gap-2.5 rounded-lg select-none">
          {logoContent}
        </div>
      ) : (
        <Link
          href="/"
          className="flex items-center gap-2.5 group rounded-lg"
          aria-label="Open Source Panopticon Home"
        >
          {logoContent}
        </Link>
      )}
    </div>
  );
}
