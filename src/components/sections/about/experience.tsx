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
    title: 'Developer-1 Software Engineering',
    company: 'UST, Trivandrum',
    period: 'Sept 2024 - Present',
    achievements: [
      'Working as a full-stack developer contributing to enterprise-level applications',
      'Collaborating with cross-functional teams to deliver high-quality software solutions',
      'Participating in code reviews and implementing best practices in software development'
    ]
  },
  {
    title: 'Frontend Web Developer Intern',
    company: 'Suyati Technologies, Kochi',
    period: 'Feb 2023 - Aug 2023',
    achievements: [
      'Collaborated with a team of 3 students, focusing on frontend development using HTML, CSS, and JS.',
      'Engineered the frontend of the property retail portal with HTML, CSS, and JS to enhance responsiveness and visual appeal.',
      'Integrated the frontend with the Django backend, ensuring seamless communication and data flow.',
      'Streamlined the frontend design and functionality, incorporating user feedback and making necessary adjustments.'
    ]
  }
]

export default function Experience() {
  return (
    <section className="mb-16">
      <SectionAnimation>
        <h2 className="title mb-8">Work Experience</h2>
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