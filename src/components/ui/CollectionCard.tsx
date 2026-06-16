'use client'

import Image from 'next/image'
import Link from 'next/link'

interface CollectionCardProps {
  image: string
  name: string
  category: string
  slug: string
}

export default function CollectionCard({ image, name, category, slug }: CollectionCardProps) {
  return (
    <Link
      href={`/contact?subject=${encodeURIComponent(name)}`}
      className="liquid-glass-card group block p-4 rounded-3xl relative overflow-hidden"
      style={{ textDecoration: 'none' }}
    >
      {/* Image with zoom */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
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

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,49,94,0.85)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-6">
          <span className="font-body text-sm font-medium tracking-widest uppercase text-white">
            Enquire
          </span>
          <span className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white text-lg group-hover:bg-white group-hover:text-navy transition-all duration-300">
            →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 px-2 pb-2">
        <p className="text-xs uppercase tracking-widest text-cta mb-2 font-medium">
          {category}
        </p>
        <h3 className="font-display text-3xl font-normal text-navy transition-colors duration-300 group-hover:text-cta">
          {name}
        </h3>
      </div>
    </Link>
  )
}
