import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solara Travel \u2014 Curated Luxury Journeys",
  description:
    "Solara Travel curates the world\u2019s most exquisite travel experiences. Helicopter transfers, private villas, and journeys designed for those who seek beauty without compromise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navigation />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border/40 py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-heading tracking-tight mb-3">
                Solara Travel
              </h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Curating the world\u2019s most exquisite travel experiences for
                those who seek beauty, culture, and transformation.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Explore
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/explorer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Map Explorer
                  </a>
                </li>
                <li>
                  <a href="/itineraries" className="text-muted-foreground hover:text-foreground transition-colors">
                    Itineraries
                  </a>
                </li>
                <li>
                  <a href="/quiz" className="text-muted-foreground hover:text-foreground transition-colors">
                    Trip Builder
                  </a>
                </li>
                <li>
                  <a href="/itineraries/amalfi-coast-5-days" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sample Itinerary
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Connect
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/inquire" className="text-muted-foreground hover:text-foreground transition-colors">
                    Inquire
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border/20 text-center text-xs text-muted-foreground">
            {"\u00A9"} {new Date().getFullYear()} Solara Travel. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}