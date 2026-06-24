import { createClient } from '@sanity/client'
import { fabricSwatchesQuery } from '../src/sanity/lib/queries'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2021-06-07',
})

async function run() {
  const swatches = await client.fetch(fabricSwatchesQuery)
  console.log("Total swatches:", swatches.length)
  console.log("Featured:", swatches.filter((s: any) => s.isFeaturedCategory).length)
  console.log(swatches.map((s: any) => ({ label: s.label, featured: s.isFeaturedCategory })))
}
run()
