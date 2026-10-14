import type { Metadata } from "next";
import { Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Preloader from "@/components/Preloader";
import ScrollReveals from "@/components/ScrollReveals";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rbdancecourt.com"),
  title: "Rhythmic Beat Dance Court — Dance & Fitness, Chennai",
  description:
    "Explore dance, Bharatanatyam, Zumba and yoga at Rhythmic Beat Dance Court, Chennai. Founded by artistic director Yuvraaj Jayakumar in 2004.",
  alternates: { canonical: "/" },
  openGraph: { title: "Rhythmic Beat Dance Court", description: "Dance to the beat of your dreams. Dance and fitness in Chennai.", type: "website", url: "/" },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/logo/rb-dance-court.webp",
    apple: "/logo/rb-dance-court.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable}`}
    >
      <body>
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollReveals />
        <Analytics />
        <SpeedInsights />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
