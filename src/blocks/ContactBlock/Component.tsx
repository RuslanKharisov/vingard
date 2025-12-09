// src/blocks/ContactBlock/Component.tsx
import { Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Contact, ContactBlock as Props } from '@/payload-types'
import { Typography } from '@/components/ui/typography'

export const ContactBlock: React.FC<Props> = async ({ title, description }) => {
  const contactsData: Contact = (await getCachedGlobal('contacts', 1)()) as Contact

  const { email, emailDescription, phone, phone2, phoneDescription, address, addressDescription } =
    contactsData

  const items = [
    {
      title: 'Email',
      description: emailDescription || '',
      icon: Mail,
      content: (
        <a
          className="font-medium font-mono text-sm tracking-wide hover:underline"
          href={`mailto:${email}`}
        >
          {email}
        </a>
      ),
    },
    {
      title: 'Офис',
      description: addressDescription || '',
      icon: MapPin,
      content: <span className="font-medium font-mono text-sm tracking-wide">{address}</span>,
    },
    {
      title: 'Телефон',
      description: phoneDescription || '',
      icon: Phone,
      content: (
        <ul>
          <li>
            <a
              className="block font-medium font-mono text-sm tracking-wide hover:underline"
              href={`tel:${phone}`}
            >
              {phone}
            </a>
          </li>
          <li>
            {phone2 && (
              <a
                className="block font-medium font-mono text-sm tracking-wide hover:underline"
                href={`tel:${phone2}`}
              >
                {phone2}
              </a>
            )}
          </li>
        </ul>
      ),
    },
  ]

  return (
    <div className="container">
      <div className="flex grow flex-col justify-center px-4 md:items-center">
        <Typography tag="h2">{title}</Typography>
        {description && (
          <Typography tag="p" className="mb-5 text-base text-muted-foreground">
            {description}
          </Typography>
        )}
      </div>

      <BorderSeparator />
      <div className="grid gap-6 md:grid-cols-3 md:gap-0">
        {items.map((item, i) => (
          <ContactItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            content={item.content}
            isLast={i === items.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

function BorderSeparator() {
  return <div className="absolute inset-x-0 h-px w-full border-b" />
}

type ContactItemProps = {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  content: React.ReactNode
  isLast: boolean
}

function ContactItem({ title, description, icon: Icon, content, isLast }: ContactItemProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:min-h-[200px]',
        'border-b md:border-b-0',
        !isLast && 'md:border-r',
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-x-3 border-b bg-secondary/50 p-4 dark:bg-secondary/20">
        <Icon className="size-5 text-muted-foreground" strokeWidth={1} />
        <Typography tag="h3">{title}</Typography>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col min-h-24 justify-center">{content}</div>

      {/* Description */}
      <div className="border-t p-4">
        <Typography tag="p" className="text-muted-foreground text-sm">
          {description}
        </Typography>
      </div>
    </div>
  )
}
