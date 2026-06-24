"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SilkBackground } from "./silk-background-animation";

function GlobalPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => {
        const xOffset = i * 5 * position;
        const ySpread = i * 6;
        return {
            id: i,
            d: `M${-380 + xOffset} ${-189 + ySpread}
                C${-380 + xOffset} ${-189 + ySpread} ${-312 + xOffset} ${216 - ySpread} ${152 + xOffset} ${343 - ySpread}
                C${616 + xOffset} ${470 + ySpread} ${684 + xOffset} ${875 + ySpread} ${500 + xOffset} ${1200 + ySpread}
                C${300 + xOffset} ${1500 - ySpread} ${100 + xOffset} ${1800 + ySpread} ${250 + xOffset} ${2100 - ySpread}
                C${400 + xOffset} ${2400 + ySpread} ${600 + xOffset} ${2700 - ySpread} ${450 + xOffset} ${3000 + ySpread}
                C${300 + xOffset} ${3300 - ySpread} ${150 + xOffset} ${3600 + ySpread} ${350 + xOffset} ${3900 - ySpread}
                C${550 + xOffset} ${4200 + ySpread} ${700 + xOffset} ${4500 - ySpread} ${500 + xOffset} ${5000}`,
            width: 0.5 + i * 0.03,
        };
    });

    return (
        <>
            {paths.map((path) => (
                <motion.path
                    key={path.id}
                    d={path.d}
                    stroke="currentColor"
                    strokeWidth={path.width}
                    strokeOpacity={0.15 + path.id * 0.025}
                    fill="none"
                    initial={{ pathLength: 0.3, opacity: 0.6 }}
                    animate={{
                        pathLength: 1,
                        opacity: [0.3, 0.6, 0.3],
                        pathOffset: [0, 1, 0],
                    }}
                    transition={{
                        duration: 20 + Math.random() * 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />
            ))}
        </>
    );
}

export function GlobalBackgroundPaths() {
    return (
        <div 
            className="fixed inset-0 pointer-events-none z-40 overflow-hidden opacity-30"
            style={{ 
                maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)', 
                WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)' 
            }}
        >
            <svg
                className="w-full h-full text-[var(--cta)]"
                viewBox="-400 -400 1500 5400"
                preserveAspectRatio="none"
                fill="none"
            >
                <title>Background Paths</title>
                <GlobalPaths position={1} />
                <GlobalPaths position={-1} />
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Reliable Shirting Fabric Solutions",
}: {
    title?: string;
}) {
    const [isHovered, setIsHovered] = useState(false);
    
    const displayText = isHovered ? "Shree Laxmi Creation" : title;
    const words = displayText.split(" ");

    return (
        <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
            <SilkBackground />
            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 
                        className="font-display text-4xl sm:text-6xl md:text-8xl mb-8 tracking-tight font-medium text-[var(--navy)]"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {displayText}
                    </h1>

                    <div
                        className="inline-block group relative bg-gradient-to-b from-[var(--navy)]/10 to-[var(--brand)]/10 
                        p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <Button
                            variant="ghost"
                            className="rounded-[1.15rem] px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold backdrop-blur-md 
                            bg-[var(--navy)] hover:bg-[var(--brand)] text-[var(--white)] transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-[var(--navy)]/20 hover:border-[var(--brand)]/50
                            hover:shadow-md"
                        >
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                Discover Excellence
                            </span>
                            <span
                                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                transition-all duration-300"
                            >
                                →
                            </span>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
