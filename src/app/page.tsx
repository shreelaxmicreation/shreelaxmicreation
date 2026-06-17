import Hero from '@/components/sections/Hero'
import PullQuote from '@/components/sections/PullQuote'
import CatalogScrollSequence from '@/components/sections/CatalogScrollSequence'
import StatsSection from '@/components/sections/StatsSection'
import AboutStrip from '@/components/sections/AboutStrip'
import EnquiryForm from '@/components/sections/EnquiryForm'
import { GlobalBackgroundPaths } from '@/components/ui/background-paths'

export default function Home() {
  return (
    <>
      <Hero />
      <PullQuote />
      <CatalogScrollSequence />
      <StatsSection />
      <AboutStrip />
      <EnquiryForm />
      <GlobalBackgroundPaths />
    </>
  )
}
