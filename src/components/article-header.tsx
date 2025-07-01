'use client'

import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/components/animations/page/page-transition'
import { StaggerItem } from '@/components/animations/framer/transitions'

interface ArticleHeaderProps {
  title: string
  publishedAt?: string
  author?: string
  backLink: {
    href: string
    text: string
  }
}

export function ArticleHeader({
  title,
  publishedAt,
  author,
  backLink
}: ArticleHeaderProps) {
  return (
    <PageTransition>
      <div className='container max-w-4xl pt-40 pb-12'>
        <StaggerItem>
          <Link
            href={backLink.href}
            className='text-muted-foreground hover:text-foreground group mb-8 inline-flex items-center gap-1 underline decoration-1 underline-offset-2 transition-colors'
          >
            <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
            {backLink.text}
          </Link>

          <h1 className='title mb-4'>{title}</h1>
          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
            {publishedAt && (
              <>
                <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                <span>•</span>
              </>
            )}
            {author && <span>{author}</span>}
          </div>
        </StaggerItem>
      </div>
    </PageTransition>
  )
}
