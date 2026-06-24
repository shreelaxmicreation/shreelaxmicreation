// scripts/create-swatches.ts
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-06-07',
})

const categories = [
  'Cotton Fabrics',
  'Dobby Fabrics',
  'Structured Weaves',
  'Cotton-Poly Blends'
]

const colors = [
  '#E8E2D5',
  '#D5D8E8',
  '#E8D5D5',
  '#D5E8DD'
]

async function run() {
  console.log('Fetching recently uploaded images...')
  const assets = await client.fetch(`*[_type == "sanity.imageAsset"] | order(_createdAt desc)[0...8]`)
  
  if (assets.length === 0) {
    console.error('No images found in asset library.')
    return
  }

  console.log(`Found ${assets.length} images. Creating fabric swatches...`)

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i]
    const isFeatured = i < 4
    
    const doc = {
      _type: 'fabricSwatch',
      label: `Premium Shoot Style ${i + 1}`,
      category: categories[i % categories.length],
      color: colors[i % colors.length],
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        }
      },
      order: i,
      isFeaturedCategory: isFeatured,
      featuredSize: isFeatured ? (i === 0 || i === 2 ? 'lg' : 'md') : undefined
    }

    try {
      const result = await client.create(doc)
      console.log(`✅ Created swatch: ${result._id}`)
    } catch (e) {
      console.error(`❌ Failed to create swatch for ${asset._id}:`, e)
    }
  }

  console.log('🎉 Done!')
}

run().catch(console.error)
