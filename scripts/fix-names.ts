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
  const products = await client.fetch(`*[_type == "product"] { _id, name }`)
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  let counter = 1;

  for (const product of products) {
    if (!product.name) continue;

    // If it's a UUID or random hash
    if (uuidRegex.test(product.name)) {
      const newName = `Premium Shoot Sample ${String(counter).padStart(2, '0')}`;
      const newSlug = `premium-shoot-sample-${counter}`;
      
      console.log(`Renaming ${product.name} -> ${newName}`)
      
      await client
        .patch(product._id)
        .set({ 
          name: newName,
          slug: { _type: 'slug', current: newSlug }
        })
        .commit()
        
      counter++;
    } 
    // If it's the logo ones we accidentally created
    else if (product.name === 'logo' || product.name === 'logo-text') {
      console.log(`Deleting accidental product: ${product.name}`)
      await client.delete(product._id)
    }
  }

  console.log(`Finished renaming ${counter - 1} products and cleaning up.`)
}

run().catch(console.error)
