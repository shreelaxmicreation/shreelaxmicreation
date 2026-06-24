// scripts/seed.ts
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN // Requires write access

if (!projectId || !dataset || !token) {
  console.error('Missing SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2021-06-07',
})

async function seed() {
  console.log('Seeding initial data to Sanity...')

  // 1. Seed Site Settings
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    logoText: 'Shree Laxmi Creation',
  })
  console.log('✅ Site Settings seeded')

  // 2. Seed Fabric Swatches
  const swatches = [
    { name: 'Poplin White', color: '#ffffff', category: 'Shirting' },
    { name: 'Oxford Blue', color: '#8892b0', category: 'Shirting' },
    { name: 'Herringbone', color: '#a8b2d1', category: 'Shirting' },
    { name: 'Twill Navy', color: '#0a192f', category: 'Shirting' },
  ]

  for (let i = 0; i < swatches.length; i++) {
    const s = swatches[i]
    await client.create({
      _type: 'fabricSwatch',
      label: s.name,
      category: s.category,
      color: s.color,
      order: i,
      isFeaturedCategory: true,
      featuredSize: 'large',
    })
  }
  console.log('✅ Fabric Swatches seeded')

  // 3. Seed Products
  const products = [
    { name: 'Premium Poplin Fabric', slug: 'premium-poplin', category: 'Shirting', composition: '100% Cotton', gsm: '115 GSM' },
    { name: 'Classic Oxford Cloth', slug: 'classic-oxford', category: 'Shirting', composition: 'Cotton Blend', gsm: '140 GSM' },
    { name: 'Fine Twill Weave', slug: 'fine-twill', category: 'Shirting', composition: '100% Cotton', gsm: '125 GSM' },
    { name: 'Textured Dobby', slug: 'textured-dobby', category: 'Shirting', composition: '100% Cotton', gsm: '130 GSM' },
  ]

  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    await client.create({
      _type: 'product',
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      category: p.category,
      description: `High-quality ${p.name.toLowerCase()} suitable for formal and casual wear.`,
      order: i,
      seoTitle: `${p.name} Manufacturer | Shree Laxmi Creation`,
      seoDescription: `Sourcing bulk ${p.name}? Shree Laxmi Creation offers premium quality, competitive pricing, and fast delivery from Ahmedabad.`,
      composition: p.composition,
      gsmRange: p.gsm,
      width: '58/60 inches',
      moq: '1000 Meters',
      availableFinishes: 'Mercerized, Peached',
      bodyCopy: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: `This is the body copy for ${p.name}. It should be 400-500 words for optimal SEO.` }]
        }
      ]
    })
  }
  console.log('✅ Products seeded')

  // 4. Seed Blog Posts
  const blogs = [
    { title: 'Poplin vs Oxford Shirting Fabric: Which is Right for Your Brand?', slug: 'poplin-vs-oxford', excerpt: 'Discover the key differences between Poplin and Oxford fabrics to choose the perfect material for your next clothing line.' },
    { title: 'What GSM Should Formal Shirting Fabric Be? A Buyer\'s Guide', slug: 'gsm-guide-formal-shirting', excerpt: 'Learn how to select the right GSM for formal dress shirts, balancing opacity, breathability, and drape.' },
    { title: 'How Shirting Fabric is Made: From Greige to Finished Roll', slug: 'how-shirting-fabric-is-made', excerpt: 'Go behind the scenes and explore the manufacturing lifecycle of premium shirting fabrics.' },
    { title: 'Bulk Shirting Fabric Sourcing from Ahmedabad: What You Need to Know', slug: 'bulk-sourcing-ahmedabad', excerpt: 'Why Ahmedabad is the ultimate destination for sourcing high-quality, cost-effective textiles.' },
  ]

  for (const b of blogs) {
    await client.create({
      _type: 'blogPost',
      title: b.title,
      slug: { _type: 'slug', current: b.slug },
      publishedAt: new Date().toISOString(),
      excerpt: b.excerpt,
      seoTitle: `${b.title} | Shree Laxmi Creation Blog`,
      seoDescription: b.excerpt,
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: `This is the placeholder body for ${b.title}. To view the full 800+ word article, please copy and paste it from the generated markdown files.` }]
        }
      ]
    })
  }
  console.log('✅ Blog Posts seeded')

  console.log('🎉 Seeding complete! You can now view your data at http://localhost:5678/studio')
}

seed().catch(console.error)
