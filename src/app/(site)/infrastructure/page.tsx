import type { Metadata } from 'next'
import OrangeRule from '@/components/ui/OrangeRule'
import EnquiryForm from '@/components/sections/EnquiryForm'

export const metadata: Metadata = {
  title: 'Infrastructure & Capabilities',
  description: "Explore Shree Laxmi Creation's state-of-the-art manufacturing, processing, and design infrastructure in Ahmedabad and Ichalkaranji.",
}

export default function InfrastructurePage() {
  const infraPoints = [
    {
      title: 'Greige Manufacturing',
      desc: 'Our manufacturing support in Ichalkaranji, one of India\'s leading textile hubs, provides access to reliable weaving infrastructure and quality greige production.',
      number: '01',
    },
    {
      title: 'Processing & Finishing',
      desc: 'We work with established processing facilities in Ahmedabad and Mumbai to deliver fabrics with superior finishing and performance.',
      number: '02',
    },
    {
      title: 'Integrated Supply Chain',
      desc: 'Our streamlined operations connect weaving, processing, development, and delivery, ensuring efficiency at every stage.',
      number: '03',
    },
  ]

  const designCapabilities = [
    'Dobby Design Development',
    'Structured Weave Innovations',
    'Pattern Development',
    'Custom Fabric Developments',
    'Brand-Specific Requirements',
    'Seasonal Collection Support',
  ]

  const processingCapabilities = [
    'Reactive Dyeing',
    'Pigment Dyeing',
    'Yarn Dyeing',
    'Printed Fabrics',
    'Specialized Finishes',
    'Customized Processing Solutions',
  ]

  return (
    <>
      {/* Page Header */}
      <section className="w-full section-padded-top-nav relative overflow-hidden" style={{ background: 'var(--canvas)' }}>
        <div className="absolute inset-0 liquid-gradient opacity-30 pointer-events-none" />
        <div className="max-w-[var(--max-content)] mx-auto relative z-10 px-6">
          <p className="text-label text-cta mb-4">End-to-End Solutions</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05]" style={{ color: 'var(--navy)' }}>
            Our <span className="font-medium italic" style={{ color: 'var(--cta)' }}>Infrastructure</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mt-6 font-light leading-relaxed">
            From raw material sourcing through weaving, processing, and finishing — 
            an integrated structure built for consistency and scale.
          </p>
        </div>
      </section>

      {/* Manufacturing & Infrastructure */}
      <section className="w-full section-padded relative overflow-hidden" style={{ background: 'var(--surface)' }}>
        <div className="max-w-[var(--max-content)] mx-auto px-6 relative z-10">
          <p className="text-label text-cta mb-4 tracking-[0.2em]">Manufacturing</p>
          <OrangeRule />
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] mt-6 mb-12" style={{ color: 'var(--navy)' }}>
            Production <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Backbone</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infraPoints.map((point) => (
              <div key={point.title} className="liquid-glass-card p-10 rounded-3xl relative">
                <span className="absolute top-6 right-8 font-display text-5xl font-light" style={{ color: 'rgba(28,49,94,0.06)' }}>
                  {point.number}
                </span>
                <div className="w-8 h-[2px] bg-cta mb-6" />
                <h3 className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--navy)' }}>
                  {point.title}
                </h3>
                <p className="text-muted leading-relaxed font-light">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design & Development */}
      <section className="w-full section-padded relative overflow-hidden" style={{ background: 'var(--canvas)' }}>
        <div className="absolute inset-0 liquid-gradient opacity-20 pointer-events-none" />
        <div className="max-w-[var(--max-content)] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div>
            <p className="text-label text-cta mb-4 tracking-[0.2em]">Development</p>
            <OrangeRule />
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] mt-6 mb-8" style={{ color: 'var(--navy)' }}>
              Design & <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Innovation</span>
            </h2>
            <p className="text-muted mb-4 leading-relaxed font-light">
              Our product development team continuously works on creating fabrics that align with changing market demands.
            </p>
            <p className="text-muted leading-relaxed font-light">
              With over 500+ design options and 50+ fabric bases, we offer flexibility across different market segments.
            </p>
          </div>

          <div className="liquid-glass-card p-10 rounded-3xl">
            <p className="text-label text-cta mb-8 tracking-[0.2em]">Our Capabilities</p>
            <ul className="space-y-4">
              {designCapabilities.map((cap) => (
                <li key={cap} className="flex items-center gap-4 border-b border-[rgba(28,49,94,0.06)] pb-4 text-text font-light">
                  <span className="text-cta text-sm">—</span> {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Processing Capabilities — Navy section */}
      <section className="w-full section-padded" style={{ background: 'var(--accent-bg)' }}>
        <div className="max-w-[var(--max-content)] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-label text-cta mb-4 tracking-[0.2em]">Processing</p>
            <OrangeRule />
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] mt-6 mb-8" style={{ color: '#FFFFFF' }}>
              Dyeing & <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Finishing</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }} className="leading-relaxed font-light">
              We provide a wide range of value-added fabric treatments. These capabilities enable us to create collections suitable for multiple categories and seasons.
            </p>
          </div>

          <div className="p-10 rounded-3xl border border-[rgba(255,255,255,0.1)] transition-all duration-400 hover:border-[rgba(214,176,106,0.4)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <p className="text-label text-cta mb-8 tracking-[0.2em]">Dyeing & Finishing Solutions</p>
            <ul className="space-y-4">
              {processingCapabilities.map((cap) => (
                <li key={cap} className="flex items-center gap-4 border-b border-[rgba(255,255,255,0.08)] pb-4 font-light text-white/60 hover:text-white transition-colors duration-300">
                  <span className="text-cta text-sm">—</span> {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <EnquiryForm abbreviated />
    </>
  )
}
