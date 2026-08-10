'use client';

import Image from 'next/image';
import { useTheme } from '../../context/ThemeProvider';

export default function OspLogo() {
  const { theme } = useTheme();
  
  const isInvertedTheme = ['dark', 'blue-yellow', 'green-magenta'].includes(theme);
  const logoSrc = isInvertedTheme ? "/OSP_icon_large_inverted.png" : "/OSP_icon_large.png";

  return (
    <div className="relative flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden transition-transform group-hover:scale-[1.02]">
      <Image 
        src={logoSrc} 
        alt="OSP Logo" 
        width={40} 
        height={40} 
        className="object-contain"
        priority
      />
    </div>
  );
}
