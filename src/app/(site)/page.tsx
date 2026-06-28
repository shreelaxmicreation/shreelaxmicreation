import Hero from '@/components/sections/Hero'
import PullQuote from '@/components/sections/PullQuote'
import ProductsGrid from '@/components/sections/ProductsGrid'
import CatalogScrollSequence from '@/components/sections/CatalogScrollSequence'
import HomepageSEOContent from '@/components/sections/HomepageSEOContent'
import RecentEvents from '@/components/sections/RecentEvents'
import StatsSection from '@/components/sections/StatsSection'
import AboutStrip from '@/components/sections/AboutStrip'
import EnquiryForm from '@/components/sections/EnquiryForm'
import { GlobalBackgroundPaths } from '@/components/ui/background-paths'
import { client } from '@/sanity/lib/client'
import { productsQuery, siteSettingsQuery, recentEventsQuery } from '@/sanity/lib/queries'
import type { SanityProduct, SanitySiteSettings, SanityBlogPost } from '@/sanity/lib/types'

export const revalidate = 3600

export default async function Home() {
  const [products, siteSettings, recentEvents] = await Promise.all([
    client.fetch<SanityProduct[]>(productsQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<SanitySiteSettings | null>(siteSettingsQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<SanityBlogPost[]>(recentEventsQuery, {}, { next: { revalidate: 3600 } }),
  ])

  console.log("SERVER LOG:", {
    productsLength: products?.length,
    settingsFound: !!siteSettings
  })

  // Deep clone to avoid Next.js RSC serialization issues with Sanity Stega objects
  const safeProducts = JSON.parse(JSON.stringify(
    (siteSettings?.homepageProducts && siteSettings.homepageProducts.length > 0) 
      ? siteSettings.homepageProducts 
      : (products || [])
  ))
  


  return (
    <>
      <Hero />
      <PullQuote />
      <CatalogScrollSequence items={safeProducts} />
      <ProductsGrid mode="preview" showHeader={true} products={safeProducts} />
      <HomepageSEOContent />
      <RecentEvents events={recentEvents} />
      <StatsSection />
      <AboutStrip aboutStripImage={siteSettings?.aboutStripImage} />
      <EnquiryForm />
      <GlobalBackgroundPaths />
    </>
  )
}
