import MDXArticle from '@/components/mdx/mdx-article'
import ProjectSchema from '@/components/seo/project-schema'
import { getProjectBySlug } from '@/lib/projects'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleHeader } from '@/components/article-header'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Generates dynamic metadata for a project page based on its slug.
 * Fetches project data to populate title, description, Open Graph, and Twitter metadata.
 * @param params - The parameters object containing the project slug.
 * @returns A Promise that resolves to the Metadata object for the page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  const { title, summary, image, author, publishedAt } = project.metadata

  const ogImage = image || '/og-image.jpg'

  return {
    title: `${title} | Projects | Abijith`,
    description: summary,
    openGraph: {
      title: `${title} | Projects | Abijith`,
      description: summary,
      type: 'article',
      publishedTime: publishedAt,
      authors: author ? [author] : undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Projects | Abijith`,
      description: summary,
      images: [ogImage]
    },
    alternates: {
      canonical: `https://abijith.sh/projects/${slug}`
    }
  }
}

/**
 * Renders a single project page.
 * Fetches project content by slug and displays it using the `MDXArticle` component.
 * Also includes `ProjectSchema` for SEO purposes.
 * @param params - The parameters object containing the project slug.
 */
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
    <>
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
    </>
  )
}
