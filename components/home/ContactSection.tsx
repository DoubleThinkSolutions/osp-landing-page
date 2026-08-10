'use client';

import { ArrowUpRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-20 lg:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <div className="inline-flex items-center gap-1.5 text-primary text-xs uppercase font-bold tracking-widest mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          Get In Touch
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
          Connect With Our Team
        </h2>
        <p className="font-sans text-sm sm:text-base text-foreground-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          Have a question, feedback, or a project in mind? Send a message using the form below and we'll get back to you as soon as possible. We're here to help.
        </p>

        {/* Action Blocks */}
        <div className="gap-4 items-center flex justify-center max-w-xl mx-auto">

          <Link
            href="/contact?topic=general"
            className="flex flex-col w-fit items-center justify-center p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-foreground/40 hover:shadow-md transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-secondary text-primary-foreground flex items-center justify-center mb-4">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span className="font-sans text-sm font-bold text-foreground">
              Dedicated Inquiry Form
            </span>
            <span className="font-sans text-xs text-foreground-secondary/80 mt-1">
              Submit a support ticket
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}
