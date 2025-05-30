import MDXArticle from '@/components/mdx-article'
import { getProjectBySlug } from '@/lib/projects'
import { notFound } from 'next/navigation'

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

  return (
    <MDXArticle
      title={project.metadata.title || ''}
      publishedAt={project.metadata.publishedAt}
      author={project.metadata.author}
      content={project.content}
    />
  )
}
