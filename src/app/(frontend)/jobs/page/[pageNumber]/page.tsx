// src/app/(frontend)/jobs/page.tsx
import type { Metadata } from 'next/types'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { CollectionGrid } from '@/components/CollectionGrid'
import { VacancyCard } from '@/components/VacancyCard'
import { Typography } from '@/components/ui/typography'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function JobsPage({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  const jobs = await payload.find({
    collection: 'jobs',
    depth: 1,
    limit: 6,
    page: sanitizedPageNumber,
    where: { _status: { equals: 'published' } },
    select: {
      title: true,
      slug: true,
      location: true,
      salaryFrom: true,
      salaryTo: true,
      salaryType: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="max-w-none">
          <Typography tag="h1">Вакансии</Typography>
        </div>
      </div>
      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={jobs.page}
          limit={12}
          totalDocs={jobs.totalDocs}
        />
      </div>
      <div className="container">
        <CollectionGrid>
          {jobs.docs.map((job) => (
            <VacancyCard
              key={job.id}
              job={job}
              className="last:border-r last:border-b transition-box-shadow hover:shadow-muted-foreground duration-100 hover:shadow-md  cursor-pointer"
            />
          ))}
        </CollectionGrid>
      </div>
      <div className="container">
        {jobs.totalPages > 1 && jobs.page && (
          <Pagination page={jobs.page} totalPages={jobs.totalPages} basePath="/jobs" />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return { title: 'Вакансии' }
}
