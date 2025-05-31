import { ProjectMetadata } from '@/lib/projects'

interface ProjectSchemaProps {
  project: ProjectMetadata
  url: string
}

export default function ProjectSchema({ project, url }: ProjectSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    image: project.image || '/og-image.jpg',
    datePublished: project.publishedAt,
    author: {
      '@type': 'Person',
      name: project.author || 'Abijith',
      url: 'https://abijith.sh'
    },
    creator: {
      '@type': 'Person',
      name: 'Abijith',
      url: 'https://abijith.sh'
    },
    url: url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}