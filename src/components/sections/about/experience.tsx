import { StaggerIn, StaggerItem } from '@/components/animations/framer/transitions'
import { SectionAnimation } from '@/components/animations/section/section-animation'

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  achievements: string[]
}

function ExperienceItem({ title, company, period, achievements }: ExperienceItemProps) {
  return (
    <StaggerItem>
      <div className="relative border-l pl-8">
        <div className="absolute -left-[7px] h-4 w-4 rounded-full border-2 border-background bg-primary"></div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{company} • {period}</p>
          <ul className="mt-4 list-disc space-y-2 pl-4">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </StaggerItem>
  )
}

const experienceData = [
  {
    title: 'Senior Software Engineer',
    company: 'Company Name',
    period: '2020 - Present',
    achievements: [
      'Key achievement 1',
      'Key achievement 2'
    ]
  }
]

export default function Experience() {
  return (
    <section className="mb-16">
      <SectionAnimation>
        <h2 className="title-sm mb-8">Work Experience</h2>
      </SectionAnimation>
      <StaggerIn>
        <div className="space-y-12">
          {experienceData.map((experience, index) => (
            <ExperienceItem
              key={index}
              title={experience.title}
              company={experience.company}
              period={experience.period}
              achievements={experience.achievements}
            />
          ))}
        </div>
      </StaggerIn>
    </section>
  )
}