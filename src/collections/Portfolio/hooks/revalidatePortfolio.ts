import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Portfolio } from '@/payload-types'

const getPortfolioPath = (slug?: string | null): string => {
  return slug ? `/portfolio/${slug}` : ''
}

export const revalidatePortfolio: CollectionAfterChangeHook<Portfolio> = ({
  doc,
  previousDoc, // может быть undefined при создании
  req: { payload, context },
}) => {
  if (context?.disableRevalidate) return doc

  // Путь текущего документа
  const currentPath = getPortfolioPath(doc.slug)

  // 1. Если документ опубликован — инвалидируем его путь
  if (doc._status === 'published' && currentPath) {
    payload.logger.info(`Revalidating portfolio at path: ${currentPath}`)
    revalidatePath(currentPath)
    revalidateTag('portfolio-sitemap')
  }

  // 2. Если ДО ЭТОГО документ был опубликован, а теперь — нет (например, черновик или удалён из публикации)
  if (previousDoc && previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = getPortfolioPath(previousDoc.slug)
    if (oldPath) {
      payload.logger.info(`Revalidating old (now unpublished) portfolio at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidateTag('portfolio-sitemap')
    }
  }

  return doc
}

// Для удаления — отдельный хук (afterDelete)
export const revalidatePortfolioDelete: CollectionAfterDeleteHook<Portfolio> = ({
  doc,
  req: { context },
}) => {
  if (context?.disableRevalidate) return doc

  const path = getPortfolioPath(doc?.slug)
  if (path) {
    revalidatePath(path)
    revalidateTag('portfolio-sitemap')
  }

  return doc
}
