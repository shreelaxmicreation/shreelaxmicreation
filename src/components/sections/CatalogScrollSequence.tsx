'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityFabricSwatch, SanityProduct } from '@/sanity/lib/types'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

// ── Default animation config for featured cards ──
const featuredCardDefaults: Record<number, { fromX: string; fromY: string; startScale: number; peakScale: number; delayOffset: number }> = {
  0: { fromX: "-60vw", fromY: "10vh", startScale: 0.25, peakScale: 2.6, delayOffset: 0.00 },
  1: { fromX: "70vw", fromY: "-15vh", startScale: 0.35, peakScale: 2.1, delayOffset: 0.12 },
  2: { fromX: "-40vw", fromY: "20vh", startScale: 0.30, peakScale: 2.4, delayOffset: 0.22 },
  3: { fromX: "55vw", fromY: "5vh", startScale: 0.40, peakScale: 1.9, delayOffset: 0.32 },
}

interface CatalogScrollSequenceProps {
  items: SanityProduct[]
}

function SwatchCard({ item }: { item: SanityProduct | SanityFabricSwatch | any }) {
  const sourceImage = item.gallery?.[0] || item.image
  const imageUrl = sourceImage ? urlFor(sourceImage).width(800).quality(80).format('webp').url() : ''
  const name = 'name' in item ? item.name : item.label
  const category = item.category || 'Shirting'
  const color = item.color || 'var(--surface)'

  return (
    <Link
      href={`/contact?subject=${encodeURIComponent(category)}`}
      className="group block p-4 rounded-3xl relative overflow-hidden flex-shrink-0 w-[220px] md:w-[340px] transition-transform duration-500 hover:scale-[1.02]"
      style={{ backgroundColor: 'var(--white)', border: '1px solid rgba(28, 49, 94, 0.08)', textDecoration: 'none' }}
    >
      <div 
        className="relative w-full aspect-[4/5] rounded-2xl flex items-center justify-center transition-transform duration-700 group-hover:scale-105 overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {imageUrl && <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover" />}
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
          {category}
        </p>
        <h3 className="font-display text-xl md:text-2xl font-normal text-navy transition-colors duration-300 group-hover:text-cta m-0">
          {name}
        </h3>
      </div>
    </Link>
  )
}

