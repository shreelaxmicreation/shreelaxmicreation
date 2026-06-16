'use client'

import OrangeRule from '@/components/ui/OrangeRule'
import CollectionCard from '@/components/ui/CollectionCard'
import { products } from '@/data/products'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

interface ProductsGridProps {
  mode: 'preview' | 'full'
  showHeader?: boolean
}

export default function ProductsGrid({ mode, showHeader = true }: ProductsGridProps) {
  const items = mode === 'preview' ? products.slice(0, 4) : products

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1 
      }
    },
  }

  if (products.length === 0) {
    return (
      <section
        id="products-grid"
        className="w-full section-padded relative overflow-hidden"
        style={{ background: 'var(--surface)' }}
      >
        <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <OrangeRule />
          <p className="text-label mt-6 mb-4 text-muted">What We Make</p>
          <h2 className="text-display-m mb-12" style={{ color: 'var(--navy)' }}>Products</h2>
          <p className="text-body text-muted">
            New products coming soon.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="products-grid"
      className="w-full section-padded relative overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      <div className="absolute inset-0 liquid-gradient opacity-20 pointer-events-none" />
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label text-cta mb-4">Fabric Range</p>
            <OrangeRule />
            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] font-display font-normal leading-[1.1] mt-6 mb-12"
              style={{ color: 'var(--navy)' }}
            >
              Our{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Products</span>
            </h2>
          </motion.div>
        )}

        <motion.div 
          className={mode === 'preview' ? 'collections-preview-grid' : 'collections-full-grid'}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {items.map((item) => (
            <motion.div key={item.slug} variants={itemVariants}>
              <CollectionCard
                image={item.image}
                name={item.name}
                category={item.category}
                slug={`products/${item.slug}`}
              />
            </motion.div>
          ))}
        </motion.div>

        {mode === 'preview' && (
          <div style={{ marginTop: 80, textAlign: 'center' }}>
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
        )}
      </div>
    </section>
  )
}
