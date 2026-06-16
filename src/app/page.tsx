import Hero from '@/components/sections/Hero'
import PullQuote from '@/components/sections/PullQuote'
import ProductsGrid from '@/components/sections/ProductsGrid'
import StatsSection from '@/components/sections/StatsSection'
import AboutStrip from '@/components/sections/AboutStrip'
import EnquiryForm from '@/components/sections/EnquiryForm'

export default function Home() {
  return (
    <>
      <Hero />
      <PullQuote />
      <ProductsGrid mode="preview" />
      <StatsSection />
      <AboutStrip />
      <EnquiryForm />
    </>
  )
}
