'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
}

export default function TextReveal({ text, className = '' }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  })

  // We can use a spring to make the reveal feel a bit smoother
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const words = text.split(' ')

  return (
    <div ref={containerRef} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => {
        // Each word gets a staggered reveal based on its index
        const start = i / words.length
        const end = start + (1 / words.length)

        return (
          <Word key={i} word={word} progress={springProgress} range={[start, end]} />
        )
      })}
    </div>
  )
}

const Word = ({ word, progress, range }: { word: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.1, 1])
  // We can also add a slight Y translation for a "lifting" effect, but simple opacity is very elegant.
  // We use opacity: 0.1 for the unrevealed state, which gives a nice "dimmed" text look that lights up.
  
  return (
    <span style={{ position: 'relative', marginRight: '0.25em', marginTop: '0.1em' }}>
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  )
}
