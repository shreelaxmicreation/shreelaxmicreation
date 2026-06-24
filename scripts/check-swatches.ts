import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-06-07',
})

async function run() {
  const swatches = await client.fetch('*[_type == "fabricSwatch"] | order(_createdAt desc)[0...10]')
  console.log(JSON.stringify(swatches, null, 2))
}
run()
