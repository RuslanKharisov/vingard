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
import { PorfolioCard } from '@/components/FeatureСard.tsx'
import { VacancyCard } from '@/components/VacancyCard'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function JobsPage() {
  const payload = await getPayload({ config: configPromise })

  const jobs = await payload.find({
    collection: 'jobs',
    depth: 1,
    limit: 12,
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
  console.log('jobs ==> ', jobs)

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Вакансии</h1>
        </div>
      </div>
      {/* <div className="container mb-8">
        <PageRange
          collection="jobs"
          currentPage={jobs.page}
          limit={12}
          totalDocs={jobs.totalDocs}
        />
      </div>
      */}
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
          <Pagination page={jobs.page} totalPages={jobs.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return { title: 'Вакансии' }
}
