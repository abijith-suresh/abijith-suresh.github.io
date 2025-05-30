import MDXContent from '@/components/mdx-content'
import { formatDate } from '@/lib/utils'

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
        <header className='mb-8'>
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

        {/* Content */}
        <div>
          <MDXContent source={content} />
        </div>
      </div>
    </article>
  )
}