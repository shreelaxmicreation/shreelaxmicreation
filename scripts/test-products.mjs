import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2021-06-07',
})

const query = `*[_type == "product"] | order(order asc)`

async function run() {
  const products = await client.fetch(query)
  console.log("Total products:", products.length)
}
run()
