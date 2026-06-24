import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enquire',
  description: 'Get in touch with Shree Laxmi Creation — start a conversation about our collections via form or WhatsApp.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
