import Projects from '@/components/sections/projects'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container max-w-4xl py-24">
      <h1 className="title mb-8">Projects</h1>
      <Projects projects={projects} />
    </div>
  )
}
