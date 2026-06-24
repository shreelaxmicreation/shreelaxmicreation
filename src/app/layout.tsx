import type { Metadata } from 'next'
import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/ui/CookieBanner'
import FloatingBestSellers from '@/components/ui/FloatingBestSellers'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Script from 'next/script'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bodoni-moda',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hanken',
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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable} bg-background text-text`}>
      <body>
        {children}
        
        {/* Google Analytics */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-4HY8BG543G" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4HY8BG543G');
          `}
        </Script>
      </body>
    </html>
  )
}
