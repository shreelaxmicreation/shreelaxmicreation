'use client';

import React, { useEffect, useRef } from 'react';

export const SilkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let time = 0;
    const speed = 0.022;
    const scale = 2;
    const noiseIntensity = 0.8;
    
    // Run at a lower resolution for performance, stretch via CSS
    const pixelRatio = 0.3; 

    const resizeCanvas = () => {
      // Use the parent element's dimensions to confine it to the Hero
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * pixelRatio;
        canvas.height = parent.clientHeight * pixelRatio;
      } else {
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simple noise function
    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const { width, height } = canvas;
      
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      // CTA Warm Sand Color: #D6B06A (RGB: 214, 176, 106)
      const r_val = 214;
      const g_val = 176;
      const b_val = 106;

      for (let x = 0; x < width; x += 1) {
        for (let y = 0; y < height; y += 1) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;
          
          const tOffset = speed * time;
          let tex_x = u;
          let tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          const pattern = 0.6 + 0.4 * Math.sin(
            5.0 * (tex_x + tex_y + 
              Math.cos(3.0 * tex_x + 5.0 * tex_y) + 
              0.02 * tOffset) +
            Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
          );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - rnd / 15.0 * noiseIntensity);
          
          const index = (y * width + x) * 4;
          data[index] = r_val;
          data[index + 1] = g_val;
          data[index + 2] = b_val;
          // Modulate alpha based on intensity to blend smoothly with background
          data[index + 3] = Math.floor(100 * intensity); 
        }
      }

      ctx.putImageData(imageData, 0, 0);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[var(--canvas)] z-0">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ imageRendering: 'pixelated' }}
      />
      {/* Subtle overlay to soften the texture and add depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--canvas)]/40 via-transparent to-[var(--canvas)]/80" />
    </div>
  );
};
