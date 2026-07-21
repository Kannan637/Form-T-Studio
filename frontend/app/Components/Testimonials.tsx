"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: "01",
    quote:
      "FORM T Studio transformed our home into a beautiful and functional space. The team understood our vision perfectly and delivered a modern interior with excellent craftsmanship. Every detail was thoughtfully executed, and the project was completed on time. We couldn't be happier with the results.",
    name: "GUNA SHANMUGAM",
    role: "Client",
  },
  {
    id: "02",
    quote:
      "From the initial consultation to the final handover, the experience with FORM T Studio was seamless. Their creativity, transparency, and attention to detail made the entire process stress-free. We highly recommend them to anyone looking for quality interior design services.",
    name: "VEERA KANMANI",
    role: "Client",
  },
  {
    id: "03",
    quote:
      "We wanted a stylish yet practical home, and FORM T Studio exceeded our expectations. The modular kitchen, wardrobes, and living room design were completed with premium finishes and exceptional quality. Their dedication and customer service truly set them apart.",
    name: "MEENAKSHI",
    role: "Client",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="relative w-full bg-[#FFFFFF] text-[#111111] py-24 md:py-40 border-t border-[#111111]/10 overflow-hidden font-geist">
      {/* Grid Lines for Swiss aesthetic */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-6 md:px-12 lg:px-24">
        <div className="w-[1px] h-full bg-[#111111]/5" />
        <div className="w-[1px] h-full bg-[#111111]/5 hidden md:block" />
        <div className="w-[1px] h-full bg-[#111111]/5 hidden lg:block" />
        <div className="w-[1px] h-full bg-[#111111]/5" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] uppercase tracking-widest font-semibold text-[#111111]/50">
              [04] Testimonials
            </span>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight">
              Client Voices.
            </h2>
          </div>
          
          <div className="flex gap-2 mt-8 md:mt-0 z-20">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="group relative h-12 flex items-center justify-center cursor-pointer overflow-hidden p-2"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span className="text-[10px] tabular-nums mr-2 opacity-0 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                <div 
                  className={`h-[2px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    currentIndex === i ? "w-16 bg-[#111111]" : "w-8 bg-[#111111]/20 group-hover:bg-[#111111]/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[60vh] md:min-h-[50vh] lg:min-h-[40vh] w-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                {/* Large Quote Mark */}
                <div className="hidden md:block text-[120px] leading-none font-serif text-[#111111]/10 mt-[-40px]">
                  "
                </div>
                
                <div className="flex-1 pointer-events-auto">
                  <p className="text-2xl md:text-4xl lg:text-[44px] tracking-tight leading-[1.2] font-medium text-[#111111] max-w-[95%]">
                    "{TESTIMONIALS[currentIndex].quote}"
                  </p>
                  
                  <div className="mt-16 md:mt-24 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-[#111111]/20 flex items-center justify-center">
                        <span className="text-[10px] font-medium">{TESTIMONIALS[currentIndex].id}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] uppercase tracking-widest font-bold">
                          {TESTIMONIALS[currentIndex].name}
                        </span>
                        <span className="text-[12px] uppercase tracking-widest text-[#111111]/50 mt-1">
                          {TESTIMONIALS[currentIndex].role}
                        </span>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block w-[1px] h-8 bg-[#111111]/20" />
                    
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#111111"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
