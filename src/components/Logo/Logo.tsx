import clsx from 'clsx'
import React from 'react'
import { VingardLogoWhiteIcon } from './Vingard-logo-white'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return <VingardLogoWhiteIcon height={42} />
}
