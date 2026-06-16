import type { Metadata } from 'next'
import ProductsGrid from '@/components/sections/ProductsGrid'
import EnquiryForm from '@/components/sections/EnquiryForm'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse the versatile collection of shirting fabrics from Shree Laxmi Creation.',
}

export default function ProductsPage() {
  return (
    <>
      {/* Page Header */}
      <section
        className="w-full section-padded-top-nav"
        style={{ background: 'var(--canvas)' }}
      >
        <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto' }}>
          <p className="text-label" style={{ color: 'var(--brand)', marginBottom: 16 }}>
            Our Product Range
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--ink)',
              lineHeight: 1.05,
            }}
          >
            Shirting{' '}
            <span style={{ fontWeight: 500, fontStyle: 'italic', color: 'var(--brand)' }}>
              Fabrics
            </span>
          </h1>
          <p
            className="text-body-text"
            style={{
              color: 'var(--muted)',
              maxWidth: 520,
              marginTop: 20,
            }}
          >
            From classic cotton to innovative dobby constructions — explore our 
            complete range of economical and mid-range shirting solutions.
          </p>
        </div>
      </section>

      {/* Full Collections Grid */}
      <ProductsGrid mode="full" showHeader={false} />

      {/* Abbreviated Enquiry CTA */}
      <EnquiryForm abbreviated />
    </>
  )
}
