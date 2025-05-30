import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export const metadata = {
  title: 'About Me',
  description: 'Learn more about my background, skills, and experience.'
}

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-24">
      {/* Personal Introduction */}
      <section className="mb-16">
        <h1 className="title mb-8">About Me</h1>
        <div className="prose dark:prose-invert">
          <p className="text-lg leading-relaxed">
            {/* Add your personal introduction here */}
            I am a passionate software engineer with a love for creating elegant solutions to complex problems.
            My journey in technology began... {/* Complete your story */}
          </p>
        </div>
        <div className="mt-8">
          <Button variant="outline" asChild>
            <a href="/resume.pdf" download className="inline-flex items-center gap-2">
              <Download size={16} />
              Download Resume
            </a>
          </Button>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="title-sm mb-8">Skills & Technologies</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Frontend */}
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 font-semibold">Frontend Development</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                React & Next.js
              </li>
              {/* Add more skills */}
            </ul>
          </div>
          {/* Backend */}
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 font-semibold">Backend Development</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                Node.js
              </li>
              {/* Add more skills */}
            </ul>
          </div>
          {/* Other Skills */}
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 font-semibold">Other Skills</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                Git & Version Control
              </li>
              {/* Add more skills */}
            </ul>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-16">
        <h2 className="title-sm mb-8">Work Experience</h2>
        <div className="space-y-12">
          <div className="relative border-l pl-8">
            <div className="absolute -left-[7px] h-4 w-4 rounded-full border-2 border-background bg-primary"></div>
            <div>
              <h3 className="font-semibold">Senior Software Engineer</h3>
              <p className="text-sm text-muted-foreground">Company Name • 2020 - Present</p>
              <ul className="mt-4 list-disc space-y-2 pl-4">
                <li>Key achievement 1</li>
                <li>Key achievement 2</li>
              </ul>
            </div>
          </div>
          {/* Add more experience entries */}
        </div>
      </section>

      {/* Education */}
      <section className="mb-16">
        <h2 className="title-sm mb-8">Education</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold">Degree Name</h3>
            <p className="text-sm text-muted-foreground">University Name • Year - Year</p>
            <p className="mt-2">Brief description or achievements</p>
          </div>
          {/* Add more education entries */}
        </div>
      </section>

      {/* Interests & Hobbies */}
      <section>
        <h2 className="title-sm mb-8">Interests & Hobbies</h2>
        <div className="prose dark:prose-invert">
          <p>
            When I'm not coding, you can find me... {/* Add your interests */}
          </p>
        </div>
      </section>
    </div>
  )
}