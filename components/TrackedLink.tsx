'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  event: string
  eventData?: Record<string, unknown>
}

/**
 * Link com disparo de evento GTM dataLayer.
 * Client Component — usar apenas quando precisar de tracking onClick.
 */
export default function TrackedLink({
  event,
  eventData = {},
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event, page_url: window.location.href, ...eventData })
    }
    onClick?.(e)
  }

  return <Link {...props} onClick={handleClick} />
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}
