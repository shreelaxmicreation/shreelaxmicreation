import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2021-06-07',
})

const query = `*[_type == "fabricSwatch"] | order(order asc) {
    _id,
    label,
    category,
    color,
    image,
    isFeaturedCategory,
    featuredSize
  }`

async function run() {
  const swatches = await client.fetch(query)
  console.log("Total swatches:", swatches.length)
  console.log("Featured:", swatches.filter(s => s.isFeaturedCategory).length)
  console.log(swatches.map(s => ({ label: s.label, featured: s.isFeaturedCategory })))
}
run()
