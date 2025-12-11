'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { SearchIcon } from 'lucide-react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <header
      className="sticky top-0 z-20 bg-background backdrop-blur supports-backdrop-filter:bg-background/95 w-full"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container relative">
        <DesktopMenu data={data} />

        {/* Кнопка для открытия/закрытия мобильного меню */}
        <div className="flex items-center justify-between py-4 md:hidden">
          <Link href="/" aria-label="На главную">
            <Logo loading="eager" priority="high" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="z-50 text-2xl text-primary"
            onClick={toggleMenu}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isOpen ? '✕' : '☰'}
          </Button>
        </div>

        <MobileMenu data={data} isOpen={isOpen} onLinkClick={() => setIsOpen(false)} />
      </div>
    </header>
  )
}

/**
 * Компонент для десктопного меню.
 */
const DesktopMenu: React.FC<HeaderClientProps> = ({ data }) => (
  <div className="hidden md:flex items-center justify-between py-4">
    <Link href="/" aria-label="На главную">
      <Logo loading="eager" priority="high" className="invert dark:invert-0" />
    </Link>
    <HeaderNav data={data} />
    <ThemeSelector />
  </div>
)

/**
 * Компонент для мобильного меню.
 */
const MobileMenu: React.FC<HeaderClientProps & { isOpen: boolean; onLinkClick: () => void }> = ({
  data,
  isOpen,
  onLinkClick,
}) => (
  <div
    className={cn(
      'fixed inset-0 z-40 h-screen w-full max-w-full transform bg-card pt-10 transition-transform duration-500 md:w-[550px] lg:hidden drop-shadow-lg',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    )}
  >
    <div className="px-4 py-8 flex flex-col items-center justify-between gap-y-10 h-[90%]">
      <Link href="/" aria-label="На главную" onClick={onLinkClick}>
        <Logo loading="eager" priority="high" />
      </Link>
      <HeaderNav data={data} className="flex-col text-xl gap-y-5 grow" onLinkClick={onLinkClick} />
      <ThemeSelector />
    </div>
  </div>
)
