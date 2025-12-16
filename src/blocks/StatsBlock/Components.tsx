import React from 'react'
import type { StatsBlock as StatsBlockProps } from '@/payload-types'
import { Typography } from '@/components/ui/typography'

export const StatsBlock: React.FC<StatsBlockProps> = ({
  type = 'default',
  title,
  description,
  items,
}) => {
  if (!items || items.length === 0) return null

  // Общий контейнер
  const renderContent = () => {
    if (type === 'secondary') {
      return (
        <div className="grid gap-2 *:text-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={i}
              className=" shadow-sm bg-card rounded-var(--radius) space-y-4 py-10 md:py-12 px-2 md:px-8"
            >
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
      )
    }

    // default и fallback
    return (
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
    )
  }

  return (
    <section className={type === 'secondary' ? '' : ''}>
      <div className="container space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 space-y-6">
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

        {renderContent()}
      </div>
    </section>
  )
}
