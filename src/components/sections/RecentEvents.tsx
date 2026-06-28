'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { ChevronRight } from 'lucide-react'
import type { SanityBlogPost } from '@/sanity/lib/types'

interface RecentEventsProps {
  events: SanityBlogPost[]
}

export default function RecentEvents({ events }: RecentEventsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) return

    const el = scrollRef.current
    if (!el) return

    let autoScroll = setInterval(() => {
      const scrollWidth = el.scrollWidth
      const clientWidth = el.clientWidth
      
      if (el.scrollLeft + clientWidth >= scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        const item = el.children[0] as HTMLElement
        const scrollAmount = item ? item.offsetWidth + 24 : clientWidth * 0.65
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }, 3000)

    const handleTouch = () => clearInterval(autoScroll)
    el.addEventListener('touchstart', handleTouch, { passive: true })
    el.addEventListener('mousedown', handleTouch)

    return () => {
      clearInterval(autoScroll)
      el.removeEventListener('touchstart', handleTouch)
      el.removeEventListener('mousedown', handleTouch)
    }
  }, [events])

  if (!events || events.length === 0) return null

  return (
    <section className="w-full relative z-10 overflow-hidden" style={{ padding: '80px 24px', background: 'var(--canvas)' }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto' }}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-label text-cta mb-4 tracking-[0.2em]">Latest Updates</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" style={{ color: 'var(--navy)' }}>
              Recent <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Events</span> & Insights
            </h2>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center text-sm font-medium tracking-widest uppercase transition-colors" 
            style={{ color: 'var(--navy)' }}
          >
            View All
            <span className="ml-2 w-8 h-8 rounded-full border border-[var(--card-border)] flex items-center justify-center group-hover:bg-[var(--navy)] group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {events.map((post, idx) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="w-[65vw] sm:w-[350px] md:w-auto flex-shrink-0 snap-start h-auto"
            >
              <Link href={`/blog/${post.slug}`} className="group block text-decoration-none h-full">
                <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full flex flex-col" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: '0 8px 30px rgba(28, 49, 94, 0.04)' }}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted text-sm uppercase tracking-widest bg-[var(--surface)]">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <time className="text-[10px] md:text-xs text-muted mb-3 block tracking-widest uppercase font-medium">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <h3 className="text-xl md:text-2xl font-display font-medium mb-4 transition-colors line-clamp-2 leading-tight" style={{ color: 'var(--navy)' }}>
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted line-clamp-2 md:line-clamp-3 mb-6 flex-1 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs font-semibold tracking-widest uppercase transition-colors" style={{ color: 'var(--cta)' }}>
                      Read Article <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
