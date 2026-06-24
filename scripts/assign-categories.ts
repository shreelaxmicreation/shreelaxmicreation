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
  const products = await client.fetch(`*[_type == "product"]{_id, name, description, category, composition}`)
  console.log(`Found ${products.length} products.`)

  for (const product of products) {
    const textToSearch = `${product.name} ${product.description || ''} ${product.composition || ''} ${product.category}`.toLowerCase()
    
    const fabricTypes = []
    const printTypes = []

    // Naive matching for Fabric Types
    if (textToSearch.includes('cotton')) fabricTypes.push('Cotton')
    if (textToSearch.includes('linen')) fabricTypes.push('Linen')
    if (textToSearch.includes('poly') || textToSearch.includes('polyester')) fabricTypes.push('Polyester')
    if (textToSearch.includes('blend')) fabricTypes.push('Blend')
    if (textToSearch.includes('dobby')) fabricTypes.push('Dobby')
    if (textToSearch.includes('oxford')) fabricTypes.push('Oxford')
    if (textToSearch.includes('jacquard')) fabricTypes.push('Jacquard')

    // Naive matching for Print Types
    if (textToSearch.includes('solid') || textToSearch.includes('plain')) printTypes.push('Solid')
    if (textToSearch.includes('stripe')) printTypes.push('Stripes')
    if (textToSearch.includes('check')) printTypes.push('Checks')
    if (textToSearch.includes('print')) printTypes.push('Printed')
    if (textToSearch.includes('abstract')) printTypes.push('Abstract')
    if (textToSearch.includes('floral')) printTypes.push('Floral')
    
    // Default assignments if nothing matches
    if (fabricTypes.length === 0) fabricTypes.push('Cotton')
    if (printTypes.length === 0) printTypes.push('Solid')

    console.log(`Updating product: ${product.name} -> Fabrics: [${fabricTypes.join(', ')}], Prints: [${printTypes.join(', ')}]`)
    
    await client
      .patch(product._id)
      .set({ fabricTypes, printTypes })
      .commit()
  }

  console.log('Migration complete!')
}

run().catch(console.error)
