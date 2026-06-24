import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { allProductSlugsQuery, allBlogSlugsQuery } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogs] = await Promise.all([
    client.fetch<{ slug: string; _updatedAt: string }[]>(allProductSlugsQuery),
    client.fetch<{ slug: string; _updatedAt: string }[]>(allBlogSlugsQuery)
  ])

  const productUrls = products.map((product) => ({
    url: `https://shreelaxmicreation.com/products/${product.slug}`,
    lastModified: product._updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogUrls = blogs.map((blog) => ({
    url: `https://shreelaxmicreation.com/blog/${blog.slug}`,
    lastModified: blog._updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://shreelaxmicreation.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://shreelaxmicreation.com/products',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://shreelaxmicreation.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://shreelaxmicreation.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://shreelaxmicreation.com/infrastructure',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://shreelaxmicreation.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...productUrls,
    ...blogUrls,
  ]
}
