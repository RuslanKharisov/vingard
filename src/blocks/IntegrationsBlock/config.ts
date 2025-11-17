import type { Block } from 'payload'

export const IntegrationsBlock: Block = {
  slug: 'integrations',
  interfaceName: 'IntegrationsBlock',
  labels: {
    singular: 'Integrations',
    plural: 'Integrations Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'mode',
      type: 'radio',
      options: [
        { label: 'Ручной ввод', value: 'manual' },
        { label: 'Из коллекции', value: 'fromCollection' },
      ],
      defaultValue: 'manual',
      admin: {
        layout: 'horizontal',
      },
    },
    // ——— Ручной режим ———
    {
      name: 'manualItems',
      type: 'array',
      label: 'Интеграции (ручной ввод)',
      maxRows: 12,
      admin: {
        condition: (_, { mode }) => mode === 'manual',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // ——— Режим из коллекции ———
    {
      name: 'collection',
      type: 'select',
      label: 'Коллекция',
      admin: {
        condition: (_, { mode }) => mode === 'fromCollection',
      },
      options: [{ label: 'Портфолио', value: 'portfolio' }],
      required: true,
    },
  ],
}
