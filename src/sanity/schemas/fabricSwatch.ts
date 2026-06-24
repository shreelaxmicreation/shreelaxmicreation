import { defineType, defineField } from 'sanity'

export const fabricSwatch = defineType({
  name: 'fabricSwatch',
  title: 'Fabric Swatch',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cotton Fabrics', value: 'Cotton Fabrics' },
          { title: 'Dobby Fabrics', value: 'Dobby Fabrics' },
          { title: 'Structured Weaves', value: 'Structured Weaves' },
          { title: 'Cotton-Poly Blends', value: 'Cotton-Poly Blends' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Swatch Color (Hex)',
      type: 'string',
      description: 'Hex color code for the card background, e.g. #E8E2D5',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Fabric Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isFeaturedCategory',
      title: 'Featured Category Card?',
      type: 'boolean',
      description: 'If enabled, this swatch appears as a large animated card in the homepage scroll sequence (Act 2). Enable one per category.',
      initialValue: false,
    }),
    defineField({
      name: 'featuredSize',
      title: 'Featured Card Size',
      type: 'string',
      options: {
        list: [
          { title: 'Large', value: 'lg' },
          { title: 'Medium', value: 'md' },
          { title: 'Small', value: 'sm' },
        ],
      },
      hidden: ({ document }) => !document?.isFeaturedCategory,
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
      title: 'label',
      subtitle: 'category',
      media: 'image',
    },
  },
})
