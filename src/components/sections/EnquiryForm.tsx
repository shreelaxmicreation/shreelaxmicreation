'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import OrangeRule from '@/components/ui/OrangeRule'
import { OriginButton } from '@/components/ui/origin-button'

interface FormData {
  name: string
  whatsapp: string
  message: string
}

interface EnquiryFormProps {
  showHeading?: boolean
  defaultMessage?: string
  abbreviated?: boolean
}

const questions = [
  { id: 'name', label: "Hi there. What's your name?", type: 'text', placeholder: 'Jane Doe' },
  { id: 'whatsapp', label: "Nice to meet you! What's your WhatsApp number?", type: 'tel', placeholder: '10-digit number' },
  { id: 'message', label: "What kind of fabric solutions are you looking for?", type: 'textarea', placeholder: 'Tell us about your requirements...' }
]

export default function EnquiryForm({
  showHeading = true,
  defaultMessage = '',
  abbreviated = false,
}: EnquiryFormProps) {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, trigger, getValues, reset } = useForm<FormData>({
    defaultValues: { name: '', whatsapp: '', message: defaultMessage },
  })

  const currentQ = questions[step]

  const handleNext = async () => {
    const currentField = currentQ.id as keyof FormData
    const isStepValid = await trigger(currentField)
    if (isStepValid) {
      if (step < questions.length - 1) {
        setStep(s => s + 1)
      } else {
        handleSubmit(onSubmit)()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentQ.type !== 'textarea') {
      e.preventDefault()
      handleNext()
    }
  }

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
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const whatsappLink = 'https://wa.me/917990596697?text=Hi%2C%20I%27m%20interested%20in%20Shree%20Laxmi%20Creation'

  if (abbreviated) {
    return (
      <section
        id="enquiry-cta"
        className="w-full section-padded relative overflow-hidden"
        style={{ background: 'var(--navy)' }}
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="liquid-glass-card p-12 rounded-3xl text-center max-w-2xl mx-auto">
            <h3 className="text-heading mb-4" style={{ color: 'var(--navy)' }}>Thank You.</h3>
            <p className="text-body-text text-muted">We have received your enquiry and will be in touch shortly.</p>
          </motion.div>
        ) : (
          <div className="liquid-glass-card p-8 md:p-12 rounded-3xl max-w-2xl mx-auto relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-[rgba(28,49,94,0.06)] w-full">
               <motion.div 
                 className="h-full bg-gradient-to-r from-[#1C315E] to-[#D6B06A]" 
                 initial={{ width: '0%' }}
                 animate={{ width: `${((step) / questions.length) * 100}%` }}
                 transition={{ duration: 0.5, ease: 'easeInOut' }}
               />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                <label className="text-xl md:text-3xl font-display text-navy font-medium leading-tight">
                  {currentQ.label}
                </label>
                
                <div className="relative">
                  {currentQ.type === 'textarea' ? (
                    <textarea
                      {...register(currentQ.id as keyof FormData, { required: true })}
                      placeholder={currentQ.placeholder}
                      rows={4}
                      className="w-full bg-transparent border-b border-[rgba(28,49,94,0.15)] text-text text-lg md:text-xl py-4 focus:outline-none focus:border-[var(--cta)] transition-colors resize-none placeholder:text-[rgba(28,49,94,0.2)]"
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <input
                      {...register(currentQ.id as keyof FormData, { 
                        required: true,
                        ...(currentQ.id === 'whatsapp' ? { pattern: /^[0-9]{10}$/ } : {})
                      })}
                      type={currentQ.type}
                      placeholder={currentQ.placeholder}
                      className="w-full bg-transparent border-b border-[rgba(28,49,94,0.15)] text-text text-xl md:text-4xl py-4 focus:outline-none focus:border-[var(--cta)] transition-colors placeholder:text-[rgba(28,49,94,0.2)]"
                      onKeyDown={handleKeyDown}
                    />
                  )}
                </div>

                {errors[currentQ.id as keyof FormData] && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm mt-2">
                    {currentQ.id === 'whatsapp' ? 'Please enter a valid 10-digit number.' : 'This field is required.'}
                  </motion.p>
                )}

                <div className="mt-8 flex items-center justify-between">
                   <button 
                     type="button"
                     onClick={() => setStep(s => Math.max(0, s - 1))}
                     className={`text-muted hover:text-navy transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                   >
                     ← Back
                   </button>
                   
                   <OriginButton 
                     onClick={handleNext} 
                     loading={status === 'loading'}
                   >
                     {step === questions.length - 1 ? 'Submit Enquiry' : 'Continue →'}
                   </OriginButton>
                </div>
              </motion.div>
            </AnimatePresence>

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
