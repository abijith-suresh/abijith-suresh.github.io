import { SectionAnimation } from '@/components/animations/section/section-animation'

export default function Interests() {
  return (
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
  )
}