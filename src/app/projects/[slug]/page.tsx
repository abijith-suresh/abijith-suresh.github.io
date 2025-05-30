import MDXContent from '@/components/mdx-content'
import { getProjectBySlug } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
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
    <article className='pt-40 pb-24'>
      <div className='container max-w-3xl'>
        {/* Header */}
        <header className='mb-8'>
          <h1 className='title mb-4'>{project.metadata.title}</h1>
          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
            {project.metadata.author && (
              <>
                <span>{project.metadata.author}</span>
                <span>•</span>
              </>
            )}
            <time dateTime={project.metadata.publishedAt}>
              {formatDate(project.metadata.publishedAt ?? '')}
            </time>
          </div>
        </header>

        {/* Content */}
        <div>
          <MDXContent source={project.content} />
        </div>
      </div>
    </article>
  )
}
