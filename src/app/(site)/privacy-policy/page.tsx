import type { Metadata } from 'next'
import OrangeRule from '@/components/ui/OrangeRule'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Shree Laxmi Creation.',
}

export default function PrivacyPolicyPage() {
  return (
    <section
      className="w-full section-padded-top-nav relative overflow-hidden"
      style={{ minHeight: '100vh', background: 'var(--canvas)' }}
    >
      <div className="absolute inset-0 liquid-gradient opacity-20 pointer-events-none" />
      
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 24px' }}>
        <p className="text-label text-cta mb-4 tracking-[0.2em]">Legal Information</p>
        <OrangeRule />
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] mt-6 mb-16 font-light" style={{ color: 'var(--navy)' }}>
          Privacy <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Policy</span>
        </h1>

        <div className="prose max-w-none font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
          <p style={{ marginBottom: 32 }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>1. Introduction</h2>
          <p style={{ marginBottom: 24 }}>
            Welcome to Shree Laxmi Creation. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>

          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>2. Data We Collect</h2>
          <p style={{ marginBottom: 24 }}>
            We may collect, use, store and transfer different kinds of personal data about you when you fill out an enquiry form or contact us via WhatsApp:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong style={{ color: 'var(--text)' }}>Identity Data:</strong> includes first name, last name.</li>
            <li><strong style={{ color: 'var(--text)' }}>Contact Data:</strong> includes WhatsApp number, email address.</li>
            <li><strong style={{ color: 'var(--text)' }}>Usage Data:</strong> includes information about how you use our website via cookies (if analytics are enabled).</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>3. How We Use Your Data</h2>
          <p style={{ marginBottom: 24 }}>
            We will only use your personal data to process your enquiries, respond to your messages, and improve our website experience. We do not sell or share your data with third parties for marketing purposes.
          </p>

          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>4. Contact Us</h2>
          <p style={{ marginBottom: 24 }}>
            If you have any questions about this privacy policy, please contact us at via our <a href="/contact" style={{ color: 'var(--cta)' }}>Contact Page</a> or directly via WhatsApp.
          </p>
        </div>
      </div>
    </section>
  )
}
