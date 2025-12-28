import { User } from '@/payload-types'
import type { Access, FieldAccess } from 'payload'

export const isManagerAccess: Access = ({ req }): boolean => {
  return isManager(req?.user as User | null | undefined)
}

export const isManager = (user: User | null | undefined): boolean => {
  if (!user) return false
  if (!Array.isArray(user.roles)) return false
  return user.roles.includes('manager') || user.roles.includes('super-admin')
}

export const isManagerFieldAccess: FieldAccess = ({ req }) => {
  return isManager(req?.user as User | null | undefined)
}
