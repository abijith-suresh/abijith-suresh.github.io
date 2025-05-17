// import Projects from '@/components/projects'
// import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  // const projects = await getProjects()

  return (
    <section className='pt-40 pb-24'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Projects</h1>
          <div className='text-center'>
            <p className='font-serif text-muted-foreground text-xl'>
              My project showcase is currently under construction. Stay
              tuned for exciting updates!
            </p>
          </div>

        {/* <Projects projects={projects} /> */}
      </div>
    </section>
  )
}
