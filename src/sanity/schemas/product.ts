import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'seo', title: 'SEO' },
    { name: 'specs', title: 'Specifications' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Shirting', value: 'Shirting' },
          { title: 'Suiting', value: 'Suiting' },
          { title: 'Bottom Wear', value: 'Bottom Wear' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fabricTypes',
      title: 'Fabric Types',
      type: 'array',
      group: 'general',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Cotton', value: 'Cotton' },
              { title: 'Linen', value: 'Linen' },
              { title: 'Polyester', value: 'Polyester' },
              { title: 'Blend', value: 'Blend' },
              { title: 'Dobby', value: 'Dobby' },
              { title: 'Oxford', value: 'Oxford' },
              { title: 'Jacquard', value: 'Jacquard' },
            ],
          },
        },
      ],
      description: 'Select one or more fabric types.',
    }),
    defineField({
      name: 'printTypes',
      title: 'Print Types',
      type: 'array',
      group: 'general',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Solid', value: 'Solid' },
              { title: 'Stripes', value: 'Stripes' },
              { title: 'Checks', value: 'Checks' },
              { title: 'Printed', value: 'Printed' },
              { title: 'Abstract', value: 'Abstract' },
              { title: 'Floral', value: 'Floral' },
            ],
          },
        },
      ],
      description: 'Select one or more print types.',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      group: 'general',
      rows: 3,
      description: 'Used for product cards and summaries',
    }),
    defineField({
      name: 'image',
      title: 'Main Product Image',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'The primary swatch or image shown on cards',
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      group: 'general',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add multiple lifestyle or model shoot images here',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'general',
      initialValue: 0,
    }),
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Format: [Product Name] Shirting Fabric — Manufacturer & Bulk Supplier, Ahmedabad',
      validation: (Rule) => Rule.max(60).warning('Optimal SEO title is under 60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Format: Describe the fabric, mention bulk supply, Ahmedabad, enquiry CTA. Under 155 chars.',
      validation: (Rule) => Rule.max(155).warning('Optimal SEO description is under 155 characters.'),
    }),
    // Long form content
    defineField({
      name: 'bodyCopy',
      title: 'Body Copy (400-500 words)',
      type: 'array',
      group: 'general',
      of: [{ type: 'block' }],
      description: 'Composition, GSM range, width options, use cases, buyer types.',
    }),
    // Specifications
    defineField({
      name: 'composition',
      title: 'Composition',
      type: 'string',
      group: 'specs',
      description: 'e.g., 100% Cotton, Poly-Cotton Blend',
    }),
    defineField({
      name: 'gsmRange',
      title: 'GSM Range',
      type: 'string',
      group: 'specs',
      description: 'e.g., 110 - 130 GSM',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      group: 'specs',
      description: 'e.g., 58/60 inches',
    }),
    defineField({
      name: 'moq',
      title: 'Minimum Order Quantity (MOQ)',
      type: 'string',
      group: 'specs',
      description: 'e.g., 1000 Meters',
    }),
    defineField({
      name: 'availableFinishes',
      title: 'Available Finishes',
      type: 'string',
      group: 'specs',
      description: 'e.g., Mercerized, Peach, Regular',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
})
