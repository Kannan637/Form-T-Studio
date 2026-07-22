import type { Metadata } from "next";
import { Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import SmoothScrolling from "./Components/SmoothScrolling";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FormT Studio — Architecture & Construction",
  description:
    "Premium modern architecture and luxury construction. Experience our craft through interactive architectural visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="image" href="/Before.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/After.png" fetchPriority="high" />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", background: "#f8f9fa", color: "#333", fontFamily: "sans-serif" }}>
            <h2>JavaScript Required</h2>
            <p>This interactive portfolio requires JavaScript to render properly. Please enable JavaScript or switch to a supported browser.</p>
          </div>
        </noscript>
        <SmoothScrolling>{children}</SmoothScrolling>
        <SpeedInsights />
      </body>
    </html>
  );
}
