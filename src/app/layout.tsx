import type { Metadata } from 'next'
import { Bodoni_Moda, Jost } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/ui/CookieBanner'
import SmoothScroll from '@/components/layout/SmoothScroll'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bodoni-moda',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://shreelaxmicreation.com'),
  title: {
    default: 'Shree Laxmi Creation — Economical & Mid-Range Shirting Fabric Manufacturers',
    template: '%s — Shree Laxmi Creation',
  },
  description: 'Reliable Shirting Fabric Solutions for Bulk Programs. From yarn to finished fabric, we deliver smart fabric solutions for growing brands.',
  openGraph: {
    images: ['/og-image.jpg'],
  },
}

import { GlobalBackgroundPaths } from '@/components/ui/background-paths'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable} bg-background text-text`}>
      <body>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <GlobalBackgroundPaths />
        </SmoothScroll>
      </body>
    </html>
  )
}
