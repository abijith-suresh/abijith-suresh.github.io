import MDXArticleAnimations from '@/components/animations/mdx/mdx-article-animations'
import MDXContent from './mdx-content'
import { MDXRemoteWrapper } from './mdx-remote-wrapper'

interface MDXArticleProps {
  content: string
}

/**
 * Renders an MDX article with its content.
 * It uses `MDXArticleAnimations` for animated entry and `MDXContent` to style the article.
 */
export default async function MDXArticle({
  content
}: MDXArticleProps) {
  const mdxContent = (
    <MDXContent>
      <MDXRemoteWrapper source={content} />
    </MDXContent>
  )

  return (
    <article className='pb-24'>
      <div className='container max-w-4xl'>
        <MDXArticleAnimations content={mdxContent} />
      </div>
    </article>
  )
}
