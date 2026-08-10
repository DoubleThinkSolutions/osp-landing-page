'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type FormType = 'general' | 'sdk_api';
type FormState = 'idle' | 'loading' | 'success' | 'error';

const getInitialTopic = (searchParams: URLSearchParams | null): FormType => {
  const topicParam = searchParams?.get('topic');
  if (topicParam === 'sdk_api' || topicParam === 'general') {
    return topicParam as FormType;
  }
  return 'general';
};

export default function OspContactPage() {
  const searchParams = useSearchParams();
  
  const [topic, setTopic] = useState<FormType>(() => getInitialTopic(searchParams));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company: company || null,
          message,
          formType: topic,
          source: `OSP Portal: /contact?topic=${topic}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server processing error.');
      }

      setFormState('success');
    } catch (err) {
      setFormState('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    }
  };

  const handleReset = () => {
    setFormState('idle');
    setErrorMessage('');
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
  };

  return (
    <main className="w-full min-h-screen bg-background py-16 md:py-24 flex items-center">
      <div className="max-w-3xl mx-auto px-6 w-full">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Connect With Our Team
          </h1>
          <p className="font-sans text-sm sm:text-base text-foreground-secondary max-w-xl mx-auto leading-relaxed">
            Have a general question about OSP or want to learn more about our upcoming SDK and integration APIs? Fill out the form below.
          </p>
        </div>

        {/* Success Screen */}
        {formState === 'success' ? (
          <div className="p-8 md:p-12 rounded-2xl bg-card border border-border shadow-sm text-center max-w-xl mx-auto animate-fade-in">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">
              Message Sent
            </h3>
            <p className="font-sans text-sm text-foreground-secondary leading-relaxed mb-6">
              Thank you for reaching out. We appreciate your interest in OSP, and our team will get back to your inquiry via email shortly.
            </p>
            <button
              onClick={handleReset}
              className="cursor-pointer hover:bg-secondary inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-foreground text-xs font-bold tracking-wider uppercase transition-colors duration-200"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          /* Contact Form */
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-10 rounded-2xl bg-card border border-border shadow-sm max-w-xl mx-auto space-y-6"
          >
            {/* Topic Select Dropdown */}
            <div className="space-y-2">
              <label htmlFor="topic" className="block font-sans text-xs font-bold text-foreground uppercase tracking-widest">
                What are you looking to discuss?
              </label>
              <Select
                value={topic}
                onValueChange={(value) => setTopic(value as FormType)}
              >
                <SelectTrigger id="topic" className="w-full px-4 py-6 rounded-xl bg-secondary/50 border border-border/80 focus:border-primary/50 text-foreground font-body text-sm transition-colors focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border bg-card text-card-foreground shadow-md">
                  <SelectItem value="general" className="rounded-lg cursor-pointer hover:bg-secondary">
                    General Support & Partnerships
                  </SelectItem>
                  <SelectItem value="sdk_api" className="rounded-lg cursor-pointer hover:bg-secondary">
                    Questions about SDK & Developer APIs
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Input Row: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-sans text-xs font-bold text-foreground uppercase tracking-widest">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/80 focus:border-primary/50 text-foreground placeholder-foreground-secondary/40 focus:outline-none font-sans text-sm transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block font-sans text-xs font-bold text-foreground uppercase tracking-widest">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/80 focus:border-primary/50 text-foreground placeholder-foreground-secondary/40 focus:outline-none font-sans text-sm transition-colors"
                />
              </div>
            </div>

            {/* Optional Input: Company or Project Name */}
            <div className="space-y-2">
              <label htmlFor="company" className="block font-sans text-xs font-bold text-foreground uppercase tracking-widest">
                Company or Project Name {topic === 'sdk_api' && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required={topic === 'sdk_api'}
                placeholder={topic === 'sdk_api' ? "What framework/app are you building?" : "Your organization (optional)"}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/80 focus:border-primary/50 text-foreground placeholder-foreground-secondary/40 focus:outline-none font-sans text-sm transition-colors"
              />
            </div>

            {/* Input: Text Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block font-sans text-xs font-bold text-foreground uppercase tracking-widest">
                {topic === 'sdk_api' ? 'What would you like to know about our SDK/APIs?' : 'Message'} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder={
                  topic === 'sdk_api'
                    ? "Let us know what kind of integrations you are thinking about (e.g., photo uploads, decentralized identity verification) or any questions you have regarding release timelines..."
                    : "Write your questions or notes here..."
                }
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/80 focus:border-primary/50 text-foreground placeholder-foreground-secondary/40 focus:outline-none font-sans text-sm transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Error handling alert box */}
            {formState === 'error' && errorMessage && (
              <div className="p-3 text-xs text-red-500 bg-red-500/10 border border-red-500/25 rounded-lg font-sans">
                {errorMessage}
              </div>
            )}

            {/* Actions Form Footer */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold tracking-wider uppercase hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto hover:bg-secondary"
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Inquiry
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
