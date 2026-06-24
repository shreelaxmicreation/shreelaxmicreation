'use client'

import OrangeRule from '@/components/ui/OrangeRule'
import CollectionCard from '@/components/ui/CollectionCard'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import type { SanityProduct } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import { useState, useMemo } from 'react'

interface ProductsGridProps {
  mode: 'preview' | 'full'
  showHeader?: boolean
  products: SanityProduct[]
}

export default function ProductsGrid({ mode, showHeader = true, products = [] }: ProductsGridProps) {
  // On homepage (preview mode), ensure we only show products with at least one photo
  const baseProducts = mode === 'preview' 
    ? (products || []).filter(p => (p.gallery && p.gallery.length > 0) || p.image)
    : (products || []);
  
  const safeProducts = baseProducts.length > 0 ? baseProducts : (products || []);
  
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedPrints, setSelectedPrints] = useState<string[]>([]);

  const allFabrics = useMemo(() => {
    const fabrics = new Set<string>();
    safeProducts.forEach(p => p.fabricTypes?.forEach(f => fabrics.add(f)));
    return Array.from(fabrics).sort();
  }, [safeProducts]);

  const allPrints = useMemo(() => {
    const prints = new Set<string>();
    safeProducts.forEach(p => p.printTypes?.forEach(pr => prints.add(pr)));
    return Array.from(prints).sort();
  }, [safeProducts]);

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics(prev => prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]);
  };

  const togglePrint = (print: string) => {
    setSelectedPrints(prev => prev.includes(print) ? prev.filter(p => p !== print) : [...prev, print]);
  };

  const filteredProducts = useMemo(() => {
    return safeProducts.filter(p => {
      const matchFabric = selectedFabrics.length === 0 || selectedFabrics.some(f => p.fabricTypes?.includes(f));
      const matchPrint = selectedPrints.length === 0 || selectedPrints.some(pr => p.printTypes?.includes(pr));
      return matchFabric && matchPrint;
    });
  }, [safeProducts, selectedFabrics, selectedPrints]);

  const items = mode === 'preview' ? filteredProducts.slice(0, 4) : filteredProducts;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  if (safeProducts.length === 0) {
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

        {/* Filter Pills */}
        {mode === 'full' && (allFabrics.length > 0 || allPrints.length > 0) && (
          <div className={`mb-12 flex flex-col gap-4 md:gap-6 ${!showHeader ? 'mt-4 md:mt-10' : 'mt-0'}`}>
            {allFabrics.length > 0 && (
              <div>
                <span className="text-sm uppercase tracking-widest text-muted mb-3 inline-block font-medium">Fabric Type</span>
                <div className="flex max-md:flex-nowrap flex-wrap gap-2 max-md:overflow-x-auto max-md:pb-2 max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
                  <button
                    onClick={() => setSelectedFabrics([])}
                    className="max-md:px-3 max-md:py-1 max-md:text-[11px] px-4 py-1.5 rounded-full text-sm transition-colors duration-300 flex-shrink-0"
                    style={{
                      border: '1px solid var(--navy)',
                      backgroundColor: selectedFabrics.length === 0 ? 'var(--navy)' : 'transparent',
                      color: selectedFabrics.length === 0 ? 'var(--white)' : 'var(--navy)',
                      opacity: selectedFabrics.length === 0 ? 1 : 0.6
                    }}
                  >
                    All
                  </button>
                  {allFabrics.map(f => {
                    const isSelected = selectedFabrics.includes(f);
                    return (
                      <button
                        key={f}
                        onClick={() => toggleFabric(f)}
                        className="max-md:px-3 max-md:py-1 max-md:text-[11px] px-4 py-1.5 rounded-full text-sm transition-colors duration-300 flex-shrink-0"
                        style={{
                          border: '1px solid var(--navy)',
                          backgroundColor: isSelected ? 'var(--navy)' : 'transparent',
                          color: isSelected ? 'var(--white)' : 'var(--navy)',
                          opacity: isSelected ? 1 : 0.6
                        }}
                      >
                        {f}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {allPrints.length > 0 && (
              <div>
                <span className="text-sm uppercase tracking-widest text-muted mb-3 inline-block font-medium">Print & Pattern</span>
                <div className="flex max-md:flex-nowrap flex-wrap gap-2 max-md:overflow-x-auto max-md:pb-2 max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
                  <button
                    onClick={() => setSelectedPrints([])}
                    className="max-md:px-3 max-md:py-1 max-md:text-[11px] px-4 py-1.5 rounded-full text-sm transition-colors duration-300 flex-shrink-0"
                    style={{
                      border: '1px solid var(--navy)',
                      backgroundColor: selectedPrints.length === 0 ? 'var(--navy)' : 'transparent',
                      color: selectedPrints.length === 0 ? 'var(--white)' : 'var(--navy)',
                      opacity: selectedPrints.length === 0 ? 1 : 0.6
                    }}
                  >
                    All
                  </button>
                  {allPrints.map(p => {
                    const isSelected = selectedPrints.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => togglePrint(p)}
                        className="max-md:px-3 max-md:py-1 max-md:text-[11px] px-4 py-1.5 rounded-full text-sm transition-colors duration-300 flex-shrink-0"
                        style={{
                          border: '1px solid var(--navy)',
                          backgroundColor: isSelected ? 'var(--navy)' : 'transparent',
                          color: isSelected ? 'var(--white)' : 'var(--navy)',
                          opacity: isSelected ? 1 : 0.6
                        }}
                      >
                        {p}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-body text-muted">No products found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedFabrics([]);
                setSelectedPrints([]);
              }}
              className="mt-4 text-sm font-medium tracking-widest uppercase transition-colors"
              style={{ color: 'var(--cta)', borderBottom: '1px solid var(--cta)' }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div 
            className={mode === 'preview' ? 'collections-preview-grid' : 'collections-full-grid'}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {items.map((item) => {
              const sourceImage = item.gallery?.[0] || item.image
              const imageUrl = sourceImage
                ? urlFor(sourceImage).width(800).height(1000).quality(80).format('webp').url()
                : ''
              return (
                <motion.div key={item._id || item.slug} variants={itemVariants}>
                  <CollectionCard
                    image={imageUrl}
                    name={item.name}
                    category={item.category}
                    slug={`/products/${item.slug}`}
                    fabricTypes={item.fabricTypes}
                    printTypes={item.printTypes}
                    compactOnMobile={true}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {mode === 'preview' && (
          <div style={{ marginTop: 80, textAlign: 'center' }}>
            <Link
              href="/products"
              className="text-label inline-block hover:opacity-80 transition-opacity"
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
