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
  { id: "cotton-01", label: "Pure Cotton", color: "#E8E2D5", category: "Cotton Fabrics", image: "https://images.unsplash.com/photo-1594938298595-d2d87e0b82f0?q=80&w=800&auto=format&fit=crop" },
  { id: "cotton-02", label: "Poplin", color: "#E0D7C6", category: "Cotton Fabrics", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop" },
  { id: "cotton-03", label: "Oxford", color: "#D8CDBC", category: "Cotton Fabrics", image: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=800&auto=format&fit=crop" },
  { id: "dobby-01", label: "Dobby Weave", color: "#D6CDB8", category: "Dobby Fabrics", image: "https://images.unsplash.com/photo-1584031402281-224cb82cb8cb?q=80&w=800&auto=format&fit=crop" },
  { id: "dobby-02", label: "Textured Dobby", color: "#CFC3AD", category: "Dobby Fabrics", image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=800&auto=format&fit=crop" },
  { id: "dobby-03", label: "Micro Dobby", color: "#C5B8A1", category: "Dobby Fabrics", image: "https://images.unsplash.com/photo-1594938298595-d2d87e0b82f0?q=80&w=800&auto=format&fit=crop" },
  { id: "struct-01", label: "Herringbone", color: "#D9D0BD", category: "Structured Weaves", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop" },
  { id: "struct-02", label: "Twill", color: "#D1C6B0", category: "Structured Weaves", image: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=800&auto=format&fit=crop" },
  { id: "struct-03", label: "Birdseye", color: "#C6BAA3", category: "Structured Weaves", image: "https://images.unsplash.com/photo-1584031402281-224cb82cb8cb?q=80&w=800&auto=format&fit=crop" },
  { id: "blend-01", label: "Poly-Cotton", color: "#D5CCB6", category: "Cotton-Poly Blends", image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=800&auto=format&fit=crop" },
  { id: "blend-02", label: "Stretch Blend", color: "#CCBFA7", category: "Cotton-Poly Blends", image: "https://images.unsplash.com/photo-1594938298595-d2d87e0b82f0?q=80&w=800&auto=format&fit=crop" },
]

const act2Cards = [
  { id: "cotton", label: "Cotton", color: "#E8E2D5", category: "Cotton Fabrics", image: "https://images.unsplash.com/photo-1594938298595-d2d87e0b82f0?q=80&w=1200&auto=format&fit=crop", fromX: "-60vw", fromY: "10vh", startScale: 0.25, peakScale: 2.6, size: "lg", delayOffset: 0.00 },
  { id: "dobby", label: "Dobby", color: "#D6CDB8", category: "Dobby Fabrics", image: "https://images.unsplash.com/photo-1584031402281-224cb82cb8cb?q=80&w=1200&auto=format&fit=crop", fromX: "70vw", fromY: "-15vh", startScale: 0.35, peakScale: 2.1, size: "md", delayOffset: 0.12 },
  { id: "structured", label: "Structured", color: "#D9D0BD", category: "Structured Weaves", image: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=1200&auto=format&fit=crop", fromX: "-40vw", fromY: "20vh", startScale: 0.30, peakScale: 2.4, size: "lg", delayOffset: 0.22 },
  { id: "blends", label: "Blends", color: "#D5CCB6", category: "Cotton-Poly Blends", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop", fromX: "55vw", fromY: "5vh", startScale: 0.40, peakScale: 1.9, size: "sm", delayOffset: 0.32 },
]

// Animated CSS Gradient Placeholder
// Built so a <video> can easily be dropped in here later
function TextureBackground() {
  return (
    <div className="w-full h-full relative">
      <img 
        src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=3000&auto=format&fit=crop" 
        alt="Fabric Texture placeholder" 
        className="w-full h-full object-cover"
      />
      {/* Overlay to ensure text legibility and match brand tones */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(28,49,94,0.4)] to-[rgba(214,176,106,0.2)] mix-blend-multiply" />
    </div>
  )
}

function SwatchCard({ swatch }: { swatch: typeof fabricSwatches[0] }) {
  return (
    <Link
      href={`/contact?subject=${encodeURIComponent(swatch.category)}`}
      className="group block p-4 rounded-3xl relative overflow-hidden flex-shrink-0 w-[220px] md:w-[340px] transition-transform duration-500 hover:scale-[1.02]"
      style={{ backgroundColor: 'var(--white)', border: '1px solid rgba(28, 49, 94, 0.08)', textDecoration: 'none' }}
    >
      <div 
        className="relative w-full aspect-[4/5] rounded-2xl flex items-center justify-center transition-transform duration-700 group-hover:scale-105 overflow-hidden"
        style={{ backgroundColor: swatch.color }}
      >
        <img src={swatch.image} alt={swatch.label} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50" />
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
        <h3 className="font-display text-xl md:text-2xl font-normal text-navy transition-colors duration-300 group-hover:text-cta m-0">
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
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  
  const marqueeRef = useRef<HTMLDivElement>(null)
  const row1ParentRef = useRef<HTMLDivElement>(null)
  const row2ParentRef = useRef<HTMLDivElement>(null)
  const row3ParentRef = useRef<HTMLDivElement>(null)
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

    // Scroll the draggable containers to the middle so the user has infinite scrolling in both directions
    if (row1ParentRef.current) row1ParentRef.current.scrollLeft = 4000;
    if (row2ParentRef.current) row2ParentRef.current.scrollLeft = 4000;
    if (row3ParentRef.current) row3ParentRef.current.scrollLeft = 4000;

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useGSAP(() => {
    if (!isMounted || reduceMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: act1Ref.current,
        start: "top top",
        end: "+=500%", // ~500vh scroll duration for more breathing room
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      }
    })

    // Fade out scroll indicator immediately upon scrolling
    tl.to(scrollIndicatorRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    }, 0)

    // ACT 1: Text Mask Reveal (Bottom to Top)
    tl.to(maskRectRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: "none",
      duration: 0.4 // Fast Act 1
    }, 0)

    // Fade out Act 1 to prepare for Act 2
    if (act1ContentRef.current) {
      tl.to(act1ContentRef.current, {
        opacity: 0,
        duration: 0.1, 
        ease: "power2.inOut"
      }, "+=0.05")
    }

    // ACT 2: Z-Depth Punch Through
    act2Cards.forEach((cardData, index) => {
      const card = act2CardsRef.current[index];
      if (!card) return;
      
      const spacing = 0.8;
      const startTime = 0.6 + (index * spacing); 
      
      const targetScale = isMobile ? cardData.peakScale * 0.45 : cardData.peakScale * 0.65;
      
      // Continuous slow movement
      tl.fromTo(card, {
        x: cardData.fromX,
        y: isMobile ? 0 : cardData.fromY,
        scale: cardData.startScale,
      }, {
        x: 0,
        y: 0,
        scale: targetScale, // Much less zoomed
        duration: 1.7, 
        ease: "power1.out"
      }, startTime)
      
      // Fade in
      tl.fromTo(card, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut"
      }, startTime)

      // Fade out
      tl.to(card, {
        opacity: 0,
        duration: 0.3, 
        ease: "power2.inOut"
      }, startTime + 1.4)
    })

    // Buffer space at end
    tl.to({}, { duration: 0.4 })

    // ACT 3: Counter-scroll Marquee
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    const row3 = row3Ref.current

    if (row1) {
      gsap.fromTo(row1, {
        x: "0%",
      }, {
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
      gsap.fromTo(row2, {
        x: "-15%",
      }, {
        x: "0%",
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
      gsap.fromTo(row3, {
        x: "0%",
      }, {
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
    <section ref={containerRef} className="w-full relative z-10">
      
      {/* ACT 1 & 2: Pinned Section */}
      <div ref={act1Ref} className="h-[100svh] w-full relative flex items-center justify-center overflow-hidden bg-[var(--canvas)]">
        
        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 z-30 pointer-events-none">
          <span className="text-[10px] tracking-[0.2em] uppercase mb-3 font-medium text-[var(--navy)] animate-pulse">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--navy)] to-transparent" />
        </div>

        <div ref={act1ContentRef} className="act1-content absolute inset-0 w-full h-full">
          {/* Base Outline / Faded Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="38%" textAnchor="middle" dy="0.1em" dominantBaseline="middle" className="font-display uppercase font-bold tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 13rem)', fill: 'var(--navy)', opacity: 1 }}>
                FABRIC THAT
              </text>
              <text x="50%" y="62%" textAnchor="middle" dy="0.1em" dominantBaseline="middle" className="font-display uppercase font-bold tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 13rem)', fill: 'var(--navy)', opacity: 1 }}>
                BUILDS BRANDS
              </text>
            </svg>
          </div>

          {/* Mask Reveal Layer using Native SVG to ensure iOS Safari compatibility */}
          <div 
            ref={maskRectRef}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ clipPath: reduceMotion ? 'none' : 'inset(100% 0% 0% 0%)' }}
          >
            <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
              <defs>
                <clipPath id="textMask">
                  <text x="50%" y="38%" textAnchor="middle" dy="0.1em" dominantBaseline="middle" className="font-display uppercase font-bold tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 13rem)' }}>
                    FABRIC THAT
                  </text>
                  <text x="50%" y="62%" textAnchor="middle" dy="0.1em" dominantBaseline="middle" className="font-display uppercase font-bold tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 13rem)' }}>
                    BUILDS BRANDS
                  </text>
                </clipPath>
              </defs>
              <g clipPath="url(#textMask)">
                <image href="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=3000&auto=format&fit=crop" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" />
                <rect width="100%" height="100%" fill="rgba(28,49,94,0.4)" style={{ mixBlendMode: 'multiply' }} />
                <rect width="100%" height="100%" fill="rgba(214,176,106,0.2)" style={{ mixBlendMode: 'multiply' }} />
              </g>
            </svg>
          </div>
        </div>

        {/* Act 2: Z-Depth Cards */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          {act2Cards.map((card, i) => (
            <div
              key={card.id}
              ref={el => { act2CardsRef.current[i] = el }}
              className={`absolute rounded-[2rem] overflow-hidden shadow-2xl flex flex-col justify-end p-6 md:p-8 ${
                card.size === 'lg' ? 'w-[300px] h-[400px] md:w-[500px] md:h-[650px]' : 
                card.size === 'md' ? 'w-[240px] h-[320px] md:w-[400px] md:h-[500px]' : 
                'w-[180px] h-[240px] md:w-[300px] md:h-[400px]'
              }`}
              style={{ 
                backgroundColor: card.color, 
                willChange: 'transform, opacity',
                opacity: reduceMotion ? 1 : 0,
                display: reduceMotion ? 'none' : 'flex' // Hide in reduced motion to avoid clutter
              }}
            >
              <img src={card.image} alt={card.label} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-60 z-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,49,94,0.7)] to-transparent z-0 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="text-sm font-body uppercase tracking-widest text-[var(--white)] opacity-90 mb-2 block">
                  {card.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-display text-[var(--white)] leading-tight m-0 font-normal">
                  {card.label}
                </h3>
              </div>
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

        <div className="flex flex-col gap-6 md:gap-8 relative w-full" style={{ willChange: 'transform' }}>
          
          <div ref={row1ParentRef} className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
            <div ref={row1Ref} className="flex gap-6 md:gap-8 w-max pl-[5vw]" style={{ transform: reduceMotion ? 'none' : 'translateX(0)' }}>
              {marqueeItems.map((swatch, idx) => (
                <SwatchCard key={`r1-${idx}`} swatch={swatch} />
              ))}
            </div>
          </div>
          
          <div ref={row2ParentRef} className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
            <div ref={row2Ref} className="flex gap-6 md:gap-8 w-max pl-[0vw]" style={{ transform: reduceMotion ? 'none' : 'translateX(0)' }}>
              {[...marqueeItems].reverse().map((swatch, idx) => (
                <SwatchCard key={`r2-${idx}`} swatch={swatch} />
              ))}
            </div>
          </div>
          
          {!isMobile && (
            <div ref={row3ParentRef} className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
              <div ref={row3Ref} className="flex gap-6 md:gap-8 w-max pl-[10vw]" style={{ transform: reduceMotion ? 'none' : 'translateX(0)' }}>
                {marqueeItems.map((swatch, idx) => (
                  <SwatchCard key={`r3-${idx}`} swatch={swatch} />
                ))}
              </div>
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
