"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/registry/magicui/animated-shiny-text";
import { RainbowButton } from "@/registry/magicui/rainbow-button";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#E2E3E2] font-sans selection:bg-black selection:text-white p-[20px] flex">
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#fafafa] rounded-3xl shadow-sm border border-gray-100">

        {/* ── Logo Area ── */}
        <div className="w-full max-w-[1200px] mb-12 md:mb-16 lg:mb-20">
          <img
            src="/images/hero/Bg.png"
            alt="Form T Studio Logo"
            className="w-full h-auto max-h-[450px] md:max-h-[450px] lg:max-h-[450px] object-contain mx-auto scale-[1.0] sm:scale-100 transition-transform"
          />
        </div>

        {/* ── Text Content ── */}
        <div className="flex flex-col items-center gap-2 w-full max-w-2xl px-4">

          {/* Coming Soon tag */}
          <div className="z-10 flex items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Coming Soon</span>
              </AnimatedShinyText>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold uppercase tracking-tighter text-black leading-none break-words">
            FORMTSTUDIO.COM
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium leading-relaxed mt-2 md:mt-4">
            We&apos;re under construction.
            <br className="hidden sm:block" />
            Please check back for an update soon.
          </p>
        </div>

        {/* ── CTA Button ── */}
        <div className="mt-12 md:mt-16">
          <a
            href="https://www.instagram.com/form_t_studio/?utm_source=ig_web_button_share_sheet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RainbowButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.675a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
              </svg>
              Follow Us on Instagram
            </RainbowButton>
          </a>
        </div>

      </div>
    </main>
  );
}