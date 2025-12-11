import React from 'react'
import type { StatsBlock as StatsBlockProps } from '@/payload-types'
import { Typography } from '@/components/ui/typography'

export const StatsBlock: React.FC<StatsBlockProps> = ({ title, description, items }) => {
  if (!items || items.length === 0) return null

  return (
    <section>
      <div className="container space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 md:text-center">
          {title && (
            <Typography tag="h2" className="text-4xl font-medium lg:text-5xl">
              {title}
            </Typography>
          )}
          {description && (
            <Typography tag="p" className="text-balance">
              {description}
            </Typography>
          )}
        </div>

        <div className="grid gap-12 divide-y md:*:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          {items.map((item, i) => (
            <div key={i} className="space-y-4 pb-3">
              {item.value && (
                <Typography tag="p" className="text-3xl md:text-5xl font-bold">
                  {item.value}
                </Typography>
              )}
              {item.label && (
                <Typography tag="p" className="text-sm">
                  {item.label}
                </Typography>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
