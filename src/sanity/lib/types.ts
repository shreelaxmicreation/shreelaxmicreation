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

export type SanityFabricSwatch = {
  _id: string
  label: string
  category: string
  color: string
  image: any
  isFeaturedCategory?: boolean
  featuredSize?: 'lg' | 'md' | 'sm'
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
