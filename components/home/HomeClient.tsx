'use client';

import { useEffect, useRef, useState, ReactNode } from "react";
import ApiSdkSection from "./ApiSdkSection";
import AppSection from "./AppSection";
import ContactSection from "./ContactSection";
import KickstarterCta from "./KickstarterCta";
import KickstarterHero from "./KickStarterHero";
import MainProductSection from "./MainProductSection";
import WebsiteSection from "./WebsiteSection";

function FadeInSection({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

export default function HomeClient() {
  const [isRecording, setIsRecording] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isRecording) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isRecording]);

  return (
    <div className="relative min-h-screen w-full">
      
      <div className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <div className="absolute inset-0 bg-black/40 z-1" />
        <div className="w-full h-full scale-105 blur-2xl opacity-75">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://pub-11b357cbfb5a4c3992338b71754ea5ba.r2.dev/OSP-landing-page-background.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="relative z-10 w-full">
        <KickstarterHero isRecording={isRecording} setIsRecording={setIsRecording} />
        
        {/* Animated subsequent sections */}
        <FadeInSection><MainProductSection /></FadeInSection>
        <FadeInSection><WebsiteSection /></FadeInSection>
        <FadeInSection><AppSection /></FadeInSection>
        <FadeInSection><ApiSdkSection /></FadeInSection>
        <FadeInSection><ContactSection /></FadeInSection>
        <FadeInSection><KickstarterCta /></FadeInSection>
      </div>
      
    </div>
  );
}
