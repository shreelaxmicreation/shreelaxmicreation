"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function Magnetic({ children, intensity = 0.2, className }: { children: React.ReactNode, intensity?: number, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * intensity, y: middleY * intensity });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={className}
            style={{ display: "inline-flex" }}
        >
            <motion.div
                animate={{ x, y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                style={{ display: "inline-flex", width: "100%", height: "100%" }}
            >
                {children}
            </motion.div>
        </div>
    );
}
