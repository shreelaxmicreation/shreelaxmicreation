import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import dynamic from 'next/dynamic'

const CookieBanner = dynamic(() => import('@/components/ui/CookieBanner'), { ssr: false })
const FloatingBestSellers = dynamic(() => import('@/components/ui/FloatingBestSellers'), { ssr: false })
import SmoothScroll from '@/components/layout/SmoothScroll'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery, bestSellersQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { SanitySiteSettings, SanityBestSeller } from '@/sanity/lib/types'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [siteSettingsRaw, bestSellersRaw] = await Promise.all([
    client.fetch<SanitySiteSettings | null>(siteSettingsQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<SanityBestSeller[]>(bestSellersQuery, {}, { next: { revalidate: 3600 } })
  ])

  // Deep clone to avoid Next.js RSC serialization issues with Sanity Stega objects
  const siteSettings = siteSettingsRaw ? JSON.parse(JSON.stringify(siteSettingsRaw)) : null;
  const bestSellers = bestSellersRaw ? JSON.parse(JSON.stringify(bestSellersRaw)) : [];

  const logoUrl = siteSettings?.logo?.asset?._ref
    ? urlFor(siteSettings.logo).height(100).format('png').url()
    : '/images/logo.svg'

  const logoTextUrl = siteSettings?.logoText?.asset?._ref
    ? urlFor(siteSettings.logoText).height(60).format('png').url()
    : '/images/logo-text.svg'

  return (
    <SmoothScroll>
      <Navbar logoUrl={logoUrl} logoTextUrl={logoTextUrl} />
      <main className="relative">{children}</main>
      <Footer logoUrl={logoUrl} />
      <CookieBanner />
      <FloatingBestSellers bestSellers={bestSellers} />
    </SmoothScroll>
  )
}
