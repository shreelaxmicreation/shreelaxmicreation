'use client'

import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return // Do not initialize smooth scroll if reduced motion is preferred
    }

    const _lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      infinite: false,
    })

    setLenis(_lenis)

    _lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      _lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      _lenis.destroy()
    }
  }, [])

  return (
    <div className="smooth-scroll-wrapper relative">
      {children}
    </div>
  )
}
