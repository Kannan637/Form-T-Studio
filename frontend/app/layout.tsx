import type { Metadata } from "next";
import { Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import SmoothScrolling from "./Components/SmoothScrolling";
import "./globals.css";

/* ------------------------------------------------------------------ */
/*  Fonts                                                              */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  SEO Constants                                                      */
/* ------------------------------------------------------------------ */
const SITE_URL = "https://formt-studio.pages.dev";
const SITE_NAME = "FormT Studio";

/* ------------------------------------------------------------------ */
/*  Metadata (SEO)                                                     */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: {
    default: "FormT Studio — Premium Architecture & Interior Design",
    template: "%s | FormT Studio",
  },
  description:
    "Premium interior design and architecture studio in Dindigul & Coimbatore. Specializing in residential interiors, commercial design, modular kitchens, custom furniture, and turnkey project execution.",
  keywords: [
    "interior design",
    "architecture",
    "FormT Studio",
    "Dindigul interior designer",
    "Coimbatore architect",
    "residential interior design",
    "commercial interior design",
    "modular kitchen design",
    "custom furniture",
    "3D visualization",
    "space planning",
    "turnkey interior project",
    "luxury interiors Tamil Nadu",
    "home renovation Dindigul",
    "office interior Coimbatore",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "FormT Studio — Premium Architecture & Interior Design",
    description:
      "Premium interior design and architecture studio specializing in residential and commercial spaces. From concept to completion — precision, quality, craft.",
    images: [
      {
        url: "/images/branding/formt-studio-logo.png",
        width: 512,
        height: 512,
        alt: "FormT Studio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FormT Studio — Premium Architecture & Interior Design",
    description:
      "Premium interior design and architecture studio in Dindigul & Coimbatore, Tamil Nadu.",
    images: ["/images/branding/formt-studio-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

/* ------------------------------------------------------------------ */
/*  JSON-LD Structured Data                                            */
/* ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "FormT Studio",
  alternateName: "Form T Studio",
  description:
    "Premium interior design and architecture studio specializing in residential and commercial spaces, modular kitchens, custom furniture, and turnkey project execution.",
  url: SITE_URL,
  email: "FORMTSTUDIO@GMAIL.COM",
  telephone: "+916381670083",
  image: `${SITE_URL}/images/branding/formt-studio-logo.png`,
  logo: `${SITE_URL}/images/branding/formt-studio-logo.png`,
  founder: {
    "@type": "Person",
    name: "AR Dharanika",
    jobTitle: "Principal Architect & Interior Designer",
  },
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Dindigul",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Dindigul" },
    { "@type": "City", name: "Coimbatore" },
    { "@type": "City", name: "Chennai" },
    { "@type": "State", name: "Tamil Nadu" },
  ],
  serviceType: [
    "Interior Design",
    "Architecture",
    "Residential Design",
    "Commercial Design",
    "Modular Kitchen Design",
    "Custom Furniture",
    "Space Planning",
    "3D Visualization",
    "Turnkey Project Execution",
    "Renovation",
  ],
};

/* ------------------------------------------------------------------ */
/*  Root Layout                                                        */
/* ------------------------------------------------------------------ */
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
        {/* Preload critical hero images */}
        <link rel="preload" as="image" href="/images/hero/before-renovation.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/hero/after-renovation.png" fetchPriority="high" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", background: "#f8f9fa", color: "#333", fontFamily: "sans-serif" }}>
            <h2>JavaScript Required</h2>
            <p>This interactive portfolio requires JavaScript to render properly. Please enable JavaScript or switch to a supported browser.</p>
          </div>
        </noscript>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
