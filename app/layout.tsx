import type { Metadata } from "next";
import { League_Spartan, Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "../context/AppProvider";
import { SubtitleDisplay } from "@/components/header/AudioOverlays";
import Footer from "@/components/layout/Footer";
import BrandLogo from "@/components/header/BrandLogo";
import NavigationBar from "@/components/header/NavigationBar";
import { HeaderControls } from "@/components/header/HeaderControls";
import { GoogleAnalytics } from "@next/third-parties/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const cooperHewitt = localFont({
  src: [
    {
      path: '../public/fonts/cooperhewitt-medium-webfont.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/cooperhewitt-bold-webfont.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-cooper',
});

export const metadata: Metadata = {
  title: {
    template: "%s | Open Source Panopticon",
    default: "Open Source Panopticon",
  },
  description:
    "The Open Source Panopticon working to prevent misinformation and safeguard trust.",
  keywords: ["Open Source Panopticon", "OSP", "Sensor SDK", "Media Verification", "Doublethink Solutions"],
  openGraph: {
    title: "Open Source Panopticon",
    description: "The Open Source Panopticon working to prevent misinformation and safeguard trust.",
    siteName: "Open Source Panopticon",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-700">
      <body
        className={`
          ${leagueSpartan.variable} 
          ${manrope.variable} 
          ${cooperHewitt.variable} 
          antialiased
        `}
      >
        <AppProvider>
          <div className="fixed top-6 inset-x-0 flex justify-center z-50 pointer-events-none">
            <SubtitleDisplay />
          </div>

          <BrandLogo />
          <NavigationBar />
          <div className="fixed top-0 right-0 z-40 p-4 md:p-6 flex items-center gap-4 pointer-events-auto">
            <HeaderControls />
          </div>

          {/* Primary scroll viewport wrapper */}
          <main className="grow pt-22">
            {children}
          </main>

          {/* Unified structural footer */}
          <Footer />
        </AppProvider>
      </body>
      <GoogleAnalytics gaId="AW-18321366063" />
    </html>
  );
}
