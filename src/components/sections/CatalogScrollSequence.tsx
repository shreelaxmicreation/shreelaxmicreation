'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const fabricSwatches = [
  { id: "cotton-01", label: "Pure Cotton", color: "#E8E2D5", category: "Cotton Fabrics" },
  { id: "cotton-02", label: "Poplin", color: "#E0D7C6", category: "Cotton Fabrics" },
  { id: "cotton-03", label: "Oxford", color: "#D8CDBC", category: "Cotton Fabrics" },
  { id: "dobby-01", label: "Dobby Weave", color: "#D6CDB8", category: "Dobby Fabrics" },
  { id: "dobby-02", label: "Textured Dobby", color: "#CFC3AD", category: "Dobby Fabrics" },
  { id: "dobby-03", label: "Micro Dobby", color: "#C5B8A1", category: "Dobby Fabrics" },
  { id: "struct-01", label: "Herringbone", color: "#D9D0BD", category: "Structured Weaves" },
  { id: "struct-02", label: "Twill", color: "#D1C6B0", category: "Structured Weaves" },
  { id: "struct-03", label: "Birdseye", color: "#C6BAA3", category: "Structured Weaves" },
  { id: "blend-01", label: "Poly-Cotton", color: "#D5CCB6", category: "Cotton-Poly Blends" },
  { id: "blend-02", label: "Stretch Blend", color: "#CCBFA7", category: "Cotton-Poly Blends" },
]

const act2Cards = [
  { id: "act2-cotton", label: "Cotton", color: "#E8E2D5", category: "Cotton Fabrics" },
  { id: "act2-dobby", label: "Dobby", color: "#D6CDB8", category: "Dobby Fabrics" },
  { id: "act2-struct", label: "Structured", color: "#D9D0BD", category: "Structured Weaves" },
  { id: "act2-blend", label: "Blends", color: "#D5CCB6", category: "Cotton-Poly Blends" },
]

// Animated CSS Gradient Placeholder
// Built so a <video> can easily be dropped in here later
function TextureBackground() {
  return (
    <div 
      className="w-full h-full"
      style={{
        background: 'linear-gradient(210deg, #D6B06A 0%, #F5F1E8 30%, #D6CDB8 60%, #1C315E 100%)',
        backgroundSize: '400% 400%',
        animation: 'bg-shift 12s ease-in-out infinite alternate',
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bg-shift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}} />
    </div>
  )
}

