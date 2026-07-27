"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Sparkles } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */
interface Blob {
    x: number;
    y: number;
    radius: number;
    targetRadius: number;
    vx: number;
    vy: number;
}

const MAX_BLOBS = 48;
const BLOB_EXPAND_RADIUS = 120;
const BLOB_SHRINK_SPEED = 0.012;
const BLOB_GROW_SPEED = 0.15;
const TRAIL_SPACING = 14;

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */
function useCounter(end: number, duration: number, inView: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const startTime = performance.now();
        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [end, duration, inView]);
    return count;
}

/* ------------------------------------------------------------------ */
/*  Stats data                                                         */
/* ------------------------------------------------------------------ */
const STATS = [
    { value: 50, suffix: "+", label: "Completed Projects", isDecimal: false },
    { value: 5, suffix: "+", label: "Years Experience", isDecimal: false },
    { value: 100, suffix: "%", label: "Custom Design", isDecimal: false },
    { value: 4.9, suffix: "★", label: "Client Satisfaction", isDecimal: true },
] as const;

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */
function StatCard({
    stat,
    index,
    inView,
}: {
    stat: (typeof STATS)[number];
    index: number;
    inView: boolean;
}) {
    const count = useCounter(stat.isDecimal ? 49 : stat.value, 1800, inView);
    const display = stat.isDecimal ? (count / 10).toFixed(1) : count;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.8,
                delay: 0.5 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center text-center px-6 sm:px-10 py-4"
        >
            <span className="text-large-heading text-foreground tabular-nums">
                {display}
                <span className="text-muted-foreground/50 text-sub-heading ml-0.5">
                    {stat.suffix}
                </span>
            </span>
            <span className="text-section-label mt-2">
                {stat.label}
            </span>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/*  Blueprint SVG overlay                                              */
/* ------------------------------------------------------------------ */
function BlueprintOverlay() {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.05, zIndex: 10 }}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 800"
        >
            {Array.from({ length: 14 }).map((_, i) => (
                <motion.line
                    key={`h-${i}`}
                    x1="0" y1={i * 60} x2="1200" y2={i * 60}
                    stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.2, delay: 0.8 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                />
            ))}
            {Array.from({ length: 18 }).map((_, i) => (
                <motion.line
                    key={`v-${i}`}
                    x1={i * 70} y1="0" x2={i * 70} y2="800"
                    stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.2, delay: 1.0 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                />
            ))}
            <motion.line
                x1="0" y1="800" x2="600" y2="0"
                stroke="currentColor" strokeWidth="0.2" strokeDasharray="6 16"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.line
                x1="1200" y1="800" x2="600" y2="0"
                stroke="currentColor" strokeWidth="0.2" strokeDasharray="6 16"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/*  Hero Component                                                     */
