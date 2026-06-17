export type Product = {
  slug: string
  name: string
  category: string
  description: string
  image: string
}

export const products: Product[] = [
  {
    slug: 'cotton-fabrics',
    name: 'Cotton Fabrics',
    category: 'Shirting',
    description: 'Comfortable, breathable, and suitable for everyday wear.',
    image: 'https://images.unsplash.com/photo-1594938298595-d2d87e0b82f0?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'dobby-fabrics',
    name: 'Dobby Fabrics',
    category: 'Shirting',
    description: 'Textured constructions developed through innovative weaving techniques.',
    image: 'https://images.unsplash.com/photo-1584031402281-224cb82cb8cb?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'structured-weaves',
    name: 'Structured Weaves',
    category: 'Shirting',
    description: 'Distinct fabric surfaces designed to enhance garment appeal.',
    image: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'cotton-poly-blends',
    name: 'Cotton-Poly Blends',
    category: 'Shirting',
    description: 'Durable and cost-effective solutions for various apparel categories.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'jacquard-fabrics',
    name: 'Jacquard Fabrics',
    category: 'Shirting',
    description: 'Patterned woven fabrics offering unique visual appeal.',
    image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'yarn-dyed-fabrics',
    name: 'Yarn Dyed Fabrics',
    category: 'Shirting',
    description: 'Rich colors and superior durability through yarn-level coloration.',
    image: 'https://images.unsplash.com/photo-1594938298595-d2d87e0b82f0?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'printed-fabrics',
    name: 'Printed Fabrics',
    category: 'Shirting',
    description: 'Contemporary patterns developed for evolving fashion trends.',
    image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=800&auto=format&fit=crop',
  }
]
