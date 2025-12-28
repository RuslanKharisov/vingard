import type { CollectionConfig } from 'payload'

import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'

import { authenticated } from '../../access/authenticated'

import { isSuperAdminFieldAccess } from '@/access/isSuperAdmin'
import { isManagerFieldAccess } from '@/access/isManager'
import { anyone } from '@/access/anyone'

// Настройка поля для привязки пользователей к тенантам

const tenantAccess = {
  read: () => true,
  create: () => true,
  update: () => true,
}

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsCollectionSlug: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  arrayFieldAccess: tenantAccess,
  tenantFieldAccess: tenantAccess,
  rowFields: [
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['client'],
      hasMany: true,
      options: [
        { label: 'Клиент', value: 'client' },
        { label: 'Админ клиента', value: 'client-admin' },
      ],
      required: true,
    },
  ],
})

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'tenants'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      defaultValue: () => ['user'],
      hasMany: true,
      options: ['super-admin', 'manager', 'user'],
      access: {
        update: isSuperAdminFieldAccess,
      },
      admin: { position: 'sidebar' },
    },
    {
      // 👇 Мультитенант-поле — доступно для менеджера
      ...defaultTenantArrayField,
      access: {
        read: () => true,
        create: isSuperAdminFieldAccess,
        update: isManagerFieldAccess,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
