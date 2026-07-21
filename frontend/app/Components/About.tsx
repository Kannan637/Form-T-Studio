"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const DURATION = 1;

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE }
  },
};

// Individual word component to safely use hooks inside the map loop
function Word({ word, index, total, scrollYProgress }: { word: string; index: number; total: number; scrollYProgress: MotionValue<number> }) {
  const start = index / total;
  const end = start + 1 / total;
  // Use 0.25 opacity for unrevealed words to match the light grey look in the image
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);

  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

// Scroll-scrubbed text reveal component supporting paragraph breaks
function ScrubRevealText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"],
  });

  // Split by whitespace but keep the whitespace tokens
  const tokens = text.split(/(\s+)/);
  const wordTokens = tokens.filter((t) => t.trim().length > 0);
  const totalWords = wordTokens.length;

  let wordIndex = 0;

  return (
    <span ref={containerRef} className={className}>
      {tokens.map((token, i) => {
        if (token.trim().length === 0) {
          // It's whitespace. If it contains newlines, render line breaks.
          if (token.includes('\n')) {
            const newlines = (token.match(/\n/g) || []).length;
            return (
              <span key={i}>
                {Array.from({ length: newlines }).map((_, j) => (
                  <br key={j} />
                ))}
              </span>
            );
          }
          return <span key={i}>{token}</span>;
        }

        const currentIndex = wordIndex;
        wordIndex++;
        return (
          <Word
            key={i}
            word={token}
            index={currentIndex}
            total={totalWords}
            scrollYProgress={scrollYProgress}
          />
        );
      })}
    </span>
  );
}

const manifestoText = `Founded in 2025, FORM T Studio is a modern interior design studio committed to creating thoughtfully designed spaces that combine aesthetics, functionality, and quality.

We specialize in residential and commercial interiors, delivering tailored solutions for modular kitchens, wardrobes, living areas, bedrooms, offices, and complete interior environments.

Every project is defined by refined detailing, premium materials, and exceptional craftsmanship, creating spaces that are elegant, practical, and built to last.

Our mission is to transform ideas into timeless interiors that reflect each client's lifestyle and vision while ensuring a seamless journey from concept through completion.`;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#FFFFFF] w-full flex justify-center pt-[100px] pb-[100px] overflow-hidden"
    >
      <div className="w-full max-w-[1680px] px-[24px] md:px-[80px] lg:px-[120px]">

        {/* 12-column Swiss Grid Container */}
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={{
            animate: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-12 md:gap-x-[24px]"
        >
          {/* Left Side - Eyebrow */}
          <div className="md:col-span-3 mb-[48px] md:mb-0 relative">
            <motion.div
              variants={fadeUp}
              className="md:sticky md:top-[120px] text-section-label"
            >
              ABOUT US
            </motion.div>
          </div>

          {/* Right Side - Content */}
          <div className="md:col-span-9 flex flex-col">

            {/* Description formatted as a single massive manifesto block */}
            <motion.div
              variants={fadeUp}
              className="mb-[80px] max-w-[960px] text-3xl md:text-large-heading text-[#111111] text-swiss-left"
            >
              <ScrubRevealText text={manifestoText} />
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}