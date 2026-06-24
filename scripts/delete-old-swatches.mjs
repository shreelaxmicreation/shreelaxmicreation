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
  const swatches = await client.fetch('*[_type == "fabricSwatch"]')
  console.log("Found", swatches.length, "swatches")
  
  // Keep only the ones starting with "Premium Shoot Style"
  const toDelete = swatches.filter(s => !s.label.startsWith('Premium Shoot Style'))
  
  console.log("Deleting", toDelete.length, "old placeholders...")
  
  for (const s of toDelete) {
    console.log("Deleting:", s._id)
    await client.delete(s._id)
  }
  
  console.log("Done!")
}
run()
