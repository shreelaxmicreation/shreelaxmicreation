'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, X } from 'lucide-react'
import Link from 'next/link'
import { CardStack, CardStackItem } from '@/components/ui/card-stack'
import { urlFor } from '@/sanity/lib/image'
import type { SanityBestSeller } from '@/sanity/lib/types'

interface FloatingBestSellersProps {
  bestSellers: SanityBestSeller[]
}

export default function FloatingBestSellers({ bestSellers }: FloatingBestSellersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [bestSellerCards, setBestSellerCards] = useState<CardStackItem[]>([])
  const [dimensions, setDimensions] = useState({ width: 340, height: 240, spread: 40 })

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 400)
    }
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDimensions({ width: 280, height: 160, spread: 25 })
      } else if (window.innerWidth < 1024) {
        setDimensions({ width: 480, height: 270, spread: 35 })
      } else {
        setDimensions({ width: 640, height: 360, spread: 40 })
      }
    }
    
    handleResize()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Map best sellers from props
  useEffect(() => {
    if (bestSellers && bestSellers.length > 0) {
      const cards: CardStackItem[] = bestSellers.map((item, idx) => {
        // Create a URL slug from the title (fallback to /products if it doesn't match a real product)
        const slug = item.title ? item.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') : ''
        
        return {
          id: (item as any)._id || idx,
          title: item.title || 'Product',
          description: item.description,
          imageSrc: item.image ? urlFor(item.image).width(800).quality(80).format('webp').url() : undefined,
          href: slug ? `/products/${slug}` : '/products',
        }
      })
      setBestSellerCards(cards)
    }
  }, [bestSellers])

  // Hide on mobile (pill nav is there)
  // Only show after user has scrolled a bit
  if (!hasScrolled || bestSellerCards.length === 0) return null

  return (
    <>
      {/* Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[90] flex items-center gap-2 rounded-full px-4 md:px-5 py-3 cursor-pointer border-none"
            style={{
              background: 'var(--navy)',
              color: 'var(--white)',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              boxShadow: '0 8px 32px rgba(28, 49, 94, 0.35)',
            }}
          >
            <Flame className="size-4 text-[var(--cta)]" />
            Best Sellers
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[90] bg-[rgba(28,49,94,0.15)] backdrop-blur-[2px] block"
            />

            {/* Card Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[95] block w-[calc(100vw-2rem)] md:w-[700px] lg:w-[900px]"
            >
              <div
                className="rounded-3xl p-8 pb-6 relative"
                style={{
                  background: 'var(--canvas)',
                  border: '1px solid rgba(28, 49, 94, 0.08)',
                  boxShadow: '0 24px 80px rgba(28, 49, 94, 0.2), 0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Flame className="size-4 text-[var(--cta)]" />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                        color: 'var(--navy)',
                      }}
                    >
                      Best Sellers
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-none hover:bg-[rgba(28,49,94,0.06)] transition-colors"
                    style={{ background: 'transparent', color: 'var(--muted)' }}
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Scaled-down cards */}
                <div className="w-full flex justify-center py-2 overflow-hidden px-8">
                  <CardStack
                    items={bestSellerCards}
                    initialIndex={0}
                    autoAdvance
                    intervalMs={2000}
                    pauseOnHover
                    showDots
                    cardWidth={dimensions.width}
                    cardHeight={dimensions.height}
                    spreadDeg={dimensions.spread}
                    overlap={0.6}
                  />
                </div>

                {/* Footer CTA */}
                <div className="mt-4 text-center">
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="text-xs uppercase tracking-[0.15em] font-medium hover:text-[var(--cta)] transition-colors"
                    style={{
                      color: 'var(--navy)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--cta)',
                      paddingBottom: 2,
                    }}
                  >
                    View All Products →
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
