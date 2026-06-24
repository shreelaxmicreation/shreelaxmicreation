'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import OrangeRule from '@/components/ui/OrangeRule'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
// import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface AboutStripProps {
  aboutStripImage?: any
}

export default function AboutStrip({ aboutStripImage }: AboutStripProps) {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const maskClip = useTransform(scrollYProgress, [0, 0.4], ['inset(20% 10% 20% 10%)', 'inset(0% 0% 0% 0%)'])

  const textContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const textItem: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    }
  }

  const imageUrl = aboutStripImage
    ? urlFor(aboutStripImage).width(1200).height(1600).quality(80).format('webp').url()
    : '/images/about-strip.jpg'

  return (
    <section
      id="about-strip"
      ref={containerRef}
      className="w-full section-padded overflow-hidden relative z-10"
      style={{ background: 'var(--canvas)' }}
    >
      <div className="absolute inset-0 liquid-gradient opacity-30 pointer-events-none" />

      <div
        className="grid md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10"
        style={{
          maxWidth: 'var(--max-content)',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Left: Content */}
        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={textItem}>
            <p className="text-label text-cta mb-4 tracking-[0.2em]">About Us</p>
            <OrangeRule />
          </motion.div>
          <motion.h2
            variants={textItem}
            className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] mt-6 mb-8 font-normal"
            style={{ color: 'var(--navy)' }}
          >
            Built on Quality.{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Driven by Reliability.</span>
          </motion.h2>
          <motion.div
            variants={textItem}
            className="text-lg text-muted font-light leading-relaxed mb-10"
          >
            <p className="mb-6">
              Shree Laxmi Creation is an Ahmedabad-based textile company specializing in the manufacturing and development of shirting fabrics for apparel brands and wholesalers.
            </p>
            <p className="mb-8">
              With our own greige fabric production in Ichalkaranji and processing partnerships in Ahmedabad and Mumbai, we maintain complete control over quality, consistency, and delivery timelines.
            </p>
          </motion.div>
          <motion.div variants={textItem}>
            <Link
              href="/about"
              className="inline-block text-sm uppercase tracking-[0.15em] font-medium pb-1 border-b border-cta hover:text-cta transition-colors duration-300"
              style={{ color: 'var(--navy)' }}
            >
              Read our story →
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Parallax Image */}
        <motion.div 
          className="relative w-full overflow-hidden rounded-[2rem]"
          style={{ 
            aspectRatio: '3/4',
            backgroundColor: 'var(--surface)',
            clipPath: maskClip
          }}
        >
          <motion.div 
            style={{ y, width: '100%', height: '140%' }}
            className="absolute top-[-20%] left-0 right-0"
          >
            <Image
              src={imageUrl}
              alt="Shree Laxmi Creation Craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Warm overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,49,94,0.4)] to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
