import MDXArticle from '@/components/mdx/mdx-article'
import ProjectSchema from '@/components/seo/project-schema'
import { getProjectBySlug } from '@/lib/projects'
import { notFound } from 'next/navigation'
import { ArticleHeader } from '@/components/article-header'
import { PageTransition } from '@/components/animations/page/page-transition'

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const url = `https://abijith.sh/projects/${slug}`

  return (
    <PageTransition>
      <ProjectSchema project={project.metadata} url={url} />
      <ArticleHeader
        title={project.metadata.title || ''}
        publishedAt={project.metadata.publishedAt}
        author={project.metadata.author}
        backLink={{
          href: '/projects',
          text: 'Back to Projects'
        }}
      />
      <MDXArticle content={project.content} />
    </PageTransition>
  )
}
