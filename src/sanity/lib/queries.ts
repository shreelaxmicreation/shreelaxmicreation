import { groq } from 'next-sanity'

// ── Products ───────────────────────────────────────
export const productsQuery = groq`
  *[_type == "product"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    fabricTypes,
    printTypes,
    description,
    image,
    gallery
  }
`

export const singleProductQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    fabricTypes,
    printTypes,
    description,
    image,
    gallery,
    seoTitle,
    seoDescription,
    bodyCopy,
    composition,
    gsmRange,
    width,
    moq,
    availableFinishes
  }
`

export const allProductSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`



// ── Best Sellers ───────────────────────────────────
export const bestSellersQuery = groq`
  *[_type == "bestSeller"] | order(order asc) {
    _id,
    title,
    description,
    badge,
    image
  }
`

// ── Blog Posts ──────────────────────────────────────
export const recentEventsQuery = groq`
  *[_type == "blogPost" && isRecentEvent == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage
  }
`

export const allBlogsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage
  }
`

export const singleBlogQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage,
    seoTitle,
    seoDescription,
    body
  }
`

export const allBlogSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`

// ── Site Settings (singleton) ──────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    logo,
    logoText,
    ogImage,
    aboutStripImage,
    aboutHeroImage,
    factoryImage,
    homepageProducts[]->{
      _id,
      name,
      "slug": slug.current,
      category,
      fabricTypes,
      printTypes,
      description,
      image,
      gallery
    }
  }
`
