import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { singleBlogQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { ChevronRight } from 'lucide-react'

interface BlogPageProps {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: BlogPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await client.fetch(singleBlogQuery, { slug: params.slug })

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.seoTitle || `${post.title} | Shree Laxmi Creation`,
    description: post.seoDescription || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const post = await client.fetch(singleBlogQuery, { slug: params.slug })

  if (!post) {
    notFound()
  }

  // Generate Article JSON-LD Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.mainImage ? urlFor(post.mainImage).url() : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Shree Laxmi Creation',
      url: 'https://shreelaxmicreation.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shree Laxmi Creation',
      logo: {
        '@type': 'ImageObject',
        url: 'https://shreelaxmicreation.com/logo.png', // Replace with absolute logo URL if available
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://shreelaxmicreation.com/blog/${post.slug}`,
    },
  }

  return (
    <div className="min-h-screen pt-24 pb-24" style={{ background: 'var(--surface)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted mb-8">
          <Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--navy)' }}>Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/blog" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--navy)' }}>Blog</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="truncate" style={{ color: 'var(--navy)' }}>{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <time className="text-sm font-semibold text-[var(--cta)] tracking-wider uppercase mb-4 block">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal mb-6 leading-tight" style={{ color: 'var(--navy)' }}>
            {post.title}
          </h1>
          <p className="text-xl text-muted leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Main Image */}
        {post.mainImage && (
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-16 border" style={{ background: 'var(--surface)', borderColor: 'var(--card-border)' }}>
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:text-[var(--navy)] prose-a:text-[var(--cta)] hover:prose-a:opacity-80 prose-p:text-[var(--muted)] prose-li:text-[var(--muted)] prose-strong:text-[var(--navy)]">
          <PortableText value={post.body} />
        </article>

        {/* Footer CTA */}
        <div className="mt-20 p-8 rounded-2xl text-center" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: '0 4px 20px var(--card-shadow)' }}>
          <h3 className="text-2xl font-display font-normal mb-4" style={{ color: 'var(--navy)' }}>Sourcing Bulk Shirting Fabric?</h3>
          <p className="text-muted mb-8">
            Explore our extensive catalog of high-quality fabrics, manufactured in-house to ensure premium quality at competitive prices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-3 rounded-full font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--navy)', color: 'var(--canvas)' }}
            >
              View Collection
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full transition-colors"
              style={{ border: '1px solid var(--navy)', color: 'var(--navy)' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
