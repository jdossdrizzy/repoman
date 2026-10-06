import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { AgeGate } from "@/components/sites/greenhaven/age-gate";
import { SiteFooter } from "@/components/sites/greenhaven/site-footer";
import { SiteHeader } from "@/components/sites/greenhaven/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: "Lab-tested cannabis for adult-use customers and medical patients. Browse the menu, reserve for pickup, or apply for your medical card.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <AgeGate />
      </body>
    </html>
  );
}
