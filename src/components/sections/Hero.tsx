'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { OriginButton } from '@/components/ui/origin-button'
import { useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0])

  const textReveal = {
    hidden: { y: '120%', opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.6,
        delay: 0.2 + i * 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.4,
        delay: 0.8 + i * 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100vh', background: 'var(--canvas)' }}
    >
      {/* Warm background with fabric texture */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: yBg, opacity: opacityBg }}
      >
         <div className="absolute inset-0 bg-[url('/images/hero-fabric.png')] bg-cover bg-center opacity-[0.06]" />
         <div className="absolute inset-0 liquid-gradient opacity-60" />
      </motion.div>

      {/* Decorative accent (floating) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1, y: [0, -60, 0], x: [0, 40, 0] }}
        transition={{ 
          scale: { duration: 2.5, delay: 0.5, ease: 'easeOut' },
          opacity: { duration: 2.5, delay: 0.5, ease: 'easeOut' },
          y: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 15, repeat: Infinity, ease: 'easeInOut' }
        }}
        style={{
          position: 'absolute',
          right: '5%',
          bottom: '10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'var(--cta)',
          pointerEvents: 'none',
          filter: 'blur(120px)',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full text-center px-6"
        style={{ scale: scaleText, opacity: opacityText }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-3 mb-10 px-6 py-2 rounded-full border border-[rgba(28,49,94,0.1)] bg-[rgba(250,248,243,0.6)]"
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-[var(--cta)] shadow-[0_0_10px_var(--cta)]"
            />
            <span className="text-xs uppercase tracking-widest text-muted">
              Premium Manufacturing
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[1.05] tracking-tight flex flex-col items-center">
            <div className="overflow-hidden pb-2 -mb-2">
              <motion.span
                custom={1}
                variants={textReveal}
                initial="hidden"
                animate="visible"
                className="block font-medium text-navy"
              >
                Reliable Shirting
              </motion.span>
            </div>
            <div className="overflow-hidden pb-4 -mb-4 mt-2">
              <motion.span
                custom={2}
                variants={textReveal}
                initial="hidden"
                animate="visible"
                className="block font-normal text-gradient-gold italic"
              >
                Fabric Solutions
              </motion.span>
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl text-muted max-w-2xl mt-12 font-light leading-relaxed"
          >
            From yarn to finished fabric — economical and mid-range shirting 
            built for growing brands.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-6 mt-16"
          >
            <Link href="/products">
              <OriginButton style={{ height: 56, padding: '0 40px', fontSize: 14 }}>
                Explore Collection
              </OriginButton>
            </Link>
            <Link href="#enquiry-form">
               <button className="h-14 px-10 rounded-xl bg-[rgba(250,248,243,0.6)] text-navy border border-[rgba(28,49,94,0.12)] hover:border-[var(--cta)] hover:text-[var(--cta)] transition-all duration-300 text-base uppercase tracking-wider font-medium backdrop-blur-sm">
                 Start a Project
               </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
