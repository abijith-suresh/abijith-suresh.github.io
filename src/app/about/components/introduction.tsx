import { SectionAnimation } from '@/components/animations/section/section-animation'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export default function Introduction() {
  return (
    <SectionAnimation>
      <section className="my-16">
        <h1 className="title mb-8">About Me</h1>
        <div className="prose dark:prose-invert space-y-6">
          <p className="text-lg leading-relaxed">
            I am a passionate software engineer based in Kochi, Kerala, with a strong foundation in full-stack development.
            My journey in tech has been driven by a deep curiosity for building scalable solutions and creating impactful user experiences.
          </p>
          <p className="text-lg leading-relaxed">
            Currently, I work at UST as a Developer-1 Software Engineer, where I contribute to enterprise-level applications
            and collaborate with talented teams to solve complex technical challenges. My approach combines technical expertise
            with a keen eye for detail and a commitment to writing clean, maintainable code.
          </p>
          <p className="text-lg leading-relaxed">
            When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects,
            or engaging with the tech community. I&apos;m particularly interested in web technologies, system design,
            and creating efficient, user-friendly applications.
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