export default function CatalogScrollSequence({ items = [] }: CatalogScrollSequenceProps) {
  console.log("CLIENT RENDER CatalogScrollSequence items length:", items.length)

  const containerRef = useRef<HTMLDivElement>(null)
  const act1Ref = useRef<HTMLDivElement>(null)
  const act1ContentRef = useRef<HTMLDivElement>(null)
  const maskRectRef = useRef<HTMLDivElement>(null)
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

  // Only use products that have at least one valid photo (gallery or image)
  // This ensures we don't render blank cards, while honoring the user's manual CMS selections.
  const validProducts = items.filter(item => (item.gallery && item.gallery.length > 0) || item.image)
  
  // If we don't have enough valid products, fallback to raw items just in case
  const featuredSource = validProducts.length > 0 ? validProducts : items
  const featuredCards = featuredSource.slice(0, 4)
  
  // Fill Act 3 with products. If we don't have 8, repeat them.
  let allSwatches: any[] = []
  if (validProducts.length > 0) {
    allSwatches = validProducts.slice(4, 12)
    // If there were 4 or fewer products, slice(4, 12) is empty. Fall back to reusing the same products.
    if (allSwatches.length === 0) {
      allSwatches = [...validProducts]
    }
    while (allSwatches.length < 8 && allSwatches.length > 0) {
      allSwatches = [...allSwatches, ...validProducts].slice(0, 8)
    }
  } else {
    allSwatches = items.slice(4, 12)
  }

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkMotion = () => setReduceMotion(false)
    
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
    const act2Cards = gsap.utils.toArray<HTMLDivElement>('.act2-card', containerRef.current);
    
    featuredCards.forEach((cardData, index) => {
      const card = act2Cards[index];
      console.log(`CLIENT GSAP SETUP Act 2 card ${index}:`, !!card)
      if (!card) return;
      
      const defaults = featuredCardDefaults[index] || featuredCardDefaults[0]
      const spacing = 0.8;
      const startTime = 0.6 + (index * spacing); 
      
      const targetScale = isMobile ? defaults.peakScale * 0.45 : defaults.peakScale * 0.65;
      
      // Continuous slow movement
      tl.fromTo(card, {
        x: defaults.fromX,
        y: isMobile ? 0 : defaults.fromY,
        scale: defaults.startScale,
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

  }, { scope: containerRef, dependencies: [isMounted, isMobile, reduceMotion, featuredCards] })

  // Concatenated arrays for smooth marquee scrolling
  const marqueeItems = [...allSwatches, ...allSwatches, ...allSwatches, ...allSwatches]

  // ── REDUCED MOTION FALLBACK ──────────────────────────
  if (reduceMotion && isMounted) {
    return (
      <section className="w-full relative z-10">
        {/* Static Hero Banner */}
        <div className="w-full relative flex items-center justify-center overflow-hidden bg-[var(--canvas)]" style={{ minHeight: '60vh' }}>
          <div className="absolute inset-0 w-full h-full">
            {/* Text with texture fill - fully revealed */}
            <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
              <defs>
                <clipPath id="textMaskStatic">
                  <text x="50%" y="38%" textAnchor="middle" dy="0.1em" dominantBaseline="middle" className="font-display uppercase font-bold tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 13rem)' }}>
                    FABRIC THAT
                  </text>
                  <text x="50%" y="62%" textAnchor="middle" dy="0.1em" dominantBaseline="middle" className="font-display uppercase font-bold tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 13rem)' }}>
                    BUILDS BRANDS
                  </text>
                </clipPath>
              </defs>
              <g clipPath="url(#textMaskStatic)">
                <rect width="100%" height="100%" fill="var(--navy)" />
              </g>
            </svg>
          </div>
        </div>

        {/* Static Category Cards Grid */}
        <div className="w-full bg-[var(--canvas)] py-16 md:py-24">
          <div className="max-w-[var(--max-content)] mx-auto px-6">
            <p className="text-label text-cta mb-4 text-center">Our Expertise</p>
            <h2 className="text-heading text-navy text-center mb-12 md:mb-16">Fabric Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCards.map((card) => {
                const sourceImage = card.gallery?.[0] || card.image
                const imageUrl = sourceImage ? urlFor(sourceImage).width(1200).quality(80).format('webp').url() : ''
                return (
                  <Link
                    key={card._id}
                    href={`/contact?subject=${encodeURIComponent(card.category)}`}
                    className="group block rounded-2xl overflow-hidden relative"
                    style={{ textDecoration: 'none', aspectRatio: '3/4' }}
                  >
                    {imageUrl && <img src={imageUrl} alt={card.name} className="absolute inset-0 w-full h-full object-cover" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,49,94,0.85)] via-[rgba(28,49,94,0.2)] to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 relative z-10">
                      <span className="text-xs font-body uppercase tracking-widest text-[var(--white)] opacity-80 mb-2 block">
                        {card.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display text-[var(--white)] leading-tight m-0 font-normal">
                        {card.name}
                      </h3>
                    </div>
                    {/* Hover arrow */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      →
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Static Scrollable Catalog */}
        <div className="w-full bg-[var(--surface)] py-24 overflow-hidden relative rounded-t-[3rem] z-30 border-t border-[rgba(28,49,94,0.05)] shadow-[0_-20px_60px_rgba(0,0,0,0.03)]">
          <div className="max-w-[var(--max-content)] mx-auto px-6 mb-16 text-center">
            <p className="text-label text-cta mb-4">Fabric Range</p>
            <h2 className="text-heading text-navy">Our Collection</h2>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 relative w-full">
            <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
              <div className="flex gap-6 md:gap-8 w-max pl-[5vw]">
                {allSwatches.map((swatch, idx) => (
                  <SwatchCard key={`static-r1-${idx}`} item={swatch} />
                ))}
              </div>
            </div>
            <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
              <div className="flex gap-6 md:gap-8 w-max pl-[0vw]">
                {[...allSwatches].reverse().map((swatch, idx) => (
                  <SwatchCard key={`static-r2-${idx}`} item={swatch} />
                ))}
              </div>
            </div>
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
              <text x="50%" y="38%" textAnchor="middle" dy="0.1em" dominantBaseline="middle" className="font-display uppercase font-bold tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 13rem)', fill: 'var(--navy)', opacity: 0.15 }}>
                FABRIC THAT
              </text>
              <text x="50%" y="62%" textAnchor="middle" dy="0.1em" dominantBaseline="middle" className="font-display uppercase font-bold tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 13rem)', fill: 'var(--navy)', opacity: 0.15 }}>
                BUILDS BRANDS
              </text>
            </svg>
          </div>

          {/* Mask Reveal Layer using Native SVG to ensure iOS Safari compatibility */}
          <div 
            ref={maskRectRef}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
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
                <rect width="100%" height="100%" fill="var(--navy)" />
              </g>
            </svg>
          </div>
        </div>

        {/* Act 2: Z-Depth Cards */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          {featuredCards.map((card, i) => {
            const defaults = featuredCardDefaults[i] || featuredCardDefaults[0]
            const size = (i === 0 || i === 2 ? 'lg' : i === 1 ? 'md' : 'sm')
            const sourceImage = card.gallery?.[0] || card.image
            const imageUrl = sourceImage ? urlFor(sourceImage).width(1200).quality(80).format('webp').url() : ''
            
            return (
              <div
                key={card._id}
                className={`act2-card absolute rounded-[2rem] overflow-hidden shadow-2xl flex flex-col justify-end p-6 md:p-8 ${
                  size === 'lg' ? 'w-[300px] h-[400px] md:w-[500px] md:h-[650px]' : 
                  size === 'md' ? 'w-[240px] h-[320px] md:w-[400px] md:h-[500px]' : 
                  'w-[180px] h-[240px] md:w-[300px] md:h-[400px]'
                }`}
                style={{ 
                  backgroundColor: 'var(--navy)', 
                  willChange: 'transform, opacity',
                }}
              >
                {imageUrl && <img src={imageUrl} alt={card.name} className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,49,94,0.7)] to-transparent z-0 pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="text-sm font-body uppercase tracking-widest text-[var(--white)] opacity-90 mb-2 block">
                    {card.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display text-[var(--white)] leading-tight m-0 font-normal">
                    {card.name}
                  </h3>
                </div>
              </div>
            )
          })}
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
            <div ref={row1Ref} className="flex gap-6 md:gap-8 w-max pl-[5vw]" style={{ transform: 'translateX(0)' }}>
              {marqueeItems.map((item, idx) => (
                <SwatchCard key={`r1-${idx}`} item={item} />
              ))}
            </div>
          </div>
          
          <div ref={row2ParentRef} className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
            <div ref={row2Ref} className="flex gap-6 md:gap-8 w-max pl-[0vw]" style={{ transform: 'translateX(0)' }}>
              {[...marqueeItems].reverse().map((item, idx) => (
                <SwatchCard key={`r2-${idx}`} item={item} />
              ))}
            </div>
          </div>
          
          {!isMobile && (
            <div ref={row3ParentRef} className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
              <div ref={row3Ref} className="flex gap-6 md:gap-8 w-max pl-[10vw]" style={{ transform: 'translateX(0)' }}>
                {marqueeItems.map((item, idx) => (
                  <SwatchCard key={`r3-${idx}`} item={item} />
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
