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
  // Fetch recent images
  const images = await client.fetch(`*[_type == "sanity.imageAsset" && _createdAt > "2026-06-20T00:00:00Z"] | order(_createdAt desc) { _id, originalFilename }`)
  
  console.log(`Found ${images.length} recent images.`)

  // Fetch all products
  const products = await client.fetch(`*[_type == "product"] { _id, name, gallery }`)
  
  let updatedCount = 0;

  for (const img of images) {
    if (!img.originalFilename) continue;
    
    // Strip extension
    const baseName = img.originalFilename.replace(/\.[^/.]+$/, "")
    
    // Find matching product
    const product = products.find((p: any) => p.name === baseName)
    
    if (product) {
      // Create image object
      const imageObj = {
        _type: 'image',
        _key: img._id, // just need a unique key for array items
        asset: {
          _type: 'reference',
          _ref: img._id
        }
      }
      
      // We only append if it's not already there
      const existingGallery = product.gallery || []
      const alreadyHasIt = existingGallery.some((g: any) => g.asset?._ref === img._id)
      
      if (!alreadyHasIt) {
        console.log(`Linking ${img.originalFilename} to product ${product.name}`)
        await client
          .patch(product._id)
          .setIfMissing({ gallery: [] })
          .append('gallery', [imageObj])
          .commit()
        updatedCount++;
      }
    } else {
      // If product doesn't exist, the user asked to MAKE 22 products.
      // We'll create a new product!
      console.log(`Creating new product for ${baseName}`)
      await client.create({
        _type: 'product',
        name: baseName,
        slug: { _type: 'slug', current: baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
        category: 'Shirting',
        description: 'New fabric collection.',
        gallery: [{
          _type: 'image',
          _key: img._id,
          asset: {
            _type: 'reference',
            _ref: img._id
          }
        }]
      })
      updatedCount++;
    }
  }

  console.log(`Finished processing. Updated/Created ${updatedCount} products.`)
}

run().catch(console.error)
