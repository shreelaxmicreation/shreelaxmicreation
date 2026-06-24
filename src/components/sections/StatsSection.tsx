'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { value: '50+', label: 'Fabric Bases', description: 'Across multiple constructions' },
  { value: '500+', label: 'Design Options', description: 'For every market segment' },
  { value: '2', label: 'Textile Hubs', description: 'Ahmedabad & Ichalkaranji' },
  { value: '100%', label: 'Quality Assured', description: 'Yarn to finished fabric' },
]

export default function StatsSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      id="stats-section"
      ref={containerRef}
      className="w-full relative z-10 overflow-hidden"
      style={{ padding: '120px 24px', background: 'var(--surface)' }}
    >
      <div className="absolute inset-0 liquid-gradient opacity-40 pointer-events-none" />
      
      <motion.div style={{ opacity, y, maxWidth: 'var(--max-content)', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Label */}
        <div className="text-center mb-16">
          <p className="text-label text-cta mb-4 tracking-[0.2em]">At a Glance</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1]" style={{ color: 'var(--navy)' }}>
            Numbers That Define{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Quality</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="liquid-glass-card rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[160px] md:min-h-[320px]"
            >
              <p className="font-display text-4xl sm:text-5xl md:text-[clamp(4rem,8vw,7rem)] font-light mb-4 md:mb-6 leading-none" style={{ color: 'var(--navy)' }}>
                {stat.value}
              </p>
              <div className="w-8 md:w-16 h-[1px] bg-cta mb-4 md:mb-8" />
              <p className="text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase text-text mb-2 md:mb-3">
                {stat.label}
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
