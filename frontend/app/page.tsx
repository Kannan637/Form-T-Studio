"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Service from "./Components/Service";
import Projects from "./Components/Projects";
import Testimonials from "./Components/Testimonials";
import CTA from "./Components/CTA";
import Footer from "./Components/Footer";
import Preloader from "./Components/Preloader";
import Skiper from "./Components/skiper30";

export default function Home() {
  const [isRevealing, setIsRevealing] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIsRevealing(true)} />

      <main className="min-h-screen bg-[#FFFFFF]">
        <Navbar />
        <Hero />
        <About />
        <Skiper />
        <Service />
        <Projects />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </>
  );
}