'use client'

import { motion } from 'framer-motion'

export default function PullQuote() {
  return (
    <section
      id="pull-quote"
      className="w-full flex items-center justify-center text-center relative overflow-hidden"
      style={{
        background: 'var(--navy)',
        padding: '160px 24px',
      }}
    >
      {/* Subtle decorative lines */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1,
          background: 'linear-gradient(to bottom, var(--cta), transparent)',
        }}
      />

      <div style={{ maxWidth: 900, position: 'relative', zIndex: 1 }}>
        <p
          className="text-label"
          style={{ color: 'var(--cta)', marginBottom: 32, letterSpacing: '0.25em' }}
        >
          OUR PROMISE
        </p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-display font-light"
          style={{ color: '#FFFFFF' }}
        >
          From yarn to finished fabric, we deliver <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>smart fabric solutions</span> for growing brands.
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          style={{
            height: 1,
            background: 'var(--cta)',
            margin: '64px auto 0',
          }}
        />
      </div>
    </section>
  )
}
