import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2021-06-07',
})

async function run() {
  try {
    const data = await client.fetch('*[_type == "bestSeller"] | order(order asc)')
    console.log("SUCCESS:", data.length)
  } catch (err) {
    if (err instanceof Error) {
      console.error("ERROR:", err.message)
    } else {
      console.error("ERROR:", err)
    }
  }
}
run()
