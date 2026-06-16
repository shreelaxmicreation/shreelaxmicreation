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
    image: '/images/collections/cotton-fabrics.png',
  },
  {
    slug: 'dobby-fabrics',
    name: 'Dobby Fabrics',
    category: 'Shirting',
    description: 'Textured constructions developed through innovative weaving techniques.',
    image: '/images/collections/dobby-fabrics.png',
  },
  {
    slug: 'structured-weaves',
    name: 'Structured Weaves',
    category: 'Shirting',
    description: 'Distinct fabric surfaces designed to enhance garment appeal.',
    image: '/images/collections/structured-weaves.png',
  },
  {
    slug: 'cotton-poly-blends',
    name: 'Cotton-Poly Blends',
    category: 'Shirting',
    description: 'Durable and cost-effective solutions for various apparel categories.',
    image: '/images/collections/cotton-poly-blends.png',
  },
  {
    slug: 'jacquard-fabrics',
    name: 'Jacquard Fabrics',
    category: 'Shirting',
    description: 'Patterned woven fabrics offering unique visual appeal.',
    image: '/images/collections/jacquard-fabrics.png',
  },
  {
    slug: 'yarn-dyed-fabrics',
    name: 'Yarn Dyed Fabrics',
    category: 'Shirting',
    description: 'Rich colors and superior durability through yarn-level coloration.',
    image: '/images/collections/yarn-dyed-fabrics.png',
  },
  {
    slug: 'printed-fabrics',
    name: 'Printed Fabrics',
    category: 'Shirting',
    description: 'Contemporary patterns developed for evolving fashion trends.',
    image: '/images/collections/printed-fabrics.png',
  },
]
