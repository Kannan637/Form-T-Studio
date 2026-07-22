"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects-gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

// ---- Framer Motion Variants for the Awwwards-style Menu ----
const EASE = [0.76, 0, 0.24, 1] as const;

const menuVars: import("framer-motion").Variants = {
  initial: {
    clipPath: "inset(0 0 0 100%)",
  },
  animate: {
    clipPath: "inset(0 0 0 0%)",
    transition: { duration: 0.8, ease: EASE },
  },
  exit: {
    clipPath: "inset(0 0 0 100%)",
    transition: { duration: 0.8, ease: EASE, delay: 0.3 },
  },
};

const linkContainerVars: import("framer-motion").Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const linkVars: import("framer-motion").Variants = {
  initial: { y: "100%", rotate: 2 },
  animate: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.8, ease: EASE },
  },
  exit: {
    y: "100%",
    rotate: 2,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll shadow/padding
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center"
        style={{
          paddingTop: scrolled ? "12px" : "20px",
          transition: "padding 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <nav
          className={`
            flex items-center justify-between
            w-[92%] sm:w-[500px] lg:w-[600px]
            rounded-[var(--radius)]
            h-[64px]
            px-5 lg:px-8
            transition-all duration-500 ease-out
            border
            ${
              menuOpen 
                ? "bg-transparent border-transparent shadow-none" 
                : `bg-white border-[#E5E7EB] ${scrolled ? "shadow-[0_8px_30px_rgb(0,0,0,0.08)]" : "shadow-sm"}`
            }
          `}
          role="navigation"
        >
          {/* ---- Left Side: Logo ---- */}
          <Link href="/" className="flex items-center select-none group z-50" onClick={() => setMenuOpen(false)}>
            <img
              src="/Logo.png"
              alt="Form T Studio"
              className="h-8 sm:h-10 w-auto object-contain transition-all duration-500 group-hover:scale-[1.03]"
            />
          </Link>

          {/* ---- Right Side: Custom Animated Hamburger ---- */}
          <div className="flex items-center z-50">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none group"
            >
              {/* Top Line */}
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 3.5, backgroundColor: "#000000" } : { rotate: 0, y: 0, backgroundColor: "#000000" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="w-6 h-[1.5px] block rounded-full"
              />
              {/* Bottom Line */}
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -4, backgroundColor: "#000000" } : { rotate: 0, y: 0, backgroundColor: "#000000" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="w-6 h-[1.5px] block rounded-full"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ---- Full Screen Menu Overlay ---- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[90] bg-[#FFFFFF] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Architectural Grid Texture inside menu */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* Staggered Links */}
            <motion.div
              variants={linkContainerVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center gap-4 sm:gap-6 relative z-10"
            >
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="overflow-hidden">
                  <motion.div variants={linkVars}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-4 text-black text-large-heading hover:text-black/60 transition-colors duration-300"
                    >
                      <span className="group-hover:-skew-x-6 transition-transform duration-300 inline-block">
                        {link.label}
                      </span>
                      <ArrowRight className="size-8 sm:size-12 opacity-0 -translate-x-8 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" strokeWidth={2} />
                    </Link>
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Footer of the menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-12 flex flex-col items-center gap-2"
            >
              <span className="text-caption text-[#8B8B93]">
                FORM T STUDIO © 2025
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
