"use client";
import "./globals.css"

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Navbar from "./Components/Navbar";
// import Hero from "./Components/Hero";
// import About from "./Components/About";
// import Service from "./Components/Service";
// import Projects from "./Components/Projects";
// import Testimonials from "./Components/Testimonials";
// import CTA from "./Components/CTA";
// import Footer from "./Components/Footer";
// import Preloader from "./Components/Preloader";
// import Skiper from "./Components/skiper30";

// export default function Home() {
//   const [isRevealing, setIsRevealing] = useState(false);

//   return (
//     <>
//       <Preloader onComplete={() => setIsRevealing(true)} />

//       <main className="min-h-screen bg-[#FFFFFF]">
//         <Navbar />
//         <Hero />
//         <About />
//         <Skiper />
//         <Service />
//         <Projects />
//         <Testimonials />
//         <CTA />
//         <Footer />
//       </main>
//     </>
//   );
// }

export default function Home() {
  return (
    <section className="relative min-h-screen overflow-hidden font-lexend">
      {/* Background with Ken Burns zoom */}
      <div
        className="animate-ken-burns absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/Moonlit Greek Temple.png')" }}
      />

      {/* Multi-layer overlay: deep vignette + subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40" />

      {/* Decorative top-edge glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">

        {/* ── Header / Logo ── */}
        <header className="w-full">
          <div className="mx-auto mt-8 flex items-center justify-center px-4 py-2">
            <img
              src="/images/branding/LOGO.png"
              alt="FORMTSTUDIO Logo"
              className="h-10 w-auto animate-fade-in-up animate-float drop-shadow-[0_2px_24px_rgba(255,255,255,0.18)] sm:h-12 md:h-16 lg:h-20"
              style={{ animationDelay: "0s, 1.2s" }}
            />
          </div>
        </header>

        {/* ── Hero ── */}
        <main className="flex flex-1 items-center justify-center px-6">
          <div className="mx-auto max-w-5xl text-center">

            {/* Label */}
            <p
              className="animate-fade-in-up mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-white/50"
              style={{ animationDelay: "0.15s" }}
            >
              Coming Soon
            </p>

            {/* Decorative line */}
            <div
              className="animate-line-grow mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ animationDelay: "0.25s" }}
            />

            {/* Headline */}
            <h1
              className="animate-fade-in-up text-4xl font-bold uppercase text-white sm:text-6xl lg:text-7xl xl:text-8xl"
              style={{
                animationDelay: "0.3s",
                textShadow: "0 2px 40px rgba(255,255,255,0.12)",
                letterSpacing: "-0.02em",
              }}
            >
              FORMTSTUDIO.COM
            </h1>

            {/* Decorative line */}
            <div
              className="animate-line-grow mx-auto mt-8 mb-8 h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ animationDelay: "0.5s" }}
            />

            {/* Subtitle */}
            <p
              className="animate-fade-in-up mx-auto max-w-lg text-sm font-light leading-relaxed tracking-wide text-white/60 sm:text-base md:text-lg"
              style={{ animationDelay: "0.55s" }}
            >
              We're under construction.
              <br />
              Please check back for an update soon
            </p>

            {/* Instagram Button */}
            <div
              className="animate-fade-in-up mt-12"
              style={{ animationDelay: "0.75s" }}
            >
              <a
                href="https://www.instagram.com/form_t_studio/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-instagram inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-white"
              >
                {/* Instagram SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.675a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                </svg>
                <span className="text-sm font-semibold tracking-widest uppercase">
                  Follow Us on Instagram
                </span>
              </a>
            </div>
          </div>
        </main>

        {/* ── Footer ── */}


      </div>
    </section>
  );
}