import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import OrangeRule from '@/components/ui/OrangeRule'
import { aboutContent } from '@/data/about'
import EnquiryForm from '@/components/sections/EnquiryForm'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Shree Laxmi Creation — Economical & Mid-Range Shirting Fabric Manufacturers.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Header */}
      <section
        className="relative w-full overflow-hidden flex items-end pb-24 px-6 md:px-20"
        style={{ minHeight: '60vh', background: 'var(--navy)' }}
      >
        <div className="absolute inset-0 bg-[url('/images/about.jpg')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,49,94,0.9)] to-[rgba(28,49,94,0.4)]" />

        <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto">
          <p className="text-label text-cta mb-4 tracking-[0.2em]">About Us</p>
          <OrangeRule />
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] mt-6" style={{ color: '#FFFFFF' }}>
            About <span className="font-medium italic" style={{ color: 'var(--cta)' }}>Shree Laxmi Creation</span>
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full section-padded" style={{ background: 'var(--surface)' }}>
        <div className="max-w-[var(--max-content)] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-label text-cta mb-4 tracking-[0.2em]">Our Story</p>
            <OrangeRule />
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] mt-6 mb-8" style={{ color: 'var(--navy)' }}>
              A Foundation in <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Textiles</span>
            </h2>

            <div className="space-y-6 text-muted font-light leading-relaxed">
              {aboutContent.story.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative w-full min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/factory-interior.png"
              alt="Shree Laxmi Creation manufacturing facility"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Numbers Section — Navy */}
      <section className="w-full section-padded relative overflow-hidden" style={{ background: 'var(--navy)' }}>
        <div className="max-w-[var(--max-content)] mx-auto px-6 relative z-10">
          <p className="text-label text-cta mb-4 tracking-[0.2em]">By the Numbers</p>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] mb-16" style={{ color: '#FFFFFF' }}>
            Scale That <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Delivers</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutContent.numbers.map((stat, idx) => (
              <div key={idx} className="p-10 rounded-3xl text-center flex flex-col items-center justify-center min-h-[240px] border border-[rgba(255,255,255,0.1)]">
                <h3 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-light mb-4" style={{ color: '#FFFFFF' }}>
                  {stat.value}
                </h3>
                <div className="w-8 h-[1px] bg-cta mb-4" />
                <p className="text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths Tiles */}
      <section className="w-full section-padded" style={{ background: 'var(--surface)' }}>
        <div className="max-w-[var(--max-content)] mx-auto px-6">
          <p className="text-label text-cta mb-4 tracking-[0.2em]">Why Choose Us</p>
          <OrangeRule />
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] mt-6 mb-16" style={{ color: 'var(--navy)' }}>
            Our <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Strengths</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutContent.strengths.map((value, idx) => (
              <div key={value.label} className="liquid-glass-card p-10 rounded-3xl relative">
                <span className="absolute top-6 right-8 font-display text-5xl font-light" style={{ color: 'rgba(28,49,94,0.06)' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--navy)' }}>
                  {value.label}
                </p>
                <p className="text-muted leading-relaxed font-light">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm abbreviated />
    </>
  )
}
