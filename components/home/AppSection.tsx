'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import PhoneFrame from '../extra/PhoneFrame';
import GooglePlayIcon from '../extra/GooglePlayIcon';

interface AppSlide {
  id: number;
  badge: string;
  title: string;
  description: string;
  imageSrc: string;
  appType: 'upload' | 'visualizer';
  actionButton?: React.ReactNode;
}

export default function AppSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides: AppSlide[] = [
    {
      id: 0,
      badge: "OSP Upload App",
      title: "Tamper-evident Media Capture Directly From the Field",
      description: "Record videos and capture images to upload directly to the live map and get paid for your contributions. The complete set of sensor readings are attached to each upload alongside robust device verification.",
      imageSrc: "/OSP-Upload-Screenshot.png",
      appType: 'upload',
      actionButton: (
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-neutral-400 font-sans text-xs font-semibold border border-neutral-800">
          <GooglePlayIcon className="w-3.5 h-3.5" /> Google Play Store (Coming Soon)
        </div>
      )
    },
    {
      id: 1,
      badge: "Sensor Visualizer App",
      title: "Real-Time Sensor Visualizer",
      description: "Visualize the complete set of sensor data the OSP collects directly on your device. Learn which sensors your device supports to better understand how your captured media will be evaluate within the OSP.",
      imageSrc: "/OSP-Sensor-Visualizer.png",
      appType: 'visualizer',
      actionButton: (
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center self-start gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-neutral-400 font-sans text-xs font-semibold border border-neutral-800">
            <GooglePlayIcon className="w-3.5 h-3.5" /> Google Play Store (Coming Soon)
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[activeSlide];

  return (
    <section id="apps" className="w-full py-20 lg:py-28 bg-background relative overflow-hidden">
      
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Upcoming Mobile Applications
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="cursor-pointer shadow-sm p-3 rounded-full border border-foreground bg-card hover:bg-card-hover text-foreground transition-all"
              aria-label="Previous application slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="cursor-pointer shadow-sm p-3 rounded-full border border-foreground bg-card hover:bg-card-hover text-foreground transition-all"
              aria-label="Next application slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Double-Panel Slide Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Details panel */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* Slide Indicators */}
            <div className="flex gap-2">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeSlide ? 'w-8 bg-primary' : 'w-2 bg-border'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-snug">
              {active.title}
            </h3>

            <p className="font-sans text-sm md:text-base text-foreground-secondary leading-relaxed">
              {active.description}
            </p>

            <div className="pt-4 border-t border-border/10">
              {active.actionButton}
            </div>
          </div>

          {/* Right Column: Phone mock containing live screenshots */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <PhoneFrame screenClassName="bg-neutral-900 flex flex-col justify-between">
              
              {/* Fallback image */}
              <img 
                src={active.imageSrc} 
                alt={`${active.badge} screenshot mockup`} 
                className="w-full h-full object-cover rounded-3xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

            </PhoneFrame>
          </div>

        </div>

      </div>
    </section>
  );
}
