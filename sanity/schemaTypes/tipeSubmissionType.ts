import { defineField, defineType } from 'sanity'

export const tipeSubmissionType = defineType({
  name: 'tipeSubmission',
  title: 'Soumission TIPE',
  type: 'document',
  fields: [
    defineField({
      name: 'studentName',
      title: 'Prénom',
      type: 'string',
    }),
    defineField({
      name: 'studentEmail',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF de présentation',
      type: 'file',
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript de l\'entretien',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'text' },
            { name: 'answer', title: 'Réponse', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'report',
      title: 'Rapport de correction',
      type: 'object',
      fields: [
        {
          name: 'items',
          title: 'Détail par question',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'question', title: 'Question', type: 'text' },
                { name: 'score', title: 'Score /20', type: 'number' },
                { name: 'points_forts', title: 'Points forts', type: 'text' },
                { name: 'a_ameliorer', title: 'À améliorer', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'conseils_generaux',
          title: 'Conseils généraux',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Date de soumission',
      type: 'datetime',
    }),
    defineField({
      name: 'completedAt',
      title: 'Date de fin d\'entretien',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'studentName',
      subtitle: 'studentEmail',
    },
  },
})