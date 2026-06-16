import type { Metadata } from 'next'
import OrangeRule from '@/components/ui/OrangeRule'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for Shree Laxmi Creation.',
}

export default function TermsPage() {
  return (
    <section
      className="w-full section-padded-top-nav"
      style={{ background: 'var(--canvas)', minHeight: '100vh' }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <OrangeRule />
        <p className="text-label" style={{ color: 'var(--muted)', marginBottom: 8 }}>
          Legal Information
        </p>
        <h1 className="text-display-l" style={{ color: 'var(--ink)', marginBottom: 'var(--space-lg)' }}>
          Terms & Conditions
        </h1>

        <div className="prose prose-p:text-body-text prose-p:text-ink prose-h2:text-subheading prose-h2:text-ink prose-a:text-brand prose-li:text-body-text prose-li:text-ink">
          <p style={{ marginBottom: 24 }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h2 style={{ marginTop: 40, marginBottom: 16 }}>1. Agreement to Terms</h2>
          <p style={{ marginBottom: 24 }}>
            These Terms and Conditions constitute a legally binding agreement made between you and Shree Laxmi Creation concerning your access to and use of our website.
          </p>

          <h2 style={{ marginTop: 40, marginBottom: 16 }}>2. Intellectual Property Rights</h2>
          <p style={{ marginBottom: 24 }}>
            Unless otherwise indicated, the website and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website are our proprietary property. No part of our brand, collections, or images may be reproduced without explicit permission.
          </p>

          <h2 style={{ marginTop: 40, marginBottom: 16 }}>3. User Representations</h2>
          <p style={{ marginBottom: 24 }}>
            By using the website, you represent and warrant that all registration/enquiry information you submit will be true, accurate, current, and complete.
          </p>

          <h2 style={{ marginTop: 40, marginBottom: 16 }}>4. Enquiries and Orders</h2>
          <p style={{ marginBottom: 24 }}>
            Submitting an enquiry through our website does not constitute a confirmed order. Our team will contact you to discuss details, pricing, and availability. We reserve the right to refuse or cancel any requests at our discretion.
          </p>

          <h2 style={{ marginTop: 40, marginBottom: 16 }}>5. Contact Us</h2>
          <p style={{ marginBottom: 24 }}>
            In order to resolve a complaint regarding the website or to receive further information regarding use of the website, please contact us via our <a href="/contact">Contact Page</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
