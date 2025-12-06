import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Typography } from '@/components/ui/typography'
import type { Job, Skill } from '@/payload-types'
import RichText from '@/components/RichText'
import { GridPattern } from '@/components/ui/grid-pattern'
import {
  experienceLabels,
  employmentTypeLabels,
  scheduleLabels,
  workFormatLabels,
  paymentFrequencyLabels,
} from '@/utilities/jobTranslations'
import { JobDetailCard } from '@/components/JobDetailCard'
import { SkillsCloud } from '@/components/SkillsCloud'

export interface PopulatedKeySkill {
  skill: number | Skill
  id?: string | null
}

export type JobWithPopulatedSkills = Omit<Job, 'keySkills'> & {
  keySkills: PopulatedKeySkill[]
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const jobs = await payload.find({
    collection: 'jobs',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })
  return jobs.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function JobPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/jobs/${decodedSlug}`

  const job = await queryJobBySlug({ slug: decodedSlug })

  if (!job) return <PayloadRedirects url={url} />

  console.log('job ==> ', job)

  const jobLabels = {
    experience: experienceLabels[job.experience || ''] || job.experience,
    employmentType: employmentTypeLabels[job.employmentType || ''] || job.employmentType,
    schedule: scheduleLabels[job.schedule || ''] || job.schedule,
    workFormat: workFormatLabels[job.workFormat || ''] || job.workFormat,
    paymentFrequency: paymentFrequencyLabels[job.paymentFrequency || ''] || job.paymentFrequency,
  }

  // Форматируем зарплату
  const formatSalary = () => {
    if (!job.salaryFrom && !job.salaryTo) return null
    const from = job.salaryFrom ? job.salaryFrom.toLocaleString('ru-RU') : ''
    const to = job.salaryTo ? job.salaryTo.toLocaleString('ru-RU') : ''
    const type =
      job.salaryType === 'net' ? ' на руки' : job.salaryType === 'gross' ? ' до вычета налогов' : ''
    if (from && to) return `от ${from} до ${to} ₽${type}`
    if (from) return `от ${from} ₽${type}`
    if (to) return `до ${to} ₽${type}`
    return null
  }

  // Извлекаем связанные вакансии из поля relatedJobs
  const relatedJobs = (job.relatedJobs || []).filter(
    (j): j is Job => j !== null && typeof j === 'object',
  )

  return (
    <article className="pt-10 md:pt-16 pb-24 relative">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-3 space-y-8">
            <JobDetailCard
              title={job.title}
              location={job.location}
              salary={formatSalary()}
              experience={jobLabels.experience}
              employmentType={jobLabels.employmentType}
              schedule={jobLabels.schedule}
              workHours={job.workHours}
              workFormat={jobLabels.workFormat}
              paymentFrequency={jobLabels.paymentFrequency}
            />

            <Typography tag="h2" className="text-lg font-semibold mb-3">
              Требования к вакансии:
            </Typography>
            {job.description && (
              <div>
                <div className="prose dark:prose-invert max-w-none">
                  <RichText data={job.description} enableGutter={false} />
                </div>
              </div>
            )}

            {job.responsibilities?.length > 0 && (
              <div>
                <Typography tag="h3" className="text-lg font-semibold mb-3">
                  Обязанности:
                </Typography>
                <ul className="prose list-disc pl-5 space-y-1 text-muted-foreground">
                  {job.responsibilities.map((r, i) => (
                    <li key={i}>{r.item}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements?.length > 0 && (
              <div>
                <Typography tag="h3" className="text-lg font-semibold mb-3">
                  Требования:
                </Typography>
                <ul className="prose list-disc pl-5 space-y-1 text-muted-foreground">
                  {job.requirements.map((r, i) => (
                    <li key={i}>{r.item}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.conditions?.length > 0 && (
              <div>
                <Typography tag="h3" className="text-lg font-semibold mb-3">
                  Условия:
                </Typography>
                <ul className="prose list-disc pl-5 space-y-1 text-muted-foreground">
                  {job.conditions.map((c, i) => (
                    <li key={i}>{c.item}</li>
                  ))}
                </ul>
              </div>
            )}

            <Typography tag="h3" className="text-lg font-semibold mb-3">
              Ключевые навыки:
            </Typography>

            <SkillsCloud skills={job.keySkills || []} />
          </div>

          {/* Сайдбар — связанные вакансии */}
          {relatedJobs.length > 0 && (
            <div className="lg:col-span-1 border-l pl-5">
              <Typography tag="h3" className="text-lg font-semibold mb-4">
                Похожие вакансии
              </Typography>
              <div className="space-y-4">
                {relatedJobs.map((j) => (
                  <div key={j.id} className="relative">
                    <div className="-mt-2 -ml-20 pointer-events-none absolute top-0 left-1/2 size-full mask-[radial-gradient(farthest-side_at_top,white,transparent)]">
                      <GridPattern
                        className="absolute inset-0 size-full stroke-foreground/20"
                        height={20}
                        width={20}
                        x={1}
                      />
                    </div>

                    <a
                      href={`/jobs/${j.slug}`}
                      className="block px-5 py-3 rounded-lg transition-box-shadow hover:shadow-muted-foreground/40 duration-300 hover:shadow-lg cursor-pointer"
                    >
                      <Typography tag="div" className="font-medium">
                        {j.title}
                      </Typography>
                      <Typography tag="div" className="text-sm text-muted-foreground">
                        {j.location}
                      </Typography>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const job = await queryJobBySlug({ slug: decodedSlug })
  return generateMeta({ doc: job })
}

const queryJobBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'jobs',
    limit: 1,
    pagination: false,
    depth: 1,
    where: { slug: { equals: slug } },
  })
  console.log('result ==> ', result)
  return result.docs?.[0] || null
})
