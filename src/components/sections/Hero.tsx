'use client'

import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { OriginButton } from '@/components/ui/origin-button'
import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100])

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.4,
        delay: 0.3 + i * 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', background: 'var(--canvas)' }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 liquid-gradient opacity-40 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto px-6 md:px-20 pt-32 pb-16 min-h-screen flex items-center">
        <motion.div 
          className="w-full"
          style={{ opacity: opacityText, y: yText }}
        >
          <Card className="w-full min-h-[600px] md:h-[680px] bg-[var(--navy)] border-none relative overflow-hidden rounded-3xl shadow-2xl">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="#D6B06A"
            />
            
            <div className="flex flex-col md:flex-row h-full">
              {/* Left content */}
              <div className="flex-1 p-10 md:p-16 relative z-10 flex flex-col justify-center">
                {/* Badge */}
                <motion.div
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] w-fit"
                >
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-2 h-2 rounded-full bg-[var(--cta)] shadow-[0_0_10px_var(--cta)]"
                  />
                  <span className="text-xs uppercase tracking-widest text-[rgba(255,255,255,0.5)]">
                    Premium Manufacturing
                  </span>
                </motion.div>

                <motion.h1 
                  custom={1}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.05] tracking-tight"
                >
                  <span className="text-white">Reliable Shirting</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#D6B06A] to-[#E8D5A8] bg-clip-text text-transparent italic">
                    Fabric Solutions
                  </span>
                </motion.h1>

                <motion.p 
                  custom={2}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="mt-8 text-[rgba(255,255,255,0.55)] max-w-md text-lg font-light leading-relaxed"
                >
                  From yarn to finished fabric — economical and mid-range shirting 
                  built for growing brands.
                </motion.p>

                <motion.div
                  custom={3}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col sm:flex-row gap-4 mt-12"
                >
                  <Link href="/products">
                    <button className="h-14 px-10 rounded-xl bg-[var(--cta)] text-[var(--navy)] font-semibold text-sm uppercase tracking-wider hover:bg-[#E8D5A8] transition-colors duration-300">
                      Explore Collection
                    </button>
                  </Link>
                  <Link href="#enquiry-form">
                    <button className="h-14 px-10 rounded-xl border border-[rgba(255,255,255,0.12)] text-white hover:border-[var(--cta)] hover:text-[var(--cta)] transition-all duration-300 text-sm uppercase tracking-wider font-medium">
                      Start a Project
                    </button>
                  </Link>
                </motion.div>
              </div>

              {/* Right content — 3D Robot */}
              <div className="flex-1 relative min-h-[400px] md:min-h-0">
                <SplineScene 
                  scene="https://prod.spline.design/gDQMNMoFO6GLsYiK/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
