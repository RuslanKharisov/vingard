import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig<'skills'> = {
  slug: 'skills',
  labels: { singular: 'Ключевой навык', plural: 'Ключевые навыки' },
  admin: { group: 'Вакансии', useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    // Можно добавить: иконку, описание, категорию и т.д.
  ],
}
