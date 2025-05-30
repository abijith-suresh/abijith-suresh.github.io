'use client';

import MDXContent from '@/components/mdx-content';
import { formatDate } from '@/lib/utils';
import { MotionDiv } from './animations/motion-wrapper';

interface MDXArticleProps {
  title: string
  publishedAt?: string
  author?: string
  content: string
}

export default function MDXArticle({
  title,
  publishedAt,
  author,
  content
}: MDXArticleProps) {
  return (
    <article className='pt-40 pb-24'>
      <div className='container max-w-3xl'>
        {/* Header */}
        <MotionDiv
          className='mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
        >
          <header>
            <h1 className='title mb-4'>{title}</h1>
            <div className='text-muted-foreground flex items-center gap-2 text-sm'>
              {author && (
                <>
                  <span>{author}</span>
                  <span>•</span>
                </>
              )}
              {publishedAt && (
                <time dateTime={publishedAt}>
                  {formatDate(publishedAt)}
                </time>
              )}
            </div>
          </header>
        </MotionDiv>

        {/* Content */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
        >
          <div>
            <MDXContent source={content} />
          </div>
        </MotionDiv>
      </div>
    </article>
  )
}