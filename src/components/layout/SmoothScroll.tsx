'use client'

import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'

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

    function raf(time: number) {
      _lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

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
