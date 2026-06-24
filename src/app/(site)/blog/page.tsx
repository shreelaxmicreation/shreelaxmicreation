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
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400 mb-12">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white">Blog</span>
        </nav>

        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-normal mb-4" style={{ color: 'var(--navy)' }}>
            Our <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Insights</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Expert guides, industry updates, and in-depth knowledge about bulk shirting fabric manufacturing and sourcing.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-semibold mb-2">No articles published yet</h3>
            <p className="text-gray-400">Check back soon for insights on fabric manufacturing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group block">
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/20 h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-white/10">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <time className="text-sm text-gray-400 mb-3 block">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--cta)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 line-clamp-3 mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-[var(--cta)]">
                      Read Article <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
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
