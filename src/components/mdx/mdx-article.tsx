import MDXArticleAnimations from '@/components/animations/mdx/mdx-article-animations'
import { formatDate } from '@/lib/utils'
import MDXContent from './mdx-content'
import { MDXRemoteWrapper } from './mdx-remote-wrapper'

interface MDXArticleProps {
  title: string
  publishedAt?: string
  author?: string
  content: string
}

export default async function MDXArticle({
  title,
  publishedAt,
  author,
  content
}: MDXArticleProps) {
  const header = (
    <header>
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
    </header>
  )

  const mdxContent = (
    <MDXContent>
      <MDXRemoteWrapper source={content} />
    </MDXContent>
  )

  return (
    <article className='pt-40 pb-24'>
      <div className='container max-w-3xl'>
        <MDXArticleAnimations header={header} content={mdxContent} />
      </div>
    </article>
  )
}
