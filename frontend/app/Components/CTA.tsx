"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Magnetic Button Wrapper                                            */
/* ------------------------------------------------------------------ */
function MagneticButton({ children, href }: { children: React.ReactNode, href: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for extremely smooth magnetic snap back and follow
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        
        // Calculate distance from center of the wrapper
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        // Move the inner button based on cursor position relative to center
        x.set(middleX * 0.4);
        y.set(middleY * 0.4);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div 
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className="relative flex items-center justify-center"
        >
            {/* Invisible expanded hit area for the magnetic effect so it doesn't break document flow */}
            <div className="absolute -inset-16 md:-inset-24 z-0" />
            
            <motion.div style={{ x: springX, y: springY }} className="relative z-10">
                <Link 
                    href={href} 
                    className="group relative flex items-center justify-center size-[180px] md:size-[220px] bg-black text-white rounded-full hover:scale-105 transition-transform duration-500 ease-out shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
                >
                    {children}
                </Link>
            </motion.div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  CTA Component                                                      */
/* ------------------------------------------------------------------ */
export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Marquee scroll
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#FFFFFF] text-black overflow-hidden py-32 lg:py-48 flex flex-col items-center border-t border-[#E5E7EB]"
    >
      {/* Marquee Background */}
      <div className="absolute top-1/2 left-0 w-[200%] -translate-y-1/2 opacity-[0.02] pointer-events-none z-0">
         <motion.div style={{ x: marqueeX }} className="flex gap-8 items-center whitespace-nowrap">
             {Array.from({ length: 4 }).map((_, i) => (
                 <h1 key={i} className="text-[120px] md:text-[200px] font-bold tracking-tighter">
                     FORM T STUDIO —
                 </h1>
             ))}
         </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] px-6 lg:px-12 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-[12px] font-mono text-black/40 uppercase tracking-widest">
            [05] Next Steps
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-[100px] font-medium tracking-tight leading-[1.05] max-w-[1200px]"
        >
          Let's build something <br />
          <span className="text-black/40 italic font-serif tracking-normal">extraordinary.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-body text-black/60 max-w-[500px] mt-10 mb-8"
        >
          Schedule a free consultation with our design team. We&apos;ll
          discuss your vision, timeline, and bring your ideas to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton href="#contact">
             <span className="text-lg font-medium tracking-wide">
                 Start Project
             </span>
             <div className="absolute top-8 right-8 size-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300">
                <ArrowRight className="size-5 -rotate-45" />
             </div>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}

