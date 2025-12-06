'use client'

import type React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/utilities/ui'
import { GridPattern } from '@/components/ui/grid-pattern'
import { Job } from '@/payload-types'

type VacancyType = Pick<
  Job,
  'id' | 'title' | 'slug' | 'location' | 'salaryFrom' | 'salaryTo' | 'salaryType'
>

export interface VacancyCardProps extends React.ComponentProps<'div'> {
  job: VacancyType
}

export function VacancyCard({ job, className, ...props }: VacancyCardProps) {
  const router = useRouter()

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

  return (
    <div
      onClick={() => job.slug && router.push(`/jobs/${job.slug}`)}
      className={cn(
        'relative overflow-hidden p-6 transition-all duration-200 hover:shadow-md cursor-pointer',
        className,
      )}
      {...props}
    >
      {/* Фоновый паттерн */}
      <div className="-mt-2 -ml-20 pointer-events-none absolute top-0 left-1/2 size-full mask-[radial-gradient(farthest-side_at_top,white,transparent)]">
        <GridPattern
          className="absolute inset-0 size-full stroke-foreground/10"
          height={40}
          width={40}
          x={5}
        />
      </div>

      {/* Заголовок */}
      <h3 className="text-base font-semibold line-clamp-2">{job.title}</h3>

      {/* Мета-информация */}
      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
        {job.location && <div>{job.location}</div>}
        {formatSalary() && <div>{formatSalary()}</div>}
      </div>
    </div>
  )
}
