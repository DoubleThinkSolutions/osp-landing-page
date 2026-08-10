'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ApiSdkSection() {
  return (
    <section id="api-sdk" className="w-full py-20 lg:py-28 bg-secondary border-t border-border/25">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Upload & Verification SDK
          </h2>
          <p className="font-sans text-sm md:text-base text-foreground-secondary leading-relaxed mt-4">
            Developer tools will be made available to build OSP media verification directly within your application.
          </p>
        </div>

        {/* Use Cases Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Use Case 1: Social Media Apps */}
          <div className="p-6 rounded-2xl bg-card border border-border/60 flex flex-col justify-between h-full group hover:border-foreground/40 transition-all duration-300">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-display text-lg font-bold tracking-wide text-foreground mb-2">
                  Social Media Apps
                </h3>
                <p className="font-sans text-xs text-foreground-secondary leading-relaxed">
                  Upload content captured directly within your social media app. Use the SDK to upload and verify content, ensuring trust within your application.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/10">
              <Link
                href="/contact?topic=sdk_api"
                className="inline-flex items-center gap-1 text-xs font-bold text-card-foreground-hover uppercase tracking-wider font-sans group-hover:underline"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Use Case 2: Local Sale Apps */}
          <div className="p-6 rounded-2xl bg-card border border-border/60 flex flex-col justify-between h-full group hover:border-foreground/40 transition-all duration-300">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-display text-lg font-bold tracking-wide text-foreground mb-2">
                  Local Marketplaces
                </h3>
                <p className="font-sans text-xs text-foreground-secondary leading-relaxed">
                  Use the OSP to verify uploaded images of marketplace items are genuine and unedited.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/10">
              <Link
                href="/contact?topic=sdk_api"
                className="inline-flex items-center gap-1 text-xs font-bold text-card-foreground uppercase tracking-wider font-sans group-hover:underline"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Use Case 3: News & Media Reporting */}
          <div className="p-6 rounded-2xl bg-card border border-border/60 flex flex-col justify-between h-full group hover:border-foreground/40 transition-all duration-300">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-display text-lg font-bold tracking-wide text-foreground mb-2">
                  News & Media
                </h3>
                <p className="font-sans text-xs text-foreground-secondary leading-relaxed">
                  The OSP can help journalists ensure captured media is genuine. Build the SDK into stringer upload applications to ensure trust accross the network.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/10">
              <Link
                href="/contact?topic=sdk_api"
                className="inline-flex items-center gap-1 text-xs font-bold text-card-foreground uppercase tracking-wider font-sans group-hover:underline"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Use Case 4: Package Delivery Verification */}
          <div className="p-6 rounded-2xl bg-card border border-border/60 flex flex-col justify-between h-full group hover:border-foreground/40 transition-all duration-300">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-display text-lg font-bold tracking-wide text-foreground mb-2">
                  Delivery Verification
                </h3>
                <p className="font-sans text-xs text-foreground-secondary leading-relaxed">
                  Prevent delivery fraud by ensuring packages are delivered and at the correct location
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/10">
              <Link
                href="/contact?topic=sdk_api"
                className="inline-flex items-center gap-1 text-xs font-bold text-card-foreground uppercase tracking-wider font-sans group-hover:underline"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
