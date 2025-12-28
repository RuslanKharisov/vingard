import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

import { anyone } from '@/access/anyone'
import { isManagerAccess } from '@/access/isManager'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
    create: isManagerAccess,
    update: isManagerAccess,
    delete: isManagerAccess,
  },
  // endpoints: [populateTenantOptions],
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название организации (клиента)',
    },
    {
      name: 'domain',
      type: 'text',
      admin: {
        description: 'Используется для определения домена, к которому относится этот тенант.',
      },
    },
    ...slugField('name'),
  ],
}
