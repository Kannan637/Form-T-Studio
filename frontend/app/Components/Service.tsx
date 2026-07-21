"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
    {
        id: "01",
        title: "COMPLETE RESIDENTIAL & COMMERCIAL DESIGN",
        description:
            "Beautifully designed residential and commercial interiors tailored to reflect your lifestyle, functionality, and architectural vision.",
        img: "/1.png"
    },
    {
        id: "02",
        title: "MODULAR KITCHENS & WARDROBES",
        description:
            "Smart modular kitchens, wardrobes, storage systems, and custom cabinetry designed for maximum efficiency and elegance.",
        img: "/2.png"
    },
    {
        id: "03",
        title: "CUSTOM FURNITURE & BEDROOM INTERIORS",
        description:
            "Custom-crafted furniture, entertainment units, bedroom interiors, and personalized living spaces built with premium materials.",
        img: "/3.png"
    },
    {
        id: "04",
        title: "SPACE PLANNING & 3D CONSULTATION",
        description:
            "Professional planning, realistic 3D visualization, concept development, and expert consultation before project execution.",
        img: "/4.png"
    },
    {
        id: "05",
        title: "TURNKEY EXECUTION & MANAGEMENT",
        description:
            "Complete execution from design approval to project delivery including supervision, renovation, carpentry, electrical, and finishing.",
        img: "/5.png"
    },
];

export default function Service() {
    return (
        <section id="services" className="relative w-full bg-[#FFFFFF] text-black border-t border-[#E5E7EB] py-24 lg:py-32">
            <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
                    <div>
                        <span className="text-[12px] font-mono text-black/40 mb-4 block uppercase tracking-widest">
                            [04] WHAT WE DO
                        </span>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]">
                            Services.
                        </h2>
                    </div>
                    <p className="text-body text-black/60 max-w-[400px]">
                        Explore our complete interior solutions designed with flawless functionality, masterful craftsmanship, and timeless aesthetics.
                    </p>
                </div>

                {/* Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    {SERVICES.map((srv, i) => (
                        <div 
                            key={srv.id}
                            // The first 2 cards take 3 columns each (50%). The last 3 cards take 2 columns each (33.3%).
                            className={`group flex flex-col border border-[#E5E7EB] bg-white rounded-2xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:border-[#D1D5DB] ${
                                i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
                            }`}
                        >
                            {/* Image Container */}
                            <div className="w-full aspect-[4/3] overflow-hidden bg-[#F9FAFB] relative border-b border-[#E5E7EB]">
                                <img 
                                    src={srv.img} 
                                    alt={srv.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                                />
                                {/* Subtle inset shadow for depth */}
                                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] pointer-events-none rounded-t-2xl" />
                            </div>

                            {/* Card Content */}
                            <div className="p-8 sm:p-10 flex flex-col flex-1 justify-between bg-white relative">
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-sm font-mono text-black/40 tracking-widest group-hover:text-black transition-colors duration-300">
                                            {srv.id}
                                        </span>
                                        <div className="size-12 rounded-full border border-[#E5E7EB] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                            <ArrowUpRight className="size-5" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-medium mb-4 group-hover:translate-x-1 transition-transform duration-300 ease-out">
                                        {srv.title}
                                    </h3>
                                    <p className="text-body text-black/60 leading-relaxed">
                                        {srv.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
