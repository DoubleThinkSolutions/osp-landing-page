'use client';

import Image from 'next/image';

interface GooglePlayIconProps {
  className?: string;
  size?: number;
}

export default function GooglePlayIcon({ className = "w-3.5 h-3.5", size = 14 }: GooglePlayIconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <Image 
        src="/google-play-store-logo.svg"
        alt="Google Play Icon" 
        width={size} 
        height={size} 
        className="object-contain"
        priority
      />
    </div>
  );
}
