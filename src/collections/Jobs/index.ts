// src/collections/Jobs.ts
import type { CollectionConfig } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from '@/fields/slug'
import { Banner } from '@/blocks/Banner/config'
import { revalidateJob } from './hooks/revalidateJobs'

export const Jobs: CollectionConfig<'jobs'> = {
  slug: 'jobs',
  labels: { singular: 'Вакансия', plural: 'Вакансии' },
  admin: { group: 'Вакансии', useAsTitle: 'title' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    // Основные поля (вне вкладок)
    { name: 'title', type: 'text', required: true, label: 'Название вакансии' },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Описание',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [Banner] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            AlignFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            LinkFeature(),
            IndentFeature(),
          ]
        },
      }),
    },

    // Вкладки
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Контент',
          fields: [
            {
              name: 'responsibilities',
              label: 'Обязанности',
              type: 'array',
              labels: { singular: 'Обязанность', plural: 'Обязанности' },
              fields: [{ name: 'item', type: 'text', required: true }],
              required: true,
            },
            {
              name: 'requirements',
              label: 'Требования',
              type: 'array',
              labels: { singular: 'Требование', plural: 'Требования' },
              fields: [{ name: 'item', type: 'text', required: true }],
              required: true,
            },
            {
              name: 'conditions',
              label: 'Условия',
              type: 'array',
              labels: { singular: 'Условие', plural: 'Условия' },
              fields: [{ name: 'item', type: 'text', required: true }],
              required: true,
            },
            {
              name: 'keySkills',
              type: 'array',
              labels: { singular: 'Навык', plural: 'Ключевые навыки' },
              fields: [
                {
                  name: 'skill',
                  type: 'relationship',
                  relationTo: 'skills',
                  required: true,
                },
              ],
              maxRows: 10,
            },
          ],
        },
        {
          label: 'Компенсация',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'salaryFrom', type: 'number', label: 'От', admin: { width: '50%' } },
                { name: 'salaryTo', type: 'number', label: 'До', admin: { width: '50%' } },
              ],
            },
            {
              name: 'salaryType',
              type: 'select',
              options: [
                { label: 'На руки', value: 'net' },
                { label: 'До вычета налогов', value: 'gross' },
              ],
              label: 'Тип оплаты',
            },
            {
              name: 'paymentFrequency',
              type: 'select',
              options: [
                { label: 'Два раза в месяц', value: 'twice_per_month' },
                { label: 'Раз в неделю', value: 'weekly' },
                { label: 'Ежедневно', value: 'daily' },
                { label: 'По окончании работ', value: 'completion' },
              ],
              label: 'Частота выплат',
            },
          ],
        },
        {
          label: 'Условия работы',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'experience',
                  type: 'select',
                  label: 'Опыт',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Без опыта', value: 'no_experience' },
                    { label: 'До 1 года', value: 'less_than_1' },
                    { label: '1–3 года', value: '1_to_3' },
                    { label: '3–6 лет', value: '3_to_6' },
                    { label: 'Более 6 лет', value: 'more_than_6' },
                  ],
                },
                {
                  name: 'employmentType',
                  type: 'select',
                  label: 'Занятость',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Полная', value: 'full' },
                    { label: 'Частичная', value: 'part' },
                    { label: 'Проект', value: 'project' },
                    { label: 'Вахта', value: 'fly_in_fly_out' },
                    { label: 'Подработка', value: 'side_job' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'schedule',
                  type: 'select',
                  label: 'График',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Полный день', value: 'full_day' },
                    { label: 'Сменный', value: 'shift' },
                    { label: 'Гибкий', value: 'flexible' },
                    { label: 'Удалёнка', value: 'remote' },
                    { label: 'Вахта', value: 'fly_in_fly_out' },
                  ],
                },
                {
                  name: 'workHours',
                  type: 'number',
                  label: 'Часов в день',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'workFormat',
              type: 'select',
              label: 'Формат работы',
              options: [
                { label: 'Офис', value: 'office' },
                { label: 'Удалёнка', value: 'remote' },
                { label: 'Разъездной', value: 'field' },
                { label: 'Гибрид', value: 'hybrid' },
              ],
            },
            {
              name: 'location',
              type: 'text',
              required: true,
              label: 'Место работы',
            },
          ],
        },
        {
          label: 'SEO и публикация',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },

    // Сайдбар
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    ...slugField(),
    {
      name: 'relatedJobs',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: true,
      relationTo: 'jobs',
    },
  ],
  hooks: {
    afterChange: [revalidateJob],
  },
  versions: {
    drafts: { autosave: { interval: 500 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}
