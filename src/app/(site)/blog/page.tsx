import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { allBlogsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Shree Laxmi Creation',
  description: 'Insights and guides on bulk shirting fabric manufacturing, material selection, and textile sourcing from Ahmedabad.',
}

export default async function BlogIndexPage() {
  const posts = await client.fetch(allBlogsQuery)

  return (
    <div className="min-h-screen pt-24 pb-24" style={{ background: 'var(--surface)' }}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted mb-12">
          <Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--navy)' }}>Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span style={{ color: 'var(--navy)' }}>Blog</span>
        </nav>

        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-normal mb-4" style={{ color: 'var(--navy)' }}>
            Our <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Insights</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl">
            Expert guides, industry updates, and in-depth knowledge about bulk shirting fabric manufacturing and sourcing.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 rounded-2xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--navy)' }}>No articles published yet</h3>
            <p className="text-muted">Check back soon for insights on fabric manufacturing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {posts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group block text-decoration-none">
                <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full flex flex-col" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: '0 4px 20px var(--card-shadow)' }}>
                  <div className="relative aspect-[16/10] overflow-hidden" style={{ background: 'var(--surface)' }}>
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-6 flex-1 flex flex-col">
                    <time className="text-[10px] md:text-sm text-muted mb-2 md:mb-3 block tracking-widest uppercase">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <h2 className="text-sm md:text-xl font-display font-normal mb-2 md:mb-3 transition-colors line-clamp-2" style={{ color: 'var(--navy)' }}>
                      {post.title}
                    </h2>
                    <p className="text-xs md:text-base text-muted line-clamp-2 md:line-clamp-3 mb-4 md:mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-[10px] md:text-sm font-semibold tracking-widest uppercase" style={{ color: 'var(--cta)' }}>
                      Read <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