function SwatchCard({ swatch }: { swatch: typeof fabricSwatches[0] }) {
  return (
    <Link
      href={`/contact?subject=${encodeURIComponent(swatch.category)}`}
      className="group block p-4 rounded-3xl relative overflow-hidden flex-shrink-0 w-[260px] md:w-[340px] transition-transform duration-500 hover:scale-[1.02]"
      style={{ backgroundColor: 'var(--white)', border: '1px solid rgba(28, 49, 94, 0.08)', textDecoration: 'none' }}
    >
      <div 
        className="relative w-full aspect-[4/5] rounded-2xl flex items-center justify-center transition-transform duration-700 group-hover:scale-105 overflow-hidden"
        style={{ backgroundColor: swatch.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,49,94,0.85)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-6">
          <span className="font-body text-sm font-medium tracking-widest uppercase text-white">
            Enquire
          </span>
          <span className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white text-lg group-hover:bg-white group-hover:text-navy transition-all duration-300">
            →
          </span>
        </div>
      </div>
      <div className="mt-6 px-2 pb-2">
        <p className="text-xs uppercase tracking-widest text-cta mb-2 font-medium">
          {swatch.category}
        </p>
        <h3 className="font-display text-2xl font-normal text-navy transition-colors duration-300 group-hover:text-cta m-0">
          {swatch.label}
        </h3>
      </div>
    </Link>
  )
}

export default function CatalogScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const act1Ref = useRef<HTMLDivElement>(null)
  const act1ContentRef = useRef<HTMLDivElement>(null)
  const maskRectRef = useRef<HTMLDivElement>(null)
  const act2CardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const marqueeRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)

  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkMotion = () => setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    
    checkMobile()
    checkMotion()
    
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useGSAP(() => {
    if (!isMounted || reduceMotion) return;

    // Refresh ScrollTrigger to ensure correct layout calculations
    ScrollTrigger.refresh()

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: act1Ref.current,
        start: "top top",
        end: "+=300%", // ~300vh scroll duration for pinned section
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    })

    // ACT 1: Text Mask Reveal (Bottom to Top)
    tl.to(maskRectRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: "none",
      duration: 1
    })

    // Fade out Act 1 to prepare for Act 2
    if (act1ContentRef.current) {
      tl.to(act1ContentRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut"
      }, "+=0.1")
    }

    // ACT 2: Z-Depth Punch Through
    act2CardsRef.current.forEach((card, index) => {
      if (!card) return;
      const startTime = 1.3 + (index * 0.4); 
      
      tl.fromTo(card, {
        scale: isMobile ? 0.7 : 0.3,
        opacity: 0,
        y: isMobile ? 30 : 0
      }, {
        scale: isMobile ? 1.05 : 2.5,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.in"
      }, startTime)
      
      tl.to(card, {
        opacity: 0,
        duration: 0.1,
        ease: "power1.in"
      }, startTime + 0.5)
    })

    // Buffer space at end
    tl.to({}, { duration: 0.2 })

    // ACT 3: Counter-scroll Marquee
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    const row3 = row3Ref.current

    if (row1) {
      gsap.to(row1, {
        x: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      })
    }
    
    if (row2) {
      gsap.to(row2, {
        x: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        }
      })
    }

    if (row3 && !isMobile) {
      gsap.to(row3, {
        x: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        }
      })
    }

  }, { scope: containerRef, dependencies: [isMounted, isMobile, reduceMotion] })

  // Concatenated arrays for smooth marquee scrolling
  const marqueeItems = [...fabricSwatches, ...fabricSwatches, ...fabricSwatches, ...fabricSwatches]

  return (
    <section ref={containerRef} className="w-full bg-[var(--canvas)] relative">
      
      {/* ACT 1 & 2: Pinned Section */}
      <div ref={act1Ref} className="h-[100svh] w-full relative flex items-center justify-center overflow-hidden">
        
        <div ref={act1ContentRef} className="act1-content absolute inset-0 w-full h-full">
          {/* SVG Definition for Text Mask */}
          <svg width="0" height="0" className="absolute pointer-events-none">
            <defs>
              <clipPath id="textMask">
                <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="font-display uppercase font-normal font-bold" style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}>
                  FABRIC THAT
                </text>
                <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" className="font-display uppercase font-normal font-bold" style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}>
                  BUILDS BRANDS
                </text>
              </clipPath>
            </defs>
          </svg>

          {/* Base Outline / Faded Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="font-display uppercase font-normal font-bold" style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)', fill: 'var(--muted)', opacity: 0.15 }}>
                FABRIC THAT
              </text>
              <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" className="font-display uppercase font-normal font-bold" style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)', fill: 'var(--muted)', opacity: 0.15 }}>
                BUILDS BRANDS
              </text>
            </svg>
          </div>

          {/* Mask Reveal Layer */}
          <div 
            ref={maskRectRef}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ clipPath: reduceMotion ? 'none' : 'inset(100% 0% 0% 0%)' }}
          >
            <div className="w-full h-full" style={{ clipPath: 'url(#textMask)' }}>
              <TextureBackground />
            </div>
          </div>
        </div>

        {/* Act 2: Z-Depth Cards */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          {act2Cards.map((card, i) => (
            <div
              key={card.id}
              ref={el => { act2CardsRef.current[i] = el }}
              className="absolute w-[280px] h-[360px] md:w-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col justify-end p-8"
              style={{ 
                backgroundColor: card.color, 
                willChange: 'transform, opacity',
                opacity: reduceMotion ? 1 : 0,
                display: reduceMotion ? 'none' : 'flex' // Hide in reduced motion to avoid clutter
              }}
            >
              <span className="text-sm font-body uppercase tracking-widest text-[var(--navy)] opacity-70 mb-2">
                {card.category}
              </span>
              <h3 className="text-4xl md:text-5xl font-display text-[var(--navy)] leading-tight m-0 font-normal">
                {card.label}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ACT 3: Marquee Catalog */}
      <div ref={marqueeRef} className="w-full bg-[var(--surface)] py-24 overflow-hidden relative rounded-t-[3rem] z-30 border-t border-[rgba(28,49,94,0.05)] shadow-[0_-20px_60px_rgba(0,0,0,0.03)]">
        <div className="max-w-[var(--max-content)] mx-auto px-6 mb-16 text-center">
          <p className="text-label text-cta mb-4">Fabric Range</p>
          <h2 className="text-heading text-navy">Our Collection</h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-8 relative" style={{ willChange: 'transform' }}>
          
          <div ref={row1Ref} className="flex gap-6 md:gap-8 w-max pl-[5vw]" style={{ transform: reduceMotion ? 'none' : 'translateX(0)' }}>
            {marqueeItems.map((swatch, idx) => (
              <SwatchCard key={`r1-${idx}`} swatch={swatch} />
            ))}
          </div>
          
          <div ref={row2Ref} className="flex gap-6 md:gap-8 w-max pl-[0vw]" style={{ transform: reduceMotion ? 'none' : 'translateX(0)' }}>
            {[...marqueeItems].reverse().map((swatch, idx) => (
              <SwatchCard key={`r2-${idx}`} swatch={swatch} />
            ))}
          </div>
          
          {!isMobile && (
            <div ref={row3Ref} className="flex gap-6 md:gap-8 w-max pl-[10vw]" style={{ transform: reduceMotion ? 'none' : 'translateX(0)' }}>
              {marqueeItems.map((swatch, idx) => (
                <SwatchCard key={`r3-${idx}`} swatch={swatch} />
              ))}
            </div>
          )}

        </div>

        <div className="mt-24 text-center">
          <Link
            href="/products"
            className="text-label inline-block hover:text-cta transition-colors"
            style={{
              color: 'var(--navy)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--cta)',
              paddingBottom: 6,
              letterSpacing: '0.15em',
            }}
          >
            View All Products →
          </Link>
        </div>
      </div>

    </section>
  )
}
