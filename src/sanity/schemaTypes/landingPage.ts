import { defineType, defineField } from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'localeString',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'localeText',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Main Heading', type: 'localeString' }),
        defineField({ name: 'tagline', title: 'Tagline', type: 'localeString' }),
      ],
    }),
    defineField({
      name: 'philosophy',
      title: 'Philosophy Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'localeString' }),
        defineField({ name: 'body', title: 'Body Text', type: 'localeText' }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'Process Section',
      type: 'array',
      of: [
        defineField({
          name: 'processItem',
          title: 'Process Item',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'localeString' }),
            defineField({ name: 'description', title: 'Description', type: 'localeText' }),
            defineField({ name: 'image', title: 'Image', type: 'image' }),
          ],
          preview: { select: { title: 'title.en', media: 'image' } }
        })
      ]
    }),
    defineField({
      name: 'signatureDishes',
      title: 'Signature Dishes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }],
    }),
    defineField({
      name: 'atmosphere',
      title: 'Atmosphere Section',
      type: 'object',
      fields: [
        defineField({ name: 'image', title: 'Wide Interior Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'localeString' }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA / Reservation Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'CTA Heading', type: 'localeString' }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'localeString' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Landing Page Settings' }
    }
  }
})
