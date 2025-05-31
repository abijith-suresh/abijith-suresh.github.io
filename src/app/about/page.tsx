import { StaggerIn, StaggerItem } from '@/components/animations/framer/transitions'
import { PageTransition } from '@/components/animations/page/page-transition'
import { SectionAnimation } from '@/components/animations/section/section-animation'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export const metadata = {
  title: 'About Me',
  description: 'Learn more about my background, skills, and experience.'
}

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="container max-w-4xl py-24">
        {/* Personal Introduction */}
        <SectionAnimation>
          <section className="mb-16">
            <h1 className="title mb-8">About Me</h1>
            <div className="prose dark:prose-invert">
              <p className="text-lg leading-relaxed">
                I am a passionate software engineer with a love for creating elegant solutions to complex problems.
                When I&apos;m not coding, you can find me exploring new technologies and contributing to open-source projects.
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
        </SectionAnimation>

        {/* Skills Section */}
        <section className="mb-16">
          <SectionAnimation>
            <h2 className="title-sm mb-8">Skills & Technologies</h2>
          </SectionAnimation>
          <StaggerIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Frontend */}
              <StaggerItem>
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 font-semibold">Frontend Development</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      React & Next.js
                    </li>
                  </ul>
                </div>
              </StaggerItem>
              {/* Backend */}
              <StaggerItem>
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 font-semibold">Backend Development</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Node.js
                    </li>
                  </ul>
                </div>
              </StaggerItem>
              {/* Other Skills */}
              <StaggerItem>
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 font-semibold">Other Skills</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Git & Version Control
                    </li>
                  </ul>
                </div>
              </StaggerItem>
            </div>
          </StaggerIn>
        </section>

        {/* Work Experience */}
        <section className="mb-16">
          <SectionAnimation>
            <h2 className="title-sm mb-8">Work Experience</h2>
          </SectionAnimation>
          <StaggerIn>
            <div className="space-y-12">
              <StaggerItem>
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
              </StaggerItem>
            </div>
          </StaggerIn>
        </section>

        {/* Education */}
        <section className="mb-16">
          <SectionAnimation>
            <h2 className="title-sm mb-8">Education</h2>
          </SectionAnimation>
          <StaggerIn>
            <div className="space-y-8">
              <StaggerItem>
                <div>
                  <h3 className="font-semibold">Degree Name</h3>
                  <p className="text-sm text-muted-foreground">University Name • Year - Year</p>
                  <p className="mt-2">Brief description or achievements</p>
                </div>
              </StaggerItem>
            </div>
          </StaggerIn>
        </section>

        {/* Interests & Hobbies */}
        <section>
          <SectionAnimation>
            <h2 className="title-sm mb-8">Interests & Hobbies</h2>
            <div className="prose dark:prose-invert">
              <p>
                When I&apos;m not coding, I enjoy exploring new technologies and contributing to the developer community.
              </p>
            </div>
          </SectionAnimation>
        </section>
      </div>
    </PageTransition>
  )
}