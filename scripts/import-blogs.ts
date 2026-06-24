// scripts/import-blogs.ts
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

// Simple Markdown to Portable Text converter
function markdownToPortableText(markdown: string) {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  
  let currentList: any[] = []
  let listMode = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (line === '' || line === '---') {
      if (listMode) {
        // End of list
        listMode = false
      }
      continue
    }

    // Headings
    if (line.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: line.substring(2) }]
      })
    } else if (line.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.substring(3) }]
      })
    } else if (line.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: line.substring(4) }]
      })
    } 
    // Lists
    else if (line.startsWith('- ')) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [{ _type: 'span', text: line.substring(2) }]
      })
    } 
    // Regular paragraphs
    else {
      // Basic inline bold parsing (e.g. **text**)
      const parts = line.split(/(\*\*.*?\*\*)/g)
      const children = parts.filter(p => p).map(p => {
        if (p.startsWith('**') && p.endsWith('**')) {
          return { _type: 'span', marks: ['strong'], text: p.slice(2, -2) }
        }
        return { _type: 'span', text: p }
      })

      blocks.push({
        _type: 'block',
        style: 'normal',
        children
      })
    }
  }

  return blocks
}

async function run() {
  console.log('Fetching existing blog posts...')
  const posts = await client.fetch(`*[_type == "blogPost"]{ _id, slug }`)

  const artifactsDir = '/Users/aadigolecha/.gemini/antigravity-ide/brain/9503fb14-9511-4734-8378-6bcb10402f32/artifacts'
  
  const mappings = [
    { slug: 'poplin-vs-oxford', file: 'blog-1-poplin-vs-oxford.md' },
    { slug: 'gsm-guide-formal-shirting', file: 'blog-2-gsm-guide.md' },
    { slug: 'how-shirting-fabric-is-made', file: 'blog-3-how-its-made.md' },
    { slug: 'bulk-sourcing-ahmedabad', file: 'blog-4-bulk-sourcing-ahmedabad.md' },
  ]

  for (const mapping of mappings) {
    const post = posts.find((p: any) => p.slug.current === mapping.slug)
    if (!post) {
      console.log(`❌ Post with slug ${mapping.slug} not found in Sanity.`)
      continue
    }

    const filePath = path.join(artifactsDir, mapping.file)
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File ${filePath} not found.`)
      continue
    }

    const markdown = fs.readFileSync(filePath, 'utf-8')
    const portableText = markdownToPortableText(markdown)

    console.log(`Updating ${mapping.slug} with Portable Text...`)
    await client
      .patch(post._id)
      .set({ body: portableText })
      .commit()
    
    console.log(`✅ Successfully updated ${mapping.slug}`)
  }

  console.log('🎉 All blog posts successfully injected!')
}

run().catch(console.error)
