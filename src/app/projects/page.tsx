import Projects from '@/app/projects/components/projects'
import { getProjects } from '@/lib/projects'
import { Metadata } from 'next'
import { StaggerItem } from '@/components/animations/framer/transitions'
import { PageTransition } from '@/components/animations/page/page-transition'

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
    <PageTransition>
      <div className='container max-w-4xl pt-40 pb-24'>
        <StaggerItem>
          <h1 className='title mb-8'>Projects</h1>
          <p className='mb-16 text-lg leading-relaxed'>
            Here you&apos;ll find a collection of my personal and professional projects, showcasing my skills in various technologies and problem-solving approaches.
          </p>
        </StaggerItem>
        <Projects projects={projects} />
      </div>
    </PageTransition>
  )
}
