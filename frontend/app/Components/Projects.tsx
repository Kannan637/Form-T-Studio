"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import BlueprintBackground from "./BlueprintBackground";

const PROJECTS = [
  { id: "01", title: "OFFICE INTERIOR - KANMANI YAMAHA", location: "DINDIGUL", img: "/1.png" },
  { id: "02", title: "RHYTHM & RAIN, CAFE", location: "COIMBATORE", img: "/2.png" },
  { id: "03", title: "SKY HUB, 7 SCREEN CINEMAS", location: "CHENNAI", img: "/3.png" },
  { id: "04", title: "MR GUNA SHANMUGAM SEELAPADI", location: "DINDIGUL", img: "/4.png" },
  { id: "05", title: "MEENAKSHI RESIDENCE, BALAKRISHAPURAM", location: "DINDIGUL", img: "/5.png" },
  { id: "06", title: "KITCHEN INTERIOR", location: "COIMBATORE", img: "/6.png" },
  { id: "07", title: "CO WORKING SPACE", location: "COIMBATORE", img: "/7.png" },
  { id: "08", title: "ARIMA", location: "COIMBATORE", img: "/8.png" },
  { id: "09", title: "RETAIL STORE", location: "COIMBATORE", img: "/9.png" },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply ultra-smooth spring physics to create momentum and delay
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 40,
    damping: 15,
    mass: 1.5,
  });

  // Phase 1: 0.05 to 0.15 -> Scale the intro image and remove its border radius
  const imageScale = useTransform(scrollYProgress, [0.05, 0.15], [0.4, 1]);
  const imageRadius = useTransform(scrollYProgress, [0.05, 0.15], ["999px", "0px"]);

  // Fade out the intro text exactly as the image covers the screen
  const introOpacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0]);
  const introY = useTransform(scrollYProgress, [0.05, 0.15], [0, -150]);

  // Fade in the dark overlay on the background image when full screen
  const bgOverlayOpacity = useTransform(scrollYProgress, [0.12, 0.15], [0, 1]);

  // Blueprint background animation
  const blueprintRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "15deg"]);
  const blueprintScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.5]);

  return (
    <section 
      ref={containerRef} 
      id="projects" 
      className="relative bg-[#FFFFFF] w-full font-geist"
      style={{ height: "1200vh" }}
    >
      {/* Anchor to skip capsule animation directly to first card */}
      <div id="projects-gallery" className="absolute w-full pointer-events-none" style={{ top: "214.2vh" }} />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#FFFFFF]">
        
        {/* Animated Blueprint Background */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ 
            rotate: blueprintRotate, 
            scale: blueprintScale,
            opacity: useTransform(scrollYProgress, [0.05, 0.15], [1, 0])
          }}
        >
          <BlueprintBackground />
        </motion.div>

        {/* Intro Text */}
        <motion.div 
          className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center z-20 w-full px-6"
          style={{ opacity: introOpacity, y: introY }}
        >
          <p className="text-[12px] uppercase tracking-widest font-semibold text-black/40 mb-4">
            [03] Selected Work
          </p>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-black">
            Featured Projects.
          </h2>
        </motion.div>

        {/* Scaling Background Image */}
        <motion.div
          className="relative z-10 w-[80vw] md:w-[50vw] lg:w-[35vw] h-[75vh] md:h-[65vh] overflow-hidden"
          style={{
            scale: imageScale,
            borderRadius: imageRadius,
            width: "100vw", // Will be constrained by parent scale initially
            height: "100vh"
          }}
        >
          {/* Overlay to dim the image slightly when it becomes full screen */}
          <motion.div 
            className="absolute inset-0 bg-black/50 z-10"
            style={{ opacity: bgOverlayOpacity }} 
          />
          <img 
            src="/10.png" 
            alt="Hero Project" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Individual Cards (Snap to center behavior) */}
        <div className="absolute inset-0 z-30">
          {PROJECTS.map((project, i) => {
            const isLast = i === PROJECTS.length - 1;
            
            const START_PHASE_2 = 0.15;
            // Distribute 9 cards + transition boundaries within the remaining 0.85 scroll area
            const STEP = 0.85 / (PROJECTS.length + 0.5); 
            
            const centerPeak = START_PHASE_2 + i * STEP + (STEP / 2);
            const transitionHalf = STEP * 0.25;

            const clamp = (val: number) => Math.max(0, Math.min(1, val));

            // Define exactly when this card enters, centers, and exits, clamped to [0,1]
            const enterStart = clamp(centerPeak - transitionHalf - (STEP * 0.5)); 
            const centerStart = clamp(centerPeak - transitionHalf);
            const centerEnd = clamp(centerPeak + transitionHalf);
            const exitEnd = clamp(centerPeak + transitionHalf + (STEP * 0.5));

            const x = useTransform(
              scrollYProgress,
              [enterStart, centerStart, centerEnd, exitEnd],
              ["60vw", "0vw", "0vw", isLast ? "0vw" : "-60vw"]
            );

            const opacity = useTransform(
              scrollYProgress,
              [enterStart, centerStart, centerEnd, exitEnd],
              [0, 1, 1, isLast ? 1 : 0]
            );

            // Apple App Switcher style scale effect
            const scale = useTransform(
              scrollYProgress,
              [enterStart, centerStart, centerEnd, exitEnd],
              [0.75, 1, 1, isLast ? 1 : 0.75]
            );

            return (
              <motion.div 
                key={project.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  className="relative w-[85vw] md:w-[50vw] lg:w-[35vw] h-[65vh] flex flex-col justify-between group pointer-events-auto"
                  style={{ x, opacity, scale }}
                >
                  {/* Project Image - Middle */}
                  <div className="relative flex-1 w-full overflow-hidden rounded-[8px] bg-[#111]">
                    <img 
                      src={project.img} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                       <button className="bg-white text-black px-6 py-3 rounded-full text-[12px] uppercase tracking-widest font-medium hover:scale-105 transition-transform duration-300">
                         View Gallery
                       </button>
                    </div>
                  </div>

                  {/* Project Info - Bottom */}
                  <div className="flex justify-between items-end text-white mt-8 px-2">
                    <div className="flex flex-col gap-3">
                      <span className="text-[12px] tabular-nums tracking-widest text-white/50 border border-white/20 w-max px-3 py-1 rounded-full">
                        {project.id}
                      </span>
                      <h3 className="text-xl md:text-2xl font-medium tracking-wide leading-tight uppercase max-w-[90%]">
                        {project.title}
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/50 text-right shrink-0">
                      {project.location}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Small Scroll UI Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6"
          style={{ opacity: bgOverlayOpacity }}
        >
          <span className="text-white/50 text-[10px] tabular-nums tracking-widest">01</span>
          <div className="w-24 h-[1px] bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-white"
              style={{ width: useTransform(scrollYProgress, [0.15, 1], ["0%", "100%"]) }} 
            />
          </div>
          <span className="text-white/50 text-[10px] tabular-nums tracking-widest">09</span>
        </motion.div>

      </div>
    </section>
  );
}
