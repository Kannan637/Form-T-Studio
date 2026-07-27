"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.9, delay, ease: EASE },
});

/* ------------------------------------------------------------------ */
/*  Footer Data                                                        */
/* ------------------------------------------------------------------ */
const FOOTER_LINKS = {
  services: [
    "Interior Design",
    "Space Planning",
    "Project Management",
    "3D Visualization",
    "Turnkey Execution",
    "Renovation",
  ],
  company: ["About", "Projects", "Testimonials"],
} as const;

/* ------------------------------------------------------------------ */
/*  Footer Component                                                   */
/* ------------------------------------------------------------------ */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, margin: "-40px" });

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#000000] text-white overflow-hidden font-geist pt-12 md:pt-16 px-6 md:px-12 lg:px-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1680px]">
        {/* Top Section: Left Content & Right Profile */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
          
          {/* Left Side: Website Content */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16">
            {/* Logo & Intro */}
            <motion.div
              {...fadeUp(0)}
              animate={inView ? fadeUp(0).animate : fadeUp(0).initial}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center gap-3">
                <img src="/images/branding/formt-studio-logo.png" alt="Form T Studio Logo" className="h-10 w-auto invert" />
              </div>
              <p className="text-[14px] text-white/60 max-w-[280px] leading-relaxed">
                Premium interior design studio creating refined residential and commercial spaces. From concept to completion — precision, quality, craft.
              </p>
            </motion.div>

            {/* Services */}
            <motion.div
              {...fadeUp(0.1)}
              animate={inView ? fadeUp(0.1).animate : fadeUp(0.1).initial}
              className="flex flex-col gap-6"
            >
              <span className="text-[12px] uppercase tracking-widest font-semibold text-white/40">
                Services
              </span>
              <ul className="space-y-4">
                  <li><Link href="#services" className="text-[14px] text-white/70 hover:text-white transition-colors duration-300">Interior Design</Link></li>
                  <li><Link href="#services" className="text-[14px] text-white/70 hover:text-white transition-colors duration-300">Space Planning</Link></li>
                  <li><Link href="#services" className="text-[14px] text-white/70 hover:text-white transition-colors duration-300">Project Management</Link></li>
                  <li><Link href="#services" className="text-[14px] text-white/70 hover:text-white transition-colors duration-300">3D Visualization</Link></li>
                  <li><Link href="#services" className="text-[14px] text-white/70 hover:text-white transition-colors duration-300">Turnkey Execution</Link></li>
                  <li><Link href="#services" className="text-[14px] text-white/70 hover:text-white transition-colors duration-300">Renovation</Link></li>
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              {...fadeUp(0.2)}
              animate={inView ? fadeUp(0.2).animate : fadeUp(0.2).initial}
              className="flex flex-col gap-6"
            >
              <span className="text-[12px] uppercase tracking-widest font-semibold text-white/40">
                Company
              </span>
              <ul className="space-y-4">
                  <li><Link href="#about" className="text-[14px] text-white/70 hover:text-white transition-colors duration-300">About</Link></li>
                  <li><Link href="#projects-gallery" className="text-[14px] text-white/70 hover:text-white transition-colors duration-300">Projects</Link></li>
                  <li><Link href="#contact" className="text-[14px] text-white/70 hover:text-white transition-colors duration-300">Contact</Link></li>
              </ul>
            </motion.div>
          </div>

          {/* Right Side: Profile */}
          <motion.div
            {...fadeUp(0.3)}
            animate={inView ? fadeUp(0.3).animate : fadeUp(0.3).initial}
            className="flex flex-col lg:items-end gap-6 lg:text-right shrink-0"
          >
            <div className="overflow-hidden bg-[#111] w-[160px] h-[200px]">
              <img 
                src="/images/team/ar-dharanika.png" 
                alt="AR DHARANIKA" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            <div className="flex flex-col gap-1 mt-2">
              <h3 className="text-[18px] font-medium tracking-wide">AR DHARANIKA</h3>
              <p className="text-[12px] text-white/50 tracking-widest">B.ARCH ; INT DES (UK)</p>
            </div>
            
            <div className="flex flex-col gap-1 mt-2">
              <a href="mailto:FORMTSTUDIO@GMAIL.COM" className="text-[14px] uppercase hover:text-white/70 transition-colors">FORMTSTUDIO@GMAIL.COM</a>
              <a href="tel:+916381670083" className="text-[14px] uppercase hover:text-white/70 transition-colors">+91 6381670083</a>
            </div>

            <div className="flex gap-6 mt-4 justify-start lg:justify-end">
              <Link href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors" aria-label="X (Twitter)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Big FORM T STUDIO */}
        <motion.div
          {...fadeUp(0.4)}
          animate={inView ? fadeUp(0.4).animate : fadeUp(0.4).initial}
          className="mt-16 mb-8 flex justify-center w-full"
        >
          <h1 className="text-[11vw] font-bold tracking-tighter leading-none text-center whitespace-nowrap text-white">
            FORM T STUDIO
          </h1>
        </motion.div>

        {/* Bottom Bar: Copyright and Letsbegin */}
        <motion.div
          {...fadeUp(0.5)}
          animate={inView ? fadeUp(0.5).animate : fadeUp(0.5).initial}
          className="border-t border-white/20 py-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-[12px] uppercase tracking-widest text-white/40">
            © {new Date().getFullYear()} Form T Studio. All rights reserved.
          </p>
          <p className="text-[12px] uppercase tracking-widest text-white/40">
            Design and developed by <span className="text-white font-medium">letsbegin</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
