import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function run() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0] {
    "homepageProductsLength": count(homepageProducts),
    homepageProducts[0...4]->{
      _id,
      name,
      image,
      gallery
    }
  }`)
  console.log(JSON.stringify(settings, null, 2))
}
run()
