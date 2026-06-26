import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2021-06-07',
  token: process.env.SANITY_API_TOKEN,
})

async function run() {
  try {
    // Fetch 3 items that have an image
    const items = await client.fetch('*[_type in ["product", "fabricSwatch"] && defined(image)][0...3] { _id, title, name, image, description }')
    
    if (items.length === 0) {
      console.log("No products or swatches with images found to seed.")
      return
    }

    console.log(`Found ${items.length} items. Seeding Best Sellers...`)

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const bestSeller = {
        _type: 'bestSeller',
        title: item.title || item.name || `Best Seller ${i + 1}`,
        description: item.description || 'One of our most popular fabrics.',
        badge: 'Top Pick',
        image: item.image,
        order: i
      }

      await client.create(bestSeller)
      console.log(`Created Best Seller: ${bestSeller.title}`)
    }

    console.log("Successfully seeded Best Sellers!")
  } catch (err) {
    if (err instanceof Error) {
      console.error("ERROR:", err.message)
    } else {
      console.error("ERROR:", err)
    }
  }
}
run()
