import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Job } from '../../../payload-types'

export const revalidateJob: CollectionAfterChangeHook<Job> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/jobs/${doc.slug}`

      payload.logger.info(`Revalidating job at path: ${path}`)

      revalidatePath(path)
      revalidateTag('jobs-sitemap')
    }

    // If the job was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/jobs/${previousDoc.slug}`

      payload.logger.info(`Revalidating old job at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('jobs-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Job> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/jobs/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('jobs-sitemap')
  }

  return doc
}
