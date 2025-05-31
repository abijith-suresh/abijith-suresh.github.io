import { SectionAnimation } from '@/components/animations/section/section-animation'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export default function Introduction() {
  return (
    <SectionAnimation>
      <section className="my-16">
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
  )
}