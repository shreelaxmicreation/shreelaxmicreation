// Sanity types for data fetched via GROQ queries

export type SanityProduct = {
  _id: string
  name: string
  slug: string
  category: string
  fabricTypes?: string[]
  printTypes?: string[]
  description: string
  image: any
  gallery?: any[]
}

export type SanityBestSeller = {
  _id: string
  title: string
  description: string
  badge: string
  image: any
}

export type SanitySiteSettings = {
  logo?: any
  logoText?: any
  ogImage?: any
  aboutStripImage?: any
  aboutHeroImage?: any
  factoryImage?: any
  homepageProducts?: SanityProduct[]
}

export type SanityBlogPost = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  mainImage: any
}