/* ------------------------------------------------------------------ */
export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beforeImgRef = useRef<HTMLImageElement | null>(null);
    const afterImgRef = useRef<HTMLImageElement | null>(null);
    const blobsRef = useRef<Blob[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const lastTrailRef = useRef({ x: -9999, y: -9999 });
    const rafRef = useRef<number>(0);
    const imagesLoadedRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
    const heroInView = useInView(sectionRef, { margin: "200px 0px 200px 0px" });
    const heroInViewRef = useRef(false);
    
    useEffect(() => {
        heroInViewRef.current = heroInView;
    }, [heroInView]);

    /* Scroll-driven */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const blueprintOpacity = useTransform(scrollYProgress, [0, 0.25], [0.05, 0]);
    const buildingScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.03]);
    const buildingY = useTransform(scrollYProgress, [0, 0.4], [0, -16]);

    /* Preload images */
    useEffect(() => {
        const loadImg = (src: string): Promise<HTMLImageElement> =>
            new Promise((resolve) => {
                const img = new window.Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.src = src;
            });
        Promise.all([loadImg("/images/hero/before-renovation.png"), loadImg("/images/hero/after-renovation.png")]).then(
            ([before, after]) => {
                beforeImgRef.current = before;
                afterImgRef.current = after;
                imagesLoadedRef.current = 2;
            }
        );
    }, []);

    /* ---- Canvas render loop ---- */
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: false });
        if (!ctx) return;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            // Use device pixel ratio for maximum, uncompressed quality, capped at 2x
            const scale = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
            canvas.width = rect.width * scale;
            canvas.height = rect.height * scale;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
        };
        resize();
        window.addEventListener("resize", resize);

        const render = () => {
            if (!heroInViewRef.current) {
                rafRef.current = requestAnimationFrame(render);
                return;
            }

            if (imagesLoadedRef.current < 2) {
                rafRef.current = requestAnimationFrame(render);
                return;
            }

            const before = beforeImgRef.current!;
            const after = afterImgRef.current!;
            const w = canvas.width;
            const h = canvas.height;
            const blobs = blobsRef.current;

            /* Update blobs — spring physics */
            for (let i = blobs.length - 1; i >= 0; i--) {
                const b = blobs[i];
                b.radius += (b.targetRadius - b.radius) * BLOB_GROW_SPEED;
                b.targetRadius *= 1 - BLOB_SHRINK_SPEED;
                b.x += b.vx;
                b.y += b.vy;
                b.vx *= 0.94;
                b.vy *= 0.94;
                if (b.radius < 0.5 && b.targetRadius < 0.5) blobs.splice(i, 1);
            }

            if (blobs.length === 0) {
                ctx.globalCompositeOperation = "source-over";
                ctx.drawImage(before, 0, 0, w, h);
                rafRef.current = requestAnimationFrame(render);
                return;
            }

            // 1. Clear canvas
            ctx.clearRect(0, 0, w, h);

            // 2. Draw mask blobs directly using GPU compositing
            ctx.globalCompositeOperation = "source-over";
            for (const b of blobs) {
                if (b.radius < 1) continue;
                const r = b.radius;
                const gradient = ctx.createRadialGradient(b.x, b.y, r * 0.2, b.x, b.y, r);
                gradient.addColorStop(0, "rgba(255,255,255,1)");
                gradient.addColorStop(0.5, "rgba(255,255,255,0.8)");
                gradient.addColorStop(1, "rgba(255,255,255,0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
                ctx.fill();
            }

            // 3. Draw "after" image inside the blobs
            ctx.globalCompositeOperation = "source-in";
            ctx.drawImage(after, 0, 0, w, h);

            // 4. Draw "before" image behind everything else
            ctx.globalCompositeOperation = "destination-over";
            ctx.drawImage(before, 0, 0, w, h);

            // 5. Reset
            ctx.globalCompositeOperation = "source-over";

            rafRef.current = requestAnimationFrame(render);
        };

        rafRef.current = requestAnimationFrame(render);
        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    /* ---- Mouse tracking ---- */
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const container = containerRef.current;
            const canvas = canvasRef.current;
            if (!container || !canvas) return;

            const rect = container.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const mx = (e.clientX - rect.left) * scaleX;
            const my = (e.clientY - rect.top) * scaleY;

            mouseRef.current = { x: mx, y: my };

            const last = lastTrailRef.current;

            // Prevent massive distance calculations when mouse first enters
            if (last.x === -9999) {
                lastTrailRef.current = { x: mx, y: my };
                return;
            }

            const dx = mx - last.x;
            const dy = my - last.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > TRAIL_SPACING * scaleX * 0.5) {
                const steps = Math.max(1, Math.floor(dist / (TRAIL_SPACING * scaleX * 0.5)));
                // Cap the steps to prevent freezing on huge jumps
                const safeSteps = Math.min(steps, 20);

                for (let i = 0; i < safeSteps; i++) {
                    const t = (i + 1) / safeSteps;
                    const bx = last.x + dx * t;
                    const by = last.y + dy * t;

                    const blobs = blobsRef.current;
                    if (blobs.length >= MAX_BLOBS) {
                        let minIdx = 0;
                        let minR = Infinity;
                        for (let j = 0; j < blobs.length; j++) {
                            if (blobs[j].radius < minR) {
                                minR = blobs[j].radius;
                                minIdx = j;
                            }
                        }
                        blobs[minIdx] = {
                            x: bx, y: by, radius: 8,
                            targetRadius: BLOB_EXPAND_RADIUS * scaleX,
                            vx: dx * 0.01, vy: dy * 0.01,
                        };
                    } else {
                        blobs.push({
                            x: bx, y: by, radius: 8,
                            targetRadius: BLOB_EXPAND_RADIUS * scaleX,
                            vx: dx * 0.01, vy: dy * 0.01,
                        });
                    }
                }
                lastTrailRef.current = { x: mx, y: my };
            }
        },
        []
    );

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -9999, y: -9999 };
        lastTrailRef.current = { x: -9999, y: -9999 };
        for (const b of blobsRef.current) b.targetRadius *= 0.5;
    }, []);

    const handleTouchMove = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
            const touch = e.touches[0];
            if (!touch) return;
            handleMouseMove({
                clientX: touch.clientX,
                clientY: touch.clientY,
            } as unknown as React.MouseEvent<HTMLDivElement>);
        },
        [handleMouseMove]
    );

    /* Scroll CSS vars */
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const u1 = blueprintOpacity.on("change", (v) =>
            section.style.setProperty("--bp-opacity", String(v))
        );
        const u2 = buildingScale.on("change", (v) =>
            section.style.setProperty("--building-scale", String(v))
        );
        const u3 = buildingY.on("change", (v) =>
            section.style.setProperty("--building-y", `${v}px`)
        );
        return () => { u1(); u2(); u3(); };
    }, [blueprintOpacity, buildingScale, buildingY]);

    /* ---- Animation helper ---- */
    const fadeUp = (delay: number) => ({
        initial: { opacity: 0, y: 28 } as const,
        animate: { opacity: 1, y: 0 } as const,
        transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <section
            ref={sectionRef}
            id="hero-section"
            className="relative w-full bg-background overflow-hidden"
            style={
                {
                    "--bp-opacity": "0.05",
                    "--building-scale": "1",
                    "--building-y": "0px",
                } as React.CSSProperties
            }
        >
            {/* ======================================================== */}
            {/*  TEXT CONTENT                                              */}
            {/* ======================================================== */}
            <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center pt-[100px] sm:pt-[120px] lg:pt-[140px] px-6 sm:px-8">

                {/* Label badge */}
                <motion.div {...fadeUp(0.08)}>
                    <Badge
                        variant="secondary"
                        className="
              h-7 px-4 rounded-[var(--radius)]
              text-section-label
              bg-secondary text-secondary-foreground
              border border-border
              gap-2
            "
                    >
                        <Sparkles className="size-3 opacity-40" />
                        Premium Interior Design Studio
                    </Badge>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    {...fadeUp(0.2)}
                    className="font-serif text-5xl sm:text-7xl lg:text-hero-title font-normal tracking-tight text-center leading-[1.05] sm:leading-none max-w-[90vw] sm:max-w-[80vw] lg:max-w-[1100px]"
                >
                    Thoughtfully Designed Spaces,
                    <br className="hidden sm:block" />
                    Crafted for Modern Living.
                </motion.h1>

                {/* Supporting text */}
                <motion.p
                    {...fadeUp(0.34)}
                    className="
            text-swiss-center max-w-[520px] mt-7
            text-body text-muted-foreground
          "
                >
                    FORM T Studio creates refined residential and commercial interiors that
                    combine elegant aesthetics, intelligent space planning, and flawless
                    execution—from concept to completion.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    {...fadeUp(0.46)}
                    className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-10"
                >
                    <Link
                        href="#contact"
                        className="
                            inline-flex items-center justify-center 
                            h-[56px] px-10 w-full sm:w-auto
                            rounded-[var(--radius)]
                            bg-black text-white
                            text-button
                            hover:bg-black/85
                            shadow-[0_2px_16px_rgba(0,0,0,0.1)]
                            hover:shadow-[0_8px_32px_rgba(0,0,0,0.16)]
                            transition-all duration-300
                            active:scale-[0.98]
                        "
                    >
                        Start Your Project
                        <ArrowRight className="size-4 ml-2 opacity-70" />
                    </Link>
                    <Link
                        href="#projects-gallery"
                        className="
                            inline-flex items-center justify-center 
                            h-[56px] px-10 w-full sm:w-auto
                            rounded-[var(--radius)]
                            text-button
                            border border-black/20
                            text-black
                            hover:bg-black/5
                            transition-all duration-300
                            active:scale-[0.98]
                        "
                    >
                        View Our Projects
                    </Link>
                </motion.div>
            </div>

            {/* ======================================================== */}
            {/*  BEFORE / AFTER — INTERACTIVE BUILDING                     */}
            {/* ======================================================== */}
            <div className="relative w-full flex flex-col items-center">

                {/* Indicator pills */}


                {/* Building container */}
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMouseLeave}
                    className="
            relative
            w-full
            aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1]
            cursor-crosshair
          "
                    style={{
                        transform: "scale(var(--building-scale)) translateY(var(--building-y))",
                        transformOrigin: "center bottom",
                        willChange: "transform",
                    }}
                >
                    {/* Canvas (renders both images with liquid mask) */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ zIndex: 2 }}
                    />

                    {/* Blueprint overlay */}
                    <div style={{ opacity: "var(--bp-opacity)" }}>
                        <BlueprintOverlay />
                    </div>

                    {/* Ground shadow */}
                    <div
                        className="absolute -bottom-8 left-[6%] right-[6%] h-24 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.05) 0%, transparent 70%)",
                            zIndex: 1,
                            filter: "blur(20px)",
                        }}
                    />
                </motion.div>
            </div>

            {/* Warm radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 50% 35% at 50% 80%, rgba(200,185,165,0.04) 0%, transparent 70%)",
                    zIndex: 0,
                }}
            />
        </section>
    );
}

