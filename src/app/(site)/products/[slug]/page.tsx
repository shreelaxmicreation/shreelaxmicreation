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
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--surface)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted mb-8">
          <Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--navy)' }}>Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/products" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--navy)' }}>Products</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span style={{ color: 'var(--navy)' }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
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
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
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
            <h1 className="text-4xl sm:text-5xl font-display font-normal tracking-tight mb-4" style={{ color: 'var(--navy)' }}>
              {product.name}
            </h1>
            <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-8" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--cta)' }}>
              {product.category}
            </div>

            {/* Specifications Table */}
            <div className="rounded-xl overflow-hidden mb-8" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--card-border)', background: 'var(--surface)' }}>
                <h3 className="font-display font-normal text-lg" style={{ color: 'var(--navy)' }}>Fabric Specifications</h3>
              </div>
              <div style={{ borderColor: 'var(--card-border)' }}>
                {[
                  { label: 'Composition', value: product.composition },
                  { label: 'GSM Range', value: product.gsmRange },
                  { label: 'Width', value: product.width },
                  { label: 'MOQ', value: product.moq },
                  { label: 'Finishes', value: product.availableFinishes },
                ].map((spec, i) => (
                  <div key={spec.label} className="flex px-6 py-3" style={{ borderBottom: i < 4 ? '1px solid var(--card-border)' : 'none' }}>
                    <span className="w-1/3 text-muted">{spec.label}</span>
                    <span className="w-2/3 font-medium" style={{ color: 'var(--ink)' }}>{spec.value || 'Contact for details'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/contact?subject=Enquiry regarding ${encodeURIComponent(product.name)}`}
              className="block w-full py-4 text-center rounded-xl font-semibold text-lg transition-opacity hover:opacity-90 mb-12"
              style={{ background: 'var(--navy)', color: 'var(--canvas)' }}
            >
              Enquire About This Fabric
            </Link>

            {/* Long Form SEO Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:text-[var(--navy)] prose-a:text-[var(--cta)] prose-p:text-[var(--muted)] prose-li:text-[var(--muted)] prose-strong:text-[var(--navy)]">
              {product.bodyCopy ? (
                <PortableText value={product.bodyCopy} />
              ) : (
                <p className="text-muted">{product.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
