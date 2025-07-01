import Projects from '@/app/projects/components/projects'
import { getProjects } from '@/lib/projects'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Abijith',
  description:
    'Explore my portfolio of software projects, web applications, and technical experiments.',
  openGraph: {
    title: 'Projects | Abijith',
    description:
      'Explore my portfolio of software projects, web applications, and technical experiments.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Projects | Abijith'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Abijith',
    description:
      'Explore my portfolio of software projects, web applications, and technical experiments.',
    images: ['/og-image.jpg']
  }
}

/**
 * Renders the main projects page, displaying a list of all projects.
 * Fetches project data and passes it to the `Projects` component for rendering.
 */
export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className='container max-w-4xl py-24'>
      <h1 className='title mb-8'>Projects</h1>
      <Projects projects={projects} />
    </div>
  )
}
