import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo (Icon)',
      type: 'image',
      description: 'The main logo icon used in the navbar and footer. Upload an SVG or PNG.',
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'image',
      description: 'The text portion of the logo shown next to the icon in the navbar.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Default image for social sharing (1200×630 recommended).',
    }),
    defineField({
      name: 'aboutStripImage',
      title: 'About Strip Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image used in the About preview section on the homepage.',
    }),
    defineField({
      name: 'aboutHeroImage',
      title: 'About Page Hero Background',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image for the About page hero section.',
    }),
    defineField({
      name: 'factoryImage',
      title: 'Factory / Facility Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image of the manufacturing facility shown on the About page.',
    }),
    defineField({
      name: 'homepageProducts',
      title: 'Homepage Featured Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'Select exactly which products to show on the homepage. The first 4 will appear as large featured cards in Act 2. The rest will appear in the scrolling marquee and the grid below. Make sure the products you select have shoot photos in their Image Gallery!',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global images and branding',
      }
    },
  },
})
