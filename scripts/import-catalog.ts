import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

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

// Read JSON data
const excelDataPath = '/Users/aadigolecha/.gemini/antigravity-ide/brain/9503fb14-9511-4734-8378-6bcb10402f32/artifacts/excel_data.json'
const excelData = JSON.parse(fs.readFileSync(excelDataPath, 'utf8'))

const imagesDir = '/Users/aadigolecha/Desktop/shree_laxmi_creation_website/Assets/products'

async function importCatalog() {
  console.log(`Starting bulk import of ${excelData.length} items...`)

  for (const item of excelData) {
    const designCode = item['Design Code']
    const seoTitle = item['SEO Title']
    const seoDesc = item['Meta Description']
    const bodyCopyStr = item['Product Description']
    const composition = item['Fabric Construction']

    const slug = designCode.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    // Look for image file
    // Some might be .jpg, some might be .JPG or .jpeg or .png
    const extensions = ['.jpg', '.JPG', '.png', '.jpeg']
    let imagePath = null
    let fileName = null
    
    for (const ext of extensions) {
      const p = path.join(imagesDir, `${designCode}${ext}`)
      if (fs.existsSync(p)) {
        imagePath = p
        fileName = `${designCode}${ext}`
        break
      }
    }

    let imageAssetId = undefined
    if (imagePath) {
      console.log(`Uploading image for ${designCode}...`)
      try {
        const asset = await client.assets.upload('image', fs.createReadStream(imagePath), {
          filename: fileName
        })
        imageAssetId = asset._id
        console.log(`✅ Uploaded image -> ${asset._id}`)
      } catch (err) {
        console.error(`❌ Failed to upload image for ${designCode}:`, err)
      }
    } else {
      console.warn(`⚠️ No image found for ${designCode} (expected ${designCode}.jpg)`)
    }

    console.log(`Creating document for ${designCode}...`)

    const doc = {
      _type: 'product',
      name: designCode,
      slug: {
        _type: 'slug',
        current: slug
      },
      category: 'Shirting',
      description: seoDesc.substring(0, 150), // Short fallback
      seoTitle: seoTitle,
      seoDescription: seoDesc,
      composition: composition,
      moq: '1000 Meters',
      bodyCopy: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              marks: [],
              text: bodyCopyStr,
            },
          ],
        }
      ]
    }

    if (imageAssetId) {
      doc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId
        }
      }
    }

    try {
      const res = await client.create(doc)
      console.log(`✅ Created product: ${res._id}`)
    } catch (err) {
      console.error(`❌ Failed to create product ${designCode}:`, err)
    }
  }

  console.log('🎉 Bulk import finished!')
}

importCatalog().catch(console.error)
