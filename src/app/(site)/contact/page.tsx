'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import OrangeRule from '@/components/ui/OrangeRule'
import EnquiryForm from '@/components/sections/EnquiryForm'

function ContactContent() {
  const searchParams = useSearchParams()
  const subject = searchParams.get('subject')
  const defaultMessage = subject
    ? `Hi, I'm interested in the "${subject}" collection.`
    : ''

  return (
    <section
      className="w-full contact-section relative overflow-hidden"
      style={{
        background: 'var(--canvas)',
        padding: 'var(--space-xl) 80px',
        paddingTop: 'calc(var(--space-xl) + 72px)',
        minHeight: '100vh',
      }}
    >
      <div className="absolute inset-0 liquid-gradient opacity-30 pointer-events-none" />

      <div
        className="contact-grid relative z-10"
        style={{ maxWidth: 'var(--max-content)', margin: '0 auto' }}
      >
        {/* Left Column — Info */}
        <div className="contact-info">
          <p className="text-label text-cta mb-4 tracking-[0.2em]">Get in Touch</p>
          <OrangeRule />
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] mt-6 mb-16" style={{ color: 'var(--navy)' }}>
            Start a<br />
            <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Conversation</span>
          </h1>

          {/* Contact methods */}
          <div className="space-y-10">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-3 font-medium">WhatsApp</p>
              <a
                href="https://wa.me/919998482159"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-light hover:text-cta transition-colors"
                style={{ color: 'var(--navy)' }}
              >
                +91 99984 82159
              </a>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-3 font-medium">Email</p>
              <a
                href="mailto:shreelaxmicreation81@gmail.com"
                className="text-xl font-light hover:text-cta transition-colors"
                style={{ color: 'var(--navy)' }}
              >
                shreelaxmicreation81@gmail.com
              </a>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-3 font-medium">Instagram</p>
              <a
                href="https://www.instagram.com/shreelaxmicreation_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-light hover:text-cta transition-colors flex items-center gap-2"
                style={{ color: 'var(--navy)' }}
              >
                @shreelaxmicreation_ <span className="text-sm">↗</span>
              </a>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-3 font-medium">Location</p>
              <p className="text-xl font-light" style={{ color: 'var(--navy)' }}>
                Ahmedabad, Gujarat, India
              </p>
            </div>
          </div>
        </div>

        {/* Right Column — Form */}
        <div className="contact-form mt-16 md:mt-0">
          <EnquiryForm showHeading={false} defaultMessage={defaultMessage} />
        </div>
      </div>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-section {
            padding: calc(72px + 48px) 24px 72px 24px !important;
          }
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--canvas)' }} />
    }>
      <ContactContent />
    </Suspense>
  )
}
