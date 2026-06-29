'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import OrangeRule from '@/components/ui/OrangeRule'
import { OriginButton } from '@/components/ui/origin-button'

interface FormData {
  name: string
  company: string
  location: string
  email?: string
  whatsapp: string
  message: string
}

interface EnquiryFormProps {
  showHeading?: boolean
  defaultMessage?: string
  abbreviated?: boolean
}

export default function EnquiryForm({
  showHeading = true,
  defaultMessage = '',
  abbreviated = false,
}: EnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: { name: '', company: '', location: '', email: '', whatsapp: '', message: defaultMessage },
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        const errorData = await res.json().catch(() => null)
        console.error('Form submission failed:', res.status, errorData)
        setStatus('error')
      }
    } catch (err) {
      console.error('Network or fetch error:', err)
      setStatus('error')
    }
  }

  const whatsappLink = 'https://wa.me/919998482159?text=Hi%2C%20I%27m%20interested%20in%20Shree%20Laxmi%20Creation'

  if (abbreviated) {
    return (
      <section
        id="enquiry-cta"
        className="w-full section-padded relative overflow-hidden"
        style={{ background: 'var(--accent-bg)' }}
      >
        <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <p className="text-label" style={{ color: 'var(--cta)', marginBottom: 16 }}>Get in Touch</p>
          <h2 className="text-heading" style={{ marginBottom: 32, color: '#FFFFFF' }}>
            Ready to craft something <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>extraordinary?</span>
          </h2>
          <a href="/contact" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <OriginButton>Start a Conversation</OriginButton>
          </a>
        </div>
      </section>
    )
  }

  return (
    <section
      id="enquiry-form"
      className={`w-full relative z-10 overflow-hidden ${showHeading ? 'section-padded' : ''}`}
      style={{ background: 'var(--surface)' }}
    >
      <div className="absolute inset-0 liquid-gradient opacity-40 pointer-events-none" />
      <div style={{ maxWidth: showHeading ? 'var(--max-content)' : '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {showHeading && (
          <div className="mb-16">
            <p className="text-label" style={{ color: 'var(--cta)', marginBottom: 16 }}>Enquire</p>
            <OrangeRule />
            <h2 className="text-heading" style={{ marginTop: 24, color: 'var(--navy)' }}>
              Let&apos;s <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Talk</span>
            </h2>
          </div>
        )}

        {status === 'success' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="liquid-glass-card p-12 rounded-3xl text-center max-w-2xl mx-auto relative overflow-hidden">
            <h3 className="text-heading mb-4" style={{ color: 'var(--navy)' }}>Thank You.</h3>
            <p className="text-body-text text-muted">We&apos;ll be in touch within 24 hours.</p>
          </motion.div>
        ) : (
          <div className="liquid-glass-card p-8 md:p-12 rounded-3xl max-w-3xl mx-auto relative overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 md:gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-navy tracking-wide">Name *</label>
                  <input
                    {...register('name', { required: true })}
                    className="form-input mb-0"
                    placeholder="Jane Doe"
                  />
                  {errors.name && <span className="text-red-500 text-xs mt-1">This field is required.</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-navy tracking-wide">Company Name</label>
                  <input
                    {...register('company')}
                    className="form-input mb-0"
                    placeholder="Company Ltd."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-navy tracking-wide">Location (Where are you based?)</label>
                  <input
                    {...register('location')}
                    className="form-input mb-0"
                    placeholder="City, Country"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-navy tracking-wide">Email (Optional)</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="form-input mb-0"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-navy tracking-wide">WhatsApp Number *</label>
                  <input
                    {...register('whatsapp', { required: true, pattern: /^[0-9]{10}$/ })}
                    className="form-input mb-0"
                    placeholder="10-digit number"
                    type="tel"
                  />
                  {errors.whatsapp && <span className="text-red-500 text-xs mt-1">Please enter a valid 10-digit number.</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-navy tracking-wide">What are you looking for? *</label>
                <textarea
                  {...register('message', { required: true })}
                  rows={4}
                  className="form-input mb-0 resize-none h-32"
                  placeholder="Tell us about your fabric requirements..."
                />
                {errors.message && <span className="text-red-500 text-xs mt-1">This field is required.</span>}
              </div>

              <div className="mt-4 flex items-center justify-end">
                <OriginButton type="submit" loading={status === 'loading'}>
                  Submit Enquiry
                </OriginButton>
              </div>
            </form>

            {status === 'error' && (
              <p className="text-body-text text-red-600 mt-6 text-center">
                Something went wrong. Please <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--cta)]">WhatsApp us directly</a>.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
