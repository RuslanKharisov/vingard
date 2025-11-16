import type { FieldHook } from 'payload'
import slugify from 'slugify'

/**
 * Форматирует строку в slug:
 * - приводит к нижнему регистру
 * - убирает всё, кроме латиницы, кириллицы и цифр
 */
export const formatSlug = (val: string): string =>
  slugify(val, {
    lower: true,
    strict: true, // удаляет спецсимволы
    locale: 'ru', // поддержка русских символов
  })

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
