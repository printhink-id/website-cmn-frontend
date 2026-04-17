'use client'

// React Imports
import { forwardRef } from 'react'

// Next Imports
import Link from 'next/link'

export const RouterLink = forwardRef((props, ref) => {
  const { href, className, children, ...other } = props

  if (!href) {
    console.warn('RouterLink: href is undefined', props)
  }

  // 🛡️ Guard biar gak error
  if (!href) {
    return (
      <span ref={ref} className={className} {...other}>
        {children}
      </span>
    )
  }

  return (
    <Link ref={ref} href={href} className={className} {...other}>
      {children}
    </Link>
  )
})
