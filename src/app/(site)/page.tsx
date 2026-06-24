import Hero from '@/components/sections/Hero'
import PullQuote from '@/components/sections/PullQuote'
import ProductsGrid from '@/components/sections/ProductsGrid'
import CatalogScrollSequence from '@/components/sections/CatalogScrollSequence'
import HomepageSEOContent from '@/components/sections/HomepageSEOContent'
import StatsSection from '@/components/sections/StatsSection'
import AboutStrip from '@/components/sections/AboutStrip'
import EnquiryForm from '@/components/sections/EnquiryForm'
import { GlobalBackgroundPaths } from '@/components/ui/background-paths'
import { client } from '@/sanity/lib/client'
import { productsQuery, fabricSwatchesQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import type { SanityProduct, SanityFabricSwatch, SanitySiteSettings } from '@/sanity/lib/types'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, swatches, siteSettings] = await Promise.all([
    client.fetch<SanityProduct[]>(productsQuery, {}, { cache: 'no-store' }),
    client.fetch<SanityFabricSwatch[]>(fabricSwatchesQuery, {}, { cache: 'no-store' }),
    client.fetch<SanitySiteSettings | null>(siteSettingsQuery, {}, { cache: 'no-store' }),
  ])

  console.log("SERVER LOG:", {
    productsLength: products?.length,
    swatchesLength: swatches?.length,
    settingsFound: !!siteSettings
  })

  // Deep clone to avoid Next.js RSC serialization issues with Sanity Stega objects
  const safeProducts = JSON.parse(JSON.stringify(
    (siteSettings?.homepageProducts && siteSettings.homepageProducts.length > 0) 
      ? siteSettings.homepageProducts 
      : (products || [])
  ))
  
  // NOTE: safeSwatches was previously fetched but unused. We'll leave it as is.
  const safeSwatches = JSON.parse(JSON.stringify(swatches || []))

  return (
    <>
      <Hero />
      <PullQuote />
      <CatalogScrollSequence items={safeProducts} />
      <ProductsGrid mode="preview" showHeader={true} products={safeProducts} />
      <HomepageSEOContent />
      <StatsSection />
      <AboutStrip aboutStripImage={siteSettings?.aboutStripImage} />
      <EnquiryForm />
      <GlobalBackgroundPaths />
    </>
  )
}
