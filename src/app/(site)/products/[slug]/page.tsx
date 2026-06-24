import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { singleProductQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { ChevronRight } from 'lucide-react'

// You might need to adjust the import of allProductsQuery if it's not exported
// If it's not, we can just fetch some related products or use the existing query

interface ProductPageProps {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await client.fetch(singleProductQuery, { slug: params.slug })

  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.seoTitle || `${product.name} Shirting Fabric Manufacturer | Shree Laxmi Creation`,
    description: product.seoDescription || `High-quality ${product.name} from Ahmedabad's leading shirting fabric manufacturer. Available for bulk supply.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await client.fetch(singleProductQuery, { slug: params.slug })

  if (!product) {
    notFound()
  }

  // Generate JSON-LD Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.seoDescription || product.description || product.name,
    material: product.composition || 'Cotton / Blend',
    image: product.image ? urlFor(product.image).url() : undefined,
    manufacturer: {
      '@type': 'Organization',
      name: 'Shree Laxmi Creation',
      url: 'https://shreelaxmicreation.com',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Shree Laxmi Creation' },
    },
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {product.gallery.map((img: any, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    <Image
                      src={urlFor(img).url()}
                      alt={`${product.name} lifestyle shot ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {product.name}
            </h1>
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-8">
              {product.category}
            </div>

            {/* Specifications Table */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                <h3 className="font-semibold text-lg">Fabric Specifications</h3>
              </div>
              <div className="divide-y divide-white/10">
                <div className="flex px-6 py-3">
                  <span className="w-1/3 text-gray-400">Composition</span>
                  <span className="w-2/3 font-medium">{product.composition || 'Contact for details'}</span>
                </div>
                <div className="flex px-6 py-3">
                  <span className="w-1/3 text-gray-400">GSM Range</span>
                  <span className="w-2/3 font-medium">{product.gsmRange || 'Contact for details'}</span>
                </div>
                <div className="flex px-6 py-3">
                  <span className="w-1/3 text-gray-400">Width</span>
                  <span className="w-2/3 font-medium">{product.width || 'Contact for details'}</span>
                </div>
                <div className="flex px-6 py-3">
                  <span className="w-1/3 text-gray-400">MOQ</span>
                  <span className="w-2/3 font-medium">{product.moq || 'Contact for details'}</span>
                </div>
                <div className="flex px-6 py-3">
                  <span className="w-1/3 text-gray-400">Finishes</span>
                  <span className="w-2/3 font-medium">{product.availableFinishes || 'Contact for details'}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/contact?subject=Enquiry regarding ${encodeURIComponent(product.name)}`}
              className="block w-full py-4 text-center rounded-xl bg-white text-black font-semibold text-lg hover:bg-gray-200 transition-colors mb-12"
            >
              Enquire About This Fabric
            </Link>

            {/* Long Form SEO Content */}
            <div className="prose prose-invert max-w-none">
              {product.bodyCopy ? (
                <PortableText value={product.bodyCopy} />
              ) : (
                <p className="text-gray-400">{product.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
