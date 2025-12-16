import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: {
    singular: 'Вендор',
    plural: 'Вендоры',
  },
  admin: {
    group: 'Информация',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Название бренда',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание (опционально)',
    },
  ],
}
