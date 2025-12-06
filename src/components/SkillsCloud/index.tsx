import { Skill } from '@/payload-types'
import { Typography } from '../ui/typography'
import { GridPattern } from '../ui/grid-pattern'

interface SkillsCloudProps {
  skills: Array<{
    id?: string | null
    skill: number | Skill
  }>
}

export function SkillsCloud({ skills }: SkillsCloudProps) {
  // Фильтруем и приводим к типу Skill[]
  const populatedSkills = skills.filter(
    (item): item is { id?: string | null; skill: Skill } =>
      typeof item.skill === 'object' && item.skill !== null,
  )

  if (populatedSkills.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      {populatedSkills.map((item) => (
        <div
          className="relative flex items-center justify-center rounded-lg border bg-background p-3 w-[200px]"
          key={item.skill.id}
        >
          <div className="-mt-2 -ml-20 pointer-events-none absolute top-0 left-1/2 size-full mask-[radial-gradient(farthest-side_at_top,white,transparent)]">
            <GridPattern
              className="absolute inset-0 size-full stroke-foreground/10"
              height={20}
              width={20}
              x={5}
            />
          </div>
          <Typography tag="p" className="max-h-12 leading-0.7 text-center text-sm">
            {item.skill.name}
          </Typography>
        </div>
      ))}
    </div>
  )
}
