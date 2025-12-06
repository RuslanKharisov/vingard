import { Typography } from '@/components/ui/typography'
import { GridPattern } from '@/components/ui/grid-pattern'

type JobDetailCardProps = {
  title: string
  location: string
  salary: string | null
  experience?: string | null
  employmentType?: string | null
  schedule?: string | null
  workHours?: number | null
  workFormat?: string | null
  paymentFrequency?: string | null
}

export function JobDetailCard({
  title,
  location,
  salary,
  experience,
  employmentType,
  schedule,
  workHours,
  workFormat,
  paymentFrequency,
}: JobDetailCardProps) {
  return (
    <div className="relative overflow-hidden p-8 border rounded-xl bg-card">
      <div className="-mt-2 -ml-20 pointer-events-none absolute top-0 left-1/2 size-full mask-[radial-gradient(farthest-side_at_top,white,transparent)]">
        <GridPattern
          className="absolute inset-0 size-full stroke-foreground/10"
          height={40}
          width={40}
          x={5}
        />
      </div>

      <Typography tag="h1">{title}</Typography>
      <Typography tag="p" className="my-3 font-semibold">
        {location} {salary && `• ${salary}`}
      </Typography>
      <Typography tag="p" className="text-muted-foreground">
        Выплаты: <span>{paymentFrequency}</span>
      </Typography>
      <Typography tag="p" className="text-muted-foreground">
        Опыт работы: <span>{experience}</span>
      </Typography>
      <Typography tag="p" className="text-muted-foreground">
        Оформление: <span>{employmentType}</span>
      </Typography>
      <Typography tag="p" className="text-muted-foreground">
        График: <span>{schedule}</span>
      </Typography>
      <Typography tag="p" className="text-muted-foreground">
        Рабочие часы: <span>{workHours}</span>
      </Typography>
      <Typography tag="p" className="text-muted-foreground">
        Формат работы: <span>{workFormat}</span>
      </Typography>
    </div>
  )
}
