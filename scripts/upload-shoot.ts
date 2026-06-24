// scripts/upload-shoot.ts
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

async function uploadAssets() {
  const directoryPath = '/Users/aadigolecha/Desktop/shree_laxmi_creation_website/Assets/shoot'
  
  if (!fs.existsSync(directoryPath)) {
    console.error(`Directory not found: ${directoryPath}`)
    process.exit(1)
  }

  const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.PNG') || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'))
  
  console.log(`Found ${files.length} images to upload...`)

  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    console.log(`Uploading ${file}...`)
    
    try {
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: file
      })
      console.log(`✅ Uploaded ${file} -> Asset ID: ${asset._id}`)
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err)
    }
  }

  console.log('🎉 All images have been uploaded to Sanity Asset Library!')
}

uploadAssets().catch(console.error)
