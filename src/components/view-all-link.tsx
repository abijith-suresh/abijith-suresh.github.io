'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ViewAllLinkProps {
  href: string
  text: string
}

export function ViewAllLink({ href, text }: ViewAllLinkProps) {
  return (
    <Link
      href={href}
      className='text-muted-foreground hover:text-foreground inline-flex items-center gap-1 underline decoration-1 underline-offset-2 transition-colors group'
    >
      {text}
      <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
    </Link>
  )
}
