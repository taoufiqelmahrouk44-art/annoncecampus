import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
  list: [
    { title: 'Actualités', value: 'actualites' },
    { title: 'Événements', value: 'evenements' },
    { title: 'Stages', value: 'stages' },
    { title: 'Logement', value: 'logement' },
    { title: 'Annonces', value: 'annonces' },
    { title: 'Vie étudiante', value: 'vie-etudiante' },
  ]
},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Résumé court',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
  ]
})