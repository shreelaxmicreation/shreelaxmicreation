'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, X } from 'lucide-react'
import Link from 'next/link'
import DisplayCards from '@/components/ui/display-cards'
import type { DisplayCardProps } from '@/components/ui/display-cards'
import { urlFor } from '@/sanity/lib/image'
import type { SanityBestSeller } from '@/sanity/lib/types'

const cardClassNames = [
  "[grid-area:stack] hover:-translate-y-10 focus:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[rgba(28,49,94,0.08)] before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[var(--canvas)]/50 grayscale-[100%] hover:before:opacity-0 focus:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 focus:grayscale-0 before:left-0 before:top-0",
  "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 focus:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[rgba(28,49,94,0.08)] before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[var(--canvas)]/50 grayscale-[100%] hover:before:opacity-0 focus:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 focus:grayscale-0 before:left-0 before:top-0",
  "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 focus:translate-y-10",
]

interface FloatingBestSellersProps {
  bestSellers: SanityBestSeller[]
}

export default function FloatingBestSellers({ bestSellers }: FloatingBestSellersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [bestSellerCards, setBestSellerCards] = useState<DisplayCardProps[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Map best sellers from props
  useEffect(() => {
    if (bestSellers && bestSellers.length > 0) {
      const cards: DisplayCardProps[] = bestSellers.map((item, idx) => ({
        icon: <Flame className="size-4 text-[var(--cta)]" />,
        title: item.title,
        description: item.description,
        date: item.badge,
        image: item.image ? urlFor(item.image).width(800).quality(80).format('webp').url() : undefined,
        titleClassName: "text-[var(--navy)]",
        className: cardClassNames[idx] || cardClassNames[cardClassNames.length - 1],
      }))
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
              className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[95] block"
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
                <div className="transform scale-[0.72] origin-top-right -mr-12 -mb-8">
                  <DisplayCards cards={bestSellerCards} />
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
