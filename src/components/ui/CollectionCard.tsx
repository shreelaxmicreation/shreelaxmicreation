'use client'

import Image from 'next/image'
import Link from 'next/link'

interface CollectionCardProps {
  image: string
  name: string
  category: string
  slug: string
  fabricTypes?: string[]
  printTypes?: string[]
  compactOnMobile?: boolean
}

export default function CollectionCard({ image, name, category, slug, fabricTypes, printTypes, compactOnMobile }: CollectionCardProps) {
  return (
    <Link
      href={slug}
      className={`liquid-glass-card group block h-full flex flex-col rounded-3xl relative overflow-hidden ${compactOnMobile ? 'p-2 md:p-4' : 'p-4'}`}
      style={{ textDecoration: 'none' }}
    >
      {/* Image with zoom */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-surface flex items-center justify-center bg-[var(--surface)]">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="group-hover:scale-110 transition-all duration-700"
          />
        ) : (
          <span className="text-[var(--muted)]/50 text-xs uppercase tracking-widest">Image Coming Soon</span>
        )}

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-[rgba(28,49,94,0.85)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between ${compactOnMobile ? 'p-3 md:p-6' : 'p-6'}`}>
          <span className={`font-body font-medium tracking-widest uppercase text-white ${compactOnMobile ? 'text-[9px] md:text-sm' : 'text-sm'}`}>
            View Details
          </span>
          <span className={`rounded-full border border-white/50 flex items-center justify-center text-white group-hover:bg-white group-hover:text-navy transition-all duration-300 ${compactOnMobile ? 'w-6 h-6 text-sm md:w-10 md:h-10 md:text-lg' : 'w-10 h-10 text-lg'}`}>
            →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className={`mt-6 px-2 pb-2 flex-grow flex flex-col ${compactOnMobile ? 'max-md:mt-3 max-md:px-0 max-md:pb-0' : ''}`}>
        <div className={`flex flex-wrap items-center gap-2 mb-2 ${compactOnMobile ? 'max-md:gap-1 max-md:mb-1' : ''}`}>
          <p className={`text-xs uppercase tracking-widest text-cta font-medium ${compactOnMobile ? 'max-md:text-[8px]' : ''}`}>
            {category}
          </p>
          {(fabricTypes || printTypes) && <span className={`text-muted text-xs ${compactOnMobile ? 'max-md:hidden' : ''}`}>•</span>}
          {fabricTypes?.map((f, i) => (
            <span key={f} className={`text-[10px] uppercase tracking-widest text-muted border border-muted/30 px-2 py-0.5 rounded-full ${compactOnMobile ? 'max-md:text-[8px] max-md:px-1 max-md:py-0' : ''}`}>
              {f}
            </span>
          ))}
          {printTypes?.map((p, i) => (
            <span key={p} className={`text-[10px] uppercase tracking-widest text-muted border border-muted/30 px-2 py-0.5 rounded-full ${compactOnMobile ? 'max-md:text-[8px] max-md:px-1 max-md:py-0' : ''}`}>
              {p}
            </span>
          ))}
        </div>
        <h3 className={`font-display font-normal text-navy transition-colors duration-300 group-hover:text-cta ${compactOnMobile ? 'text-base leading-tight md:text-3xl' : 'text-3xl'}`}>
          {name}
        </h3>
      </div>
    </Link>
  )
}
