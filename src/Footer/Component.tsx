import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Contact, Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const contactsData: Contact = (await getCachedGlobal('contacts', 1)()) as Contact

  const { email, phone, address } = contactsData
  const navItems = footerData?.navItems || []

  return (
    <footer className="border-t bg-black dark:bg-card text-white">
      <div className="container px-6 py-12">
        {/* Основная сетка: логотип слева, навигация и контакты справа */}
        <div className="grid gap-12 md:grid-cols-12">
          {/* Логотип и копирайт (на мобильных — сверху) */}
          <div className="md:col-span-4">
            <Link href="/" aria-label="На главную" className="inline-block">
              <Logo />
            </Link>
          </div>

          {/* Навигация */}
          <div className="md:col-span-4">
            <nav className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Навигация
              </h3>
              <ul className="space-y-2">
                {navItems.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink className="hover:text-primary transition-colors" {...link} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Контакты */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Контакты
            </h3>
            <address className="mt-4 not-italic space-y-2">
              {address && <p>{address}</p>}
              {phone && (
                <p>
                  <span className="text-muted-foreground">Телефон: </span>
                  <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:underline">
                    {phone}
                  </a>
                </p>
              )}
              {email && (
                <p>
                  <span className="text-muted-foreground">Email: </span>
                  <a href={`mailto:${email}`} className="hover:underline">
                    {email}
                  </a>
                </p>
              )}
            </address>
          </div>
        </div>

        {/* Нижняя часть: копирайт и соцсети */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t pt-6 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Вингард Автоматика. Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* ToDo: реализовать рендер ссылок на соцсети из коллекции Socials */}
            <span className="text-sm text-muted-foreground">Соцсети скоро!</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